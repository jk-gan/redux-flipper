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
  let result = next(action);
  if (currentConnection) {
    let after = store.getState();
    let now = Date.now();
    let state = {
      id: now,
      time: dayjs(now).format('HH:mm:ss.SSS'),
      action,
      before,
      after,
    };
    currentConnection.send('actionDispatched', state);
  }

  return result;
};

export { viewer, registerPlugin };
