import { ipcMain } from 'electron';

export default function replayActionMain(store) {
  /**
   * Give renderers a way to sync the current state of the store, but be sure
   * we don't expose any remote objects. In other words, we need our state to
   * be serializable.
   *
   * Refer to https://github.com/electron/electron/blob/master/docs/api/remote.md#remote-objects
   */
  global.getReduxState = () => JSON.stringify(store.getState());

  ipcMain.on('redux-action', (event, payload) => {
    store.dispatch(payload);
  });

  ipcMain.on('fetch-redux-state', event => {
    event.returnValue = global.getReduxState();
  });
}
