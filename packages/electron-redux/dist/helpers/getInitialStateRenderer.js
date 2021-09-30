'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = getInitialStateRenderer;

var _electron = require('electron');

function getInitialStateRenderer() {
  var reduxState = _electron.ipcRenderer.sendSync('fetch-redux-state');

  if (!reduxState) {
    throw new Error(
      'Could not find reduxState global in main process, did you forget to call replayActionMain?',
    );
  }

  return JSON.parse(reduxState);
}
