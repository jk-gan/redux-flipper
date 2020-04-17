import { addPlugin } from 'react-native-flipper';

const registerPlugin = () => {
  addPlugin({
    getId() {
      return 'flipper-plugin-redux-devtools';
    },
    onConnect(connection) {
      console.log('connected to flipper-plugin-redux-devtools');
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
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

export { logger, registerPlugin };
