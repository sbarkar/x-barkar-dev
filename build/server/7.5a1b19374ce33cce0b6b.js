exports.ids = [7];
exports.modules = {

/***/ "6Bi2":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"window": "Window_window__1V8GE",
	"foreground": "Window_foreground__iWNRf",
	"minimize": "Window_minimize__3ipgc",
	"maximize": "Window_maximize__3pdPJ",
	"close": "Window_close__2QquY",
	"titlebar": "Window_titlebar__2yGpb",
	"content": "Window_content__jxFwb",
	"maximized": "Window_maximized__m5RQ0",
	"resizeTop": "Window_resizeTop__287AO",
	"resizeRight": "Window_resizeRight__2E9G8",
	"resizeBottom": "Window_resizeBottom__hQ0Qy",
	"resizeLeft": "Window_resizeLeft__LMCZ7",
	"resizeTopRight": "Window_resizeTopRight__2vVUt",
	"resizeBottomRight": "Window_resizeBottomRight__3iVkP",
	"resizeBottomLeft": "Window_resizeBottomLeft__1AclW",
	"resizeTopLeft": "Window_resizeTopLeft__2mYqj"
};


/***/ }),

/***/ "Kg0h":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: ./styles/System/WindowManager/Window.module.scss
var Window_module = __webpack_require__("6Bi2");
var Window_module_default = /*#__PURE__*/__webpack_require__.n(Window_module);

// EXTERNAL MODULE: ./components/System/Icon.tsx
var Icon = __webpack_require__("c5pV");

// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__("No/t");

// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__("uhWA");

// CONCATENATED MODULE: ./components/System/WindowManager/TitleBar.tsx







const TitleBar = ({
  icon,
  name,
  onMaximize,
  onMinimize,
  onClose
}) => {
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])("header", {
    className: `${Window_module_default.a.titlebar} handle`,
    onDoubleClick: onMaximize,
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("h1", {
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("figure", {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(Icon["a" /* default */], {
          src: icon,
          height: 16,
          width: 16
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("figcaption", {
          children: name
        })]
      })
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("nav", {
      className: "cancel",
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
        id: Window_module_default.a.close,
        type: "button",
        onClick: onClose,
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(react_fontawesome_["FontAwesomeIcon"], {
          size: "xs",
          icon: free_solid_svg_icons_["faTimes"]
        })
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
        id: Window_module_default.a.minimize,
        type: "button",
        onClick: onMinimize,
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(react_fontawesome_["FontAwesomeIcon"], {
          size: "xs",
          icon: free_solid_svg_icons_["faMinus"]
        })
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
        id: Window_module_default.a.maximize,
        type: "button",
        onClick: onMaximize,
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(react_fontawesome_["FontAwesomeIcon"], {
          size: "xs",
          icon: free_solid_svg_icons_["faPlus"]
        })
      })]
    })]
  });
};

/* harmony default export */ var WindowManager_TitleBar = (TitleBar);
// EXTERNAL MODULE: ./utils/elements.ts
var utils_elements = __webpack_require__("oAWw");

// CONCATENATED MODULE: ./utils/window.ts
const resizeHandleClasses = styles => ({
  top: styles.resizeTop,
  right: styles.resizeRight,
  bottom: styles.resizeBottom,
  left: styles.resizeLeft,
  topRight: styles.resizeTopRight,
  bottomRight: styles.resizeBottomRight,
  bottomLeft: styles.resizeBottomLeft,
  topLeft: styles.resizeTopLeft
});
// EXTERNAL MODULE: external "react-rnd"
var external_react_rnd_ = __webpack_require__("RQ15");

// EXTERNAL MODULE: ./contexts/SessionManager.tsx + 2 modules
var SessionManager = __webpack_require__("m+kb");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// CONCATENATED MODULE: ./components/System/WindowManager/Window.tsx










const Window = ({
  children,
  icon = '',
  id,
  name = '',
  bgColor,
  onMaximize,
  onMinimize,
  onClose,
  onFocus,
  onBlur,
  onDrag,
  onResize,
  lockAspectRatio,
  zIndex,
  maximized,
  height = 0,
  width = 0
}) => {
  const {
    session: {
      foregroundId
    }
  } = Object(external_react_["useContext"])(SessionManager["a" /* SessionContext */]);
  const windowRef = Object(external_react_["useRef"])(null);
  Object(external_react_["useEffect"])(() => {
    Object(utils_elements["e" /* focusResizableElementRef */])(windowRef);
  }, []);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_react_rnd_["Rnd"], {
    ref: windowRef,
    enableUserSelectHack: false,
    className: `${Window_module_default.a.window} ${maximized ? Window_module_default.a.maximized : ''} ${foregroundId === id ? Window_module_default.a.foreground : ''}`,
    dragHandleClassName: "handle",
    resizeHandleClasses: resizeHandleClasses(Window_module_default.a),
    cancel: ".cancel",
    size: {
      height: maximized ? '100%' : height,
      width: maximized ? '100%' : width
    },
    minHeight: 250,
    minWidth: 250,
    tabIndex: -1,
    onFocus: onFocus,
    onBlur: onBlur,
    onDragStart: utils_elements["d" /* focusOnDrag */],
    onDragStop: onDrag,
    onResizeStop: onResize,
    enableResizing: !maximized,
    disableDragging: maximized,
    lockAspectRatio: lockAspectRatio,
    style: {
      zIndex
    },
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(WindowManager_TitleBar, {
      icon: icon,
      name: name,
      onMaximize: onMaximize,
      onMinimize: onMinimize,
      onClose: onClose
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("article", {
      className: Window_module_default.a.content,
      style: {
        backgroundColor: bgColor
      },
      children: children
    })]
  });
};

/* harmony default export */ var WindowManager_Window = __webpack_exports__["default"] = (Window);

/***/ })

};;