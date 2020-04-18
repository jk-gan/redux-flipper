# Redux Flipper
Redux middleware for [Flipper](https://fbflipper.com/). It can log redux actions and show inside Flipper using [flipper-plugin-redux-viewer](https://github.com/jk-gan/flipper-plugin-redux-viewer). 

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
  const { createViewer } = require('redux-flipper').default;

  let viewer = createViewer();
  let store = createStore(RootReducer, {}, applyMiddleware(viewer));
} else {
  let store = createStore(RootReducer, {});
}
```

3. Install [flipper-plugin-redux-viewer](https://github.com/jk-gan/flipper-plugin-redux-viewer) in Flipper desktop client

4. Start your app, then you should be able to see Redux Viewer on your Flipper app

