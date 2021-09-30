"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "forwardToMain", {
  enumerable: true,
  get: function get() {
    return _forwardToMain["default"];
  }
});
Object.defineProperty(exports, "forwardToMainWithParams", {
  enumerable: true,
  get: function get() {
    return _forwardToMain.forwardToMainWithParams;
  }
});
Object.defineProperty(exports, "forwardToRenderer", {
  enumerable: true,
  get: function get() {
    return _forwardToRenderer["default"];
  }
});
Object.defineProperty(exports, "triggerAlias", {
  enumerable: true,
  get: function get() {
    return _triggerAlias["default"];
  }
});
Object.defineProperty(exports, "createAliasedAction", {
  enumerable: true,
  get: function get() {
    return _createAliasedAction["default"];
  }
});
Object.defineProperty(exports, "replayActionMain", {
  enumerable: true,
  get: function get() {
    return _replayActionMain["default"];
  }
});
Object.defineProperty(exports, "replayActionRenderer", {
  enumerable: true,
  get: function get() {
    return _replayActionRenderer["default"];
  }
});
Object.defineProperty(exports, "getInitialStateRenderer", {
  enumerable: true,
  get: function get() {
    return _getInitialStateRenderer["default"];
  }
});

var _forwardToMain = _interopRequireWildcard(require("./middleware/forwardToMain"));

var _forwardToRenderer = _interopRequireDefault(require("./middleware/forwardToRenderer"));

var _triggerAlias = _interopRequireDefault(require("./middleware/triggerAlias"));

var _createAliasedAction = _interopRequireDefault(require("./helpers/createAliasedAction"));

var _replayActionMain = _interopRequireDefault(require("./helpers/replayActionMain"));

var _replayActionRenderer = _interopRequireDefault(require("./helpers/replayActionRenderer"));

var _getInitialStateRenderer = _interopRequireDefault(require("./helpers/getInitialStateRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }