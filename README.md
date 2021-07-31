# Redux Flipper

![screenshot of the plugin](https://i.imgur.com/blqn8oT.png)

Redux middleware for [Flipper](https://fbflipper.com/). It can log redux actions and show inside Flipper using [flipper-plugin-redux-debugger](https://github.com/jk-gan/flipper-plugin-redux-debugger).

### Support

- React Native
  - For `react-native` >= 0.62, flipper support is enabled by default
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

const middlewares = [
  /* other middlewares */
];

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

## Optional Configuration

### State whitelisting

Many times you are only interested in certain part of the Redux state when debugging. You can pass array of string which have to match to the root key of the Redux state.

For example if Redux schema is something like this and you are only interested in user then you can whitelist only that part of the state

```typescript
type ReduxState = {
  todos: string[];
  notifications: string[];
  user: {
    name: string;
  };
};
```

```javascript
let reduxDebugger = createDebugger({ stateWhitelist: ['user'] });
```

If you app has very big state tree it is also good idea to whitelist certain keys from Redux state otherwise Flipper can be very slow.

### Resolve cyclic reference

Redux Debugger does not support cyclic reference objects by default as resolving it makes application slow. This feature can be enabled by passing `{ resolveCyclic: true }` into `createDebugger`.

This is just a temporary solution if debugging is urgent. It is advisable to restructure your redux state structure.

For more information about cyclic reference, visit [MDN Cyclic Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value).

```javascript
let reduxDebugger = createDebugger({ resolveCyclic: true });
```

### Actions Blacklist

You may specify an actions blacklist the same way as with React Native Debugger, by providing an
array of strings to match against the action.type field.
This feature can be enabled by passing `{ actionsBlacklist }` into `createDebugger`,
where `actionsBlacklist` is an array of strings.

For example:

```javascript
const actionsBlacklist = ['EVENTS/', 'LOCAL/setClock'];
const reduxDebugger = createDebugger({ actionsBlacklist });
```

This will exclude any actions that contain the substrings in the blacklist. So an action with type
`EVENTS/foo` will not be sent to the redux debugger flipper plugin, but an action with type
`LOCAL/anotherAction` will.
