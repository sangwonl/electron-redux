"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _electron = require("electron");

var _forwardToMain = _interopRequireWildcard(require("../forwardToMain"));

var _validateAction = _interopRequireDefault(require("../../helpers/validateAction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

jest.unmock('../forwardToMain');
describe('forwardToMain', function () {
  beforeEach(function () {
    _validateAction["default"].mockReturnValue(true);
  });
  it("should pass an action through if it doesn't pass validation (FSA)", function () {
    var next = jest.fn(); // thunk action

    var action = function action() {};

    _validateAction["default"].mockReturnValue(false);

    (0, _forwardToMain["default"])()(next)(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should pass an action through if it starts with @@', function () {
    var next = jest.fn();
    var action = {
      type: '@@SOMETHING'
    };
    (0, _forwardToMain["default"])()(next)(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should pass an action through if it starts with redux-form', function () {
    var next = jest.fn();
    var action = {
      type: 'redux-form'
    };
    (0, _forwardToMain["default"])()(next)(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should pass an action through if the scope is local', function () {
    var next = jest.fn();
    var action = {
      type: 'MY_ACTION',
      meta: {
        scope: 'local'
      }
    };
    (0, _forwardToMain["default"])()(next)(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should forward any actions to the main process', function () {
    var next = jest.fn();
    var action = {
      type: 'SOMETHING',
      meta: {
        some: 'meta'
      }
    };
    (0, _forwardToMain["default"])()(next)(action);
    expect(_electron.ipcRenderer.send).toHaveBeenCalledTimes(1);
    expect(_electron.ipcRenderer.send).toHaveBeenCalledWith('redux-action', action);
    expect(next).toHaveBeenCalledTimes(0);
  });
});
describe('forwardToMainWithParams', function () {
  beforeEach(function () {
    jest.clearAllMocks();

    _validateAction["default"].mockReturnValue(true);
  });
  it('should forward an action through if it starts with @@', function () {
    var next = jest.fn();
    var action = {
      type: '@@SOMETHING'
    };
    (0, _forwardToMain.forwardToMainWithParams)()()(next)(action);
    expect(_electron.ipcRenderer.send).toHaveBeenCalledTimes(1);
    expect(_electron.ipcRenderer.send).toHaveBeenCalledWith('redux-action', action);
    expect(next).toHaveBeenCalledTimes(0);
  });
  it('should forward an action through if it starts with redux-form', function () {
    var next = jest.fn();
    var action = {
      type: 'redux-form'
    };
    (0, _forwardToMain.forwardToMainWithParams)()()(next)(action);
    expect(_electron.ipcRenderer.send).toHaveBeenCalledTimes(1);
    expect(_electron.ipcRenderer.send).toHaveBeenCalledWith('redux-action', action);
    expect(next).toHaveBeenCalledTimes(0);
  });
  it('should pass an action through if it is blacklisted', function () {
    var next = jest.fn();
    var action = {
      type: '@@SOMETHING'
    };
    (0, _forwardToMain.forwardToMainWithParams)({
      blacklist: [/^@@/]
    })()(next)(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
});