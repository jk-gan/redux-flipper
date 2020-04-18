import { addPlugin } from 'react-native-flipper';

let currentConnection: any = null;

const registerPlugin = () => {
  addPlugin({
    getId() {
      return 'flipper-plugin-redux-viewer';
    },
    onConnect(connection) {
      console.log('connected to flipper-plugin-redux-viewer');
      currentConnection = connection;
    },
    onDisconnect() {},
    runInBackground() {
      return true;
    },
  });
};

const logger = (store: any) => (next: any) => (action: { type: string }) => {
  let before = store.getState();
  let result = next(action);
  if (currentConnection) {
    let after = store.getState();
    let state = {
      id: Date.now(),
      action,
      before,
      after,
    };
    currentConnection.send('actionDispatched', state);
  }

  return result;
};

export { logger, registerPlugin };
