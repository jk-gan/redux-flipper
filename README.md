# Redux Flipper

Redux middleware for [Flipper](https://fbflipper.com/). It can log redux actions and show inside Flipper using [flipper-plugin-redux-debugger](https://github.com/jk-gan/flipper-plugin-redux-debugger).

### Support

- React Native >= 0.62.0
- Redux or Redux-Toolkit

## Get Started

1. Install [redux-flipper](https://github.com/jk-gan/redux-flipper) middleware and `react-native-flipper` in your React Native app:

```bash
yarn add redux-flipper react-native-flipper
# for iOS
cd ios && pod install
```

2. Add the middleware into your redux store:

```javascript
import { createStore, applyMiddleware } from 'redux';

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;

  let reduxDebugger = createDebugger();
  let store = createStore(RootReducer, {}, applyMiddleware(reduxDebugger));
} else {
  let store = createStore(RootReducer, {});
}
```

3. Install [flipper-plugin-redux-debugger](https://github.com/jk-gan/flipper-plugin-redux-debugger) in Flipper desktop client

4. Start your app, then you should be able to see Redux Debugger on your Flipper app
