import { addPlugin } from 'react-native-flipper';

const registerPlugin = () => () => {
  addPlugin({
    getId() {
      return 'FlipperPluginReduxDevTools';
    },
    onConnect(connection) {},
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
