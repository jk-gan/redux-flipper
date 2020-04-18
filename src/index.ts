import { addPlugin } from 'react-native-flipper';

let currentConnection: any = null;
const error = {
  NO_STORE: 'NO_STORE',
};

const registerPlugin = (store: any) => {
  addPlugin({
    getId() {
      return 'flipper-plugin-redux-viewer';
    },
    onConnect(connection) {
      console.log('connected to flipper-plugin-redux-viewer');
      currentConnection = connection;

      currentConnection.receive(
        'dispatchAction',
        (data: any, responder: any) => {
          console.log('flipper redux dispatch action data', data);
          // respond with some data
          if (store) {
            store.dispatch({ type: data.type, ...data.payload });

            responder.success({
              ack: true,
            });
          } else {
            responder.success({
              error: error.NO_STORE,
              message: 'store is not setup in flipper plugin',
            });
          }
        },
      );
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
