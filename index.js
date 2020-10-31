/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';

// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


import MainApp from './App'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import AppReducer from './src/reducers';
import {name as appName} from './app.json';
import { MenuProvider } from 'react-native-popup-menu';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

let store = createStore(AppReducer, compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
));

const App = () => (
    <Provider store={store}>
    	<MenuProvider>
        	<MainApp/>
        </MenuProvider>
    </Provider>
);

//console.ignoredYellowBox = ['Remote debugger'];
AppRegistry.registerComponent(appName, () => App);
export default App;
