import { addPlugin } from 'react-native-flipper';
import * as dayjs from 'dayjs';

let currentConnection: any = null;

const registerPlugin = () => {
  addPlugin({
    getId() {
      return 'flipper-plugin-redux-viewer';
    },
    onConnect(connection: any) {
      currentConnection = connection;
    },
    onDisconnect() {},
    runInBackground() {
      return true;
    },
  });
};

const viewer = (store: any) => (next: any) => (action: { type: string }) => {
  let before = store.getState();
  let startTime = Date.now();
  let result = next(action);
  if (currentConnection) {
    let after = store.getState();
    let now = Date.now();
    let state = {
      id: startTime,
      time: dayjs(startTime).format('HH:mm:ss.SSS'),
      took: `${(now - startTime).toFixed(2)} ms`,
      action,
      before,
      after,
    };
    currentConnection.send('actionDispatched', state);
  }

  return result;
};

export { viewer, registerPlugin };
