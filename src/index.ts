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
  console.group(action.type);
  console.info('dispatching', action);
  if (currentConnection) {
    currentConnection.send('oldState', store.getState());
    currentConnection.send('actionDispatched', action);
  }
  let result = next(action);
  console.log('next state', store.getState());
  if (currentConnection) {
    currentConnection.send('newState', store.getState());
  }
  console.groupEnd();
  return result;
};

export { logger, registerPlugin };
