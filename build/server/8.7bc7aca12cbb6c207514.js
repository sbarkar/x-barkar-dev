exports.ids = [8];
exports.modules = {

/***/ "bMDe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: ./styles/System/WindowManager/WindowManager.module.scss
var WindowManager_module = __webpack_require__("Oesx");
var WindowManager_module_default = /*#__PURE__*/__webpack_require__.n(WindowManager_module);

// EXTERNAL MODULE: external "next/dynamic"
var dynamic_ = __webpack_require__("/T1H");
var dynamic_default = /*#__PURE__*/__webpack_require__.n(dynamic_);

// EXTERNAL MODULE: external "framer-motion"
var external_framer_motion_ = __webpack_require__("wmQq");

// EXTERNAL MODULE: ./utils/constants.ts
var constants = __webpack_require__("Evpv");

// CONCATENATED MODULE: ./utils/windowmanager.ts

const getMaxDimensions = (width, height, defaultWidth = 0, defaultHeight = 0, lockAspectRatio = false) => {
  if (width === defaultWidth && height === defaultHeight) {
    const PADDING = constants["i" /* WINDOW_PADDING */] * 2;
    let maxWidth = window.innerWidth - PADDING;
    let maxHeight = window.innerHeight - constants["g" /* TASKBAR_HEIGHT */] - PADDING;

    if (lockAspectRatio) {
      const aspectLockedHeight = height / width * Math.min(maxWidth, width);

      if (aspectLockedHeight > maxHeight) {
        maxWidth = maxHeight / (height / width);
      } else {
        maxHeight = aspectLockedHeight;
      }
    }

    return {
      height: Math.ceil(Math.min(maxHeight, height)),
      width: Math.ceil(Math.min(maxWidth, width))
    };
  }

  return {
    height,
    width
  };
};
const getNextVisibleWindow = (processes, stackOrder) => {
  const visibleProcessId = stackOrder.find(stackId => processes.find(process => process.id === stackId && !process.minimized));
  return visibleProcessId || '';
};
// EXTERNAL MODULE: ./contexts/ProcessManager.tsx + 1 modules
var ProcessManager = __webpack_require__("9Z7V");

// EXTERNAL MODULE: ./contexts/SessionManager.tsx + 2 modules
var SessionManager = __webpack_require__("m+kb");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: ./utils/motions.ts
var utils_motions = __webpack_require__("gVB8");

// CONCATENATED MODULE: ./hooks/useWindow.ts






const windowZindex = constants["j" /* baseZindex */] + constants["l" /* windowsZindexLevel */] * constants["m" /* zindexLevelSize */];

const useWindow = ({
  loaderOptions: {
    width: defaultWidth,
    height: defaultHeight
  },
  processProps: {
    height: initialHeight,
    id,
    launchElement,
    lockAspectRatio,
    maximized,
    minimized,
    taskbarElement,
    width: initialWidth,
    x,
    y
  }
}) => {
  const {
    foreground,
    getState,
    saveState,
    session: {
      foregroundId,
      stackOrder
    }
  } = Object(external_react_["useContext"])(SessionManager["a" /* SessionContext */]);
  const {
    processes,
    close,
    maximize,
    minimize,
    position,
    restore,
    size
  } = Object(external_react_["useContext"])(ProcessManager["a" /* ProcessContext */]);
  const {
    0: maximizeWindow,
    1: setMaximizeWindow
  } = Object(external_react_["useState"])(false);
  const {
    height,
    width
  } = getMaxDimensions(initialWidth, initialHeight, defaultWidth, defaultHeight, lockAspectRatio);
  const {
    x: previousX,
    y: previousY
  } = getState({
    id
  });
  const {
    x: defaultX,
    y: defaultY
  } = Object(external_react_["useMemo"])(() => ({
    x: Math.floor((window.innerWidth - width) / 2),
    y: Math.floor((window.innerHeight - height - constants["g" /* TASKBAR_HEIGHT */]) / 2)
  }), []);
  const zIndex = windowZindex + stackOrder.slice().reverse().indexOf(id);
  Object(external_react_["useEffect"])(() => {
    if (foregroundId === id && minimized) {
      foreground(getNextVisibleWindow(processes, stackOrder.filter(stackId => stackId !== id)));
    } else if (!stackOrder.includes(id)) {
      foreground(getNextVisibleWindow(processes, stackOrder));
    }
  }, [foregroundId, id, minimized, processes, stackOrder]);
  Object(external_react_["useEffect"])(() => {
    if (maximized) {
      setMaximizeWindow(true);
    } else if (maximizeWindow) {
      setTimeout(() => setMaximizeWindow(false), constants["c" /* MAXIMIZE_ANIMATION_SPEED_IN_SECONDS */] * constants["d" /* MILLISECONDS_IN_SECOND */]);
    }
  }, [maximized, maximizeWindow]);
  return {
    height,
    width,
    zIndex: foregroundId === id ? constants["k" /* foregroundZindex */] : zIndex,
    motions: Object(utils_motions["d" /* windowMotionSettings */])({
      animation: maximized && minimized && 'maxmin' || maximized && 'maximized' || minimized && 'minimized' || 'start',
      initialX: previousX || defaultX,
      initialY: previousY || defaultY,
      x,
      y,
      taskbarElement,
      launchElement,
      height,
      width,
      zIndex
    }),
    settings: {
      onBlur: event => {
        if (event.relatedTarget !== taskbarElement) {
          foreground('');
        }
      },
      onClose: () => {
        saveState({
          id,
          height,
          width,
          x: !previousX ? defaultX + x : x,
          y: !previousY ? defaultY + y : y
        });
        close(id);
      },
      onDrag: position(id),
      onFocus: () => foreground(id),
      onMaximize: () => maximized ? restore(id, 'maximized') : maximize(id),
      onMinimize: () => minimize(id),
      onResize: size(id),
      height,
      id,
      lockAspectRatio,
      maximized: maximizeWindow,
      minimized,
      width,
      zIndex
    }
  };
};

/* harmony default export */ var hooks_useWindow = (useWindow);
// CONCATENATED MODULE: ./components/System/WindowManager/ProcessWindow.tsx


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const Window = dynamic_default()(() => __webpack_require__.e(/* import() */ 7).then(__webpack_require__.bind(null, "Kg0h")), {
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("Kg0h")],
    modules: ['@/components/System/WindowManager/Window']
  }
});

const ProcessWindow = (_ref) => {
  let {
    loader: {
      loader: App,
      loadedAppOptions,
      loaderOptions
    },
    bgColor,
    icon,
    name,
    url,
    windowed
  } = _ref,
      processProps = _objectWithoutProperties(_ref, ["loader", "bgColor", "icon", "name", "url", "windowed"]);

  const {
    motions,
    settings
  } = hooks_useWindow({
    processProps,
    loaderOptions
  });
  const {
    height,
    width,
    zIndex
  } = settings;

  const AppComponent = /*#__PURE__*/Object(jsx_runtime_["jsx"])(App, _objectSpread(_objectSpread({
    url: url
  }, loadedAppOptions), settings));

  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_framer_motion_["motion"].article, _objectSpread(_objectSpread({
    className: WindowManager_module_default.a.animatedWindows,
    style: {
      height,
      width,
      zIndex
    }
  }, motions), {}, {
    children: windowed ? /*#__PURE__*/Object(jsx_runtime_["jsx"])(Window, _objectSpread(_objectSpread({
      icon: icon,
      name: name,
      bgColor: bgColor
    }, settings), {}, {
      children: AppComponent
    })) : AppComponent
  }));
};

/* harmony default export */ var WindowManager_ProcessWindow = __webpack_exports__["default"] = (ProcessWindow);

/***/ })

};;