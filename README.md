# Redux Flipper

![screenshot of the plugin](https://imgur.com/QUDYozo.png)

Redux middleware for [Flipper](https://fbflipper.com/). It can log redux actions and show inside Flipper using [flipper-plugin-redux-debugger](https://github.com/jk-gan/flipper-plugin-redux-debugger).

### Support

- React Native
  - For `react-native` >= 0.62, flippler support is enabled by default
  - For `react-native` < 0.62, follow [these steps](https://fbflipper.com/docs/getting-started/react-native.html#manual-setup) to setup your app
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

3. Install [flipper-plugin-redux-debugger](https://github.com/jk-gan/flipper-plugin-redux-debugger) in Flipper desktop client:

```
Manage Plugins > Install Plugins > search "redux-debugger" > Install
```

4. Start your app, then you should be able to see Redux Debugger on your Flipper app

## Optional Configuration

### Resolve cyclic reference

Redux Debugger does not support cyclic reference objects by default as resolving it makes application slow. This feature can be enabled by passing `{ resolveCyclic: true }` into `createDebugger`.

This is just a temporary solution if debugging is urgent. It is advisable to restructure your redux state structure.

For more information about cyclic reference, visit [MDN Cyclic Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value).

```javascript
let reduxDebugger = createDebugger({ resolveCyclic: true });
```
