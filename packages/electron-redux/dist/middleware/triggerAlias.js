"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _assert = _interopRequireDefault(require("assert"));

var _alias = require("../actions/alias");

var _alias2 = _interopRequireDefault(require("../registry/alias"));

var _expandAliasedAction = _interopRequireDefault(require("../helpers/expandAliasedAction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-param-reassign */

/* eslint-disable no-unused-vars */
var triggerAlias = function triggerAlias(store) {
  return function (next) {
    return function (action) {
      // TODO: store.dispatch() instead to not skip any middleware
      if (action.type === _alias.ALIASED) {
        action = (0, _expandAliasedAction["default"])(action);
      }

      return next(action);
    };
  };
};

var _default = triggerAlias;
exports["default"] = _default;