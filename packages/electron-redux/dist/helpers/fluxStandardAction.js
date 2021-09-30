"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFSA = isFSA;
exports.isError = isError;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isValidKey(key) {
  return ['type', 'payload', 'error', 'meta'].indexOf(key) > -1;
}

function isFSA(action) {
  return _typeof(action) === 'object' && !Array.isArray(action) && typeof action.type === 'string' && Object.keys(action).every(isValidKey);
}

function isError(action) {
  return isFSA(action) && action.error === true;
}