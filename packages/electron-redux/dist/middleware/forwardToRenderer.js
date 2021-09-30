"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _electron = require("electron");

var _validateAction = _interopRequireDefault(require("../helpers/validateAction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var forwardToRenderer = function forwardToRenderer() {
  return function (next) {
    return function (action) {
      if (!(0, _validateAction["default"])(action)) return next(action);
      if (action.meta && action.meta.scope === 'local') return next(action); // change scope to avoid endless-loop

      var rendererAction = _objectSpread(_objectSpread({}, action), {}, {
        meta: _objectSpread(_objectSpread({}, action.meta), {}, {
          scope: 'local'
        })
      });

      var allWebContents = _electron.webContents.getAllWebContents();

      allWebContents.forEach(function (contents) {
        contents.send('redux-action', rendererAction);
      });
      return next(action);
    };
  };
};

var _default = forwardToRenderer;
exports["default"] = _default;