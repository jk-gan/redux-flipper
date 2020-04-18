# Redux Flipper
Redux middleware for [Flipper](https://fbflipper.com/). It can log redux actions and show inside Flipper. 

### Support
- React Native >= 0.62.0
- Redux or Redux-Toolkit

## Get Started
1. Install [redux-flipper](https://github.com/jk-gan/redux-flipper) middleware in your React Native app:
```bash
yarn add redux-flipper react-native-flipper
# for iOS
cd ios && pod install
```

2. Add the middleware into your redux store:
```javascript
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-flipper';

let store = createStore(RootReducer, {}, applyMiddleware(logger));
```

3. Register plugin in your app:
```javascript
// Add this line in your root component
import react, { useEffect } from 'react';
import { registerPlugin } from 'redux-flipper';

useEffect(() => {
  registerPlugin();
}, [])
```

4. Install [flipper-plugin-redux-viewer](https://github.com/jk-gan/flipper-plugin-redux-viewer) in Flipper desktop client

5. Start your app, then you should be able to see Redux Viewer on your Flipper app

