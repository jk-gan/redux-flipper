import { addPlugin } from 'react-native-flipper';
import * as dayjs from 'dayjs';

const cycle = require('cycle');

type Configuration = {
  resolveCyclic: boolean;
};

const defaultConfig: Configuration = { resolveCyclic: false };

let currentConnection: any = null;
const error = {
  NO_STORE: 'NO_STORE',
};

const createDebugger = ({ resolveCyclic }: Configuration = defaultConfig) => (
  store: any,
) => {
  if (currentConnection == null) {
    addPlugin({
      getId() {
        return 'flipper-plugin-redux-debugger';
      },
      onConnect(connection: any) {
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
  }

  return (next: any) => (action: { type: string }) => {
    let startTime = Date.now();
    let before = store.getState();
    let result = next(action);
    if (currentConnection) {
      let after = store.getState();
      let now = Date.now();

      if (resolveCyclic) {
        before = cycle.decycle(before);
        after = cycle.decycle(after);
      }

      let state = {
        id: startTime,
        time: dayjs(startTime).format('HH:mm:ss.SSS'),
        took: `${now - startTime} ms`,
        action,
        before,
        after,
      };
      currentConnection.send('actionDispatched', state);
    }

    return result;
  };
};

export default createDebugger;
