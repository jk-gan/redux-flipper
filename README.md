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

const middlewares = [/* other middlewares */];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const store = createStore(RootReducer, applyMiddleware(...middlewares));
```

3. Install [flipper-plugin-redux-debugger](https://github.com/jk-gan/flipper-plugin-redux-debugger) in Flipper desktop client:

```
Manage Plugins > Install Plugins > search "redux-debugger" > Install
```

4. Start your app, then you should be able to see Redux Debugger on your Flipper app
