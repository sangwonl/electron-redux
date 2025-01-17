"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remote = exports.ipcRenderer = exports.ipcMain = exports.webContents = exports["default"] = void 0;

var _default = jest.fn();

exports["default"] = _default;
var webContents = {
  getAllWebContents: jest.fn(function () {
    return [];
  })
};
exports.webContents = webContents;
var ipcMain = {
  on: jest.fn()
};
exports.ipcMain = ipcMain;
var ipcRenderer = {
  on: jest.fn(),
  send: jest.fn()
};
exports.ipcRenderer = ipcRenderer;
var remote = {
  getGlobal: jest.fn()
};
exports.remote = remote;