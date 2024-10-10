import {
  type ChatCompletionMessageParam,
  type MLCEngine,
} from "@mlc-ai/web-llm";
import {
  type WorkerMessage,
  type ConvoStyles,
} from "components/system/Taskbar/AI/types";

const MARKED_LIBS = [
  "/Program Files/Marked/marked.min.js",
  "/Program Files/Marked/purify.min.js",
];

const CONVO_STYLE_TEMPS: Record<
  ConvoStyles,
  AIAssistantCreateOptionsWithSystemPrompt
> = {
  balanced: {
    temperature: 0.5,
    topK: 3,
  },
  creative: {
    temperature: 0.8,
    topK: 5,
  },
  precise: {
    temperature: 0.2,
    topK: 2,
  },
};

const WEB_LLM_MODEL = "Llama-3.1-8B-Instruct-q4f32_1-MLC";
const WEB_LLM_MODEL_CONFIG = {
  "Llama-3.1-8B-Instruct-q4f32_1-MLC": {
    frequency_penalty: 0,
    max_tokens: 4000,
    presence_penalty: 0,
    top_p: 0.9,
  },
};
const SYSTEM_PROMPT: ChatCompletionMessageParam = {
  content: "You are a helpful AI assistant.",
  role: "system",
};

let cancel = false;
let responding = false;

let sessionId = 0;
let session: AIAssistant | ChatCompletionMessageParam[] | undefined;
let engine: MLCEngine;

let markedLoaded = false;

globalThis.addEventListener(
  "message",
  async ({ data }: { data: WorkerMessage | "cancel" | "init" }) => {
    if (!data || data === "init") return;

    if (data === "cancel") {
      if (responding) cancel = true;
    } else if (data.id && data.text && data.style) {
      responding = true;

      if (sessionId !== data.id) {
        sessionId = data.id;

        if (data.hasWindowAI) {
          (session as AIAssistant)?.destroy();

          const config: AIAssistantCreateOptionsWithSystemPrompt = {
            ...CONVO_STYLE_TEMPS[data.style],
            systemPrompt: SYSTEM_PROMPT.content,
          };

          session = await globalThis.ai.assistant.create(config);
        } else {
          session = [SYSTEM_PROMPT];

          if (!engine) {
            const { CreateMLCEngine } = await import("@mlc-ai/web-llm");

            if (!cancel) {
              engine = await CreateMLCEngine(WEB_LLM_MODEL, {
                initProgressCallback: (progress) =>
                  globalThis.postMessage({ progress }),
              });
            }
          }
        }
      }

      let response: string | ReadableStream<string> = "";
      let retry = 0;

      try {
        while (retry++ < 3 && !response) {
          if (cancel) break;

          try {
            if (data.hasWindowAI) {
              const aiAssistant = session as AIAssistant;

              response = data.streamId
                ? aiAssistant?.promptStreaming(data.text)
                : // eslint-disable-next-line no-await-in-loop
                  (await aiAssistant?.prompt(data.text)) || "";
            } else {
              (session as ChatCompletionMessageParam[]).push({
                content: data.text,
                role: "user",
              });

              const {
                choices: [{ message }],
                // eslint-disable-next-line no-await-in-loop
              } = await engine.chat.completions.create({
                logprobs: true,
                messages: session as ChatCompletionMessageParam[],
                temperature: CONVO_STYLE_TEMPS[data.style].temperature,
                top_logprobs: CONVO_STYLE_TEMPS[data.style].topK,
                ...WEB_LLM_MODEL_CONFIG[WEB_LLM_MODEL],
              });

              (session as ChatCompletionMessageParam[]).push(message);

              response = message.content || "";
            }
          } catch (error) {
            console.error("Failed to get prompt response.", error);
          }
        }

        if (!response) console.error("Failed retires to create response.");
      } catch (error) {
        console.error("Failed to create text session.", error);
      }

      if (!cancel) {
        if (response && !markedLoaded) {
          globalThis.importScripts(...MARKED_LIBS);
          markedLoaded = true;
        }

        const sendMessage = (message: string, streamId?: number): void =>
          globalThis.postMessage({
            formattedResponse: globalThis.marked.parse(message, {
              headerIds: false,
              mangle: false,
            }),
            response: message,
            streamId,
          });

        if (typeof response === "string") {
          sendMessage(response);
        } else {
          try {
            // @ts-expect-error ReadableStream will have an asyncIterator if Prompt API exists
            // eslint-disable-next-line @typescript-eslint/await-thenable
            for await (const chunk of response) {
              if (cancel) break;

              sendMessage(chunk as string, data.streamId);
            }
          } catch (error) {
            console.error("Failed to stream prompt response.", error);
          }

          globalThis.postMessage({ complete: true, streamId: data.streamId });
        }
      }

      responding = false;

      if (cancel) {
        cancel = false;
        globalThis.postMessage("canceled");
      }
    }
  },
  { passive: true }
);
