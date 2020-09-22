import { addPlugin } from 'react-native-flipper';
import * as dayjs from 'dayjs';

type Configuration = {
  resolveCyclic: boolean;
  actionsBlacklist: Array<string>;
};

const defaultConfig: Configuration = {
  resolveCyclic: false,
  actionsBlacklist: [],
};

let currentConnection: any = null;
const error = {
  NO_STORE: 'NO_STORE',
};

const createDebugger = (config = defaultConfig) => (store: any) => {
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

      if (config.resolveCyclic) {
        const cycle = require('cycle');

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

      let blackListed = false;
      for (const substr of config.actionsBlacklist) {
        if (action.type.includes(substr)) {
          blackListed = true;
          break;
        }
      }
      if (!blackListed) {
        currentConnection.send('actionDispatched', state);
      }
    }

    return result;
  };
};

export default createDebugger;
