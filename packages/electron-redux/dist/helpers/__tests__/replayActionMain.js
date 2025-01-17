"use strict";

var _electron = require("electron");

var _replayActionMain = _interopRequireDefault(require("../replayActionMain"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.unmock('../replayActionMain');
describe('replayActionMain', function () {
  it('should replay any actions received', function () {
    var store = {
      dispatch: jest.fn(),
      getState: jest.fn(),
      subscribe: jest.fn()
    };
    var payload = 123;
    (0, _replayActionMain["default"])(store);
    expect(_electron.ipcMain.on).toHaveBeenCalledTimes(1);
    expect(_electron.ipcMain.on.mock.calls[0][0]).toBe('redux-action');
    expect(_electron.ipcMain.on.mock.calls[0][1]).toBeInstanceOf(Function);
    var cb = _electron.ipcMain.on.mock.calls[0][1];
    cb('someEvent', payload);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(payload);
  });
  it('should return the current state from the global', function () {
    var initialState = {
      initial: 'state'
    };
    var newState = {
      "new": 'state'
    };
    var store = {
      dispatch: jest.fn(),
      getState: jest.fn(),
      subscribe: jest.fn()
    };
    store.getState.mockReturnValueOnce(initialState);
    store.getState.mockReturnValueOnce(newState);
    (0, _replayActionMain["default"])(store);
    expect(global.getReduxState()).toEqual(JSON.stringify(initialState));
    expect(store.getState).toHaveBeenCalledTimes(1);
    expect(global.getReduxState()).toEqual(JSON.stringify(newState));
    expect(store.getState).toHaveBeenCalledTimes(2);
  });
});