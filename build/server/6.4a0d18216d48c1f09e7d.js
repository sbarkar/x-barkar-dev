exports.ids = [6];
exports.modules = {

/***/ "AeWp":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"taskbarEntry": "TaskbarEntry_taskbarEntry__GRm1o",
	"foreground": "TaskbarEntry_foreground__3NELy"
};


/***/ }),

/***/ "T/bh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: ./styles/System/Taskbar/TaskbarEntry.module.scss
var TaskbarEntry_module = __webpack_require__("AeWp");
var TaskbarEntry_module_default = /*#__PURE__*/__webpack_require__.n(TaskbarEntry_module);

// EXTERNAL MODULE: ./components/System/Icon.tsx
var Icon = __webpack_require__("c5pV");

// CONCATENATED MODULE: ./utils/taskbar.ts
const cycleWindowState = ({
  foregroundId,
  id,
  minimized,
  foreground,
  minimize,
  restore
}) => {
  if (minimized) {
    restore(id, 'minimized');
    foreground(id);
  } else if (foregroundId && foregroundId === id) {
    minimize(id);
    foreground('');
  } else {
    foreground(id);
  }
};
// EXTERNAL MODULE: external "framer-motion"
var external_framer_motion_ = __webpack_require__("wmQq");

// EXTERNAL MODULE: ./contexts/ProcessManager.tsx + 1 modules
var ProcessManager = __webpack_require__("9Z7V");

// EXTERNAL MODULE: ./contexts/SessionManager.tsx + 2 modules
var SessionManager = __webpack_require__("m+kb");

// EXTERNAL MODULE: ./utils/motions.ts
var motions = __webpack_require__("gVB8");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// CONCATENATED MODULE: ./components/System/Taskbar/TaskbarEntry.tsx



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










const TaskbarEntry = ({
  icon,
  id,
  minimized,
  name
}) => {
  const {
    foreground,
    session: {
      foregroundId
    }
  } = Object(external_react_["useContext"])(SessionManager["a" /* SessionContext */]);
  const {
    minimize,
    restore,
    taskbarElement
  } = Object(external_react_["useContext"])(ProcessManager["a" /* ProcessContext */]);
  const refCallback = Object(external_react_["useCallback"])(element => taskbarElement(id, element), [id]);

  const onBlur = () => foreground('');

  const onClick = Object(external_react_["useCallback"])(() => cycleWindowState({
    foregroundId,
    id,
    minimized,
    foreground,
    minimize,
    restore
  }), [foregroundId, id, minimized]);
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_framer_motion_["motion"].li, _objectSpread(_objectSpread({}, motions["c" /* taskbarEntriesMotionSettings */]), {}, {
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
      className: `${TaskbarEntry_module_default.a.taskbarEntry} ${foregroundId === id && TaskbarEntry_module_default.a.foreground}`,
      type: "button",
      ref: refCallback,
      onBlur: onBlur,
      onClick: onClick,
      tabIndex: -1,
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("figure", {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(Icon["a" /* default */], {
          src: icon,
          height: 16,
          width: 16
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("figcaption", {
          children: name
        })]
      })
    })
  }));
};

/* harmony default export */ var Taskbar_TaskbarEntry = __webpack_exports__["default"] = (TaskbarEntry);

/***/ })

};;