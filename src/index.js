import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import * as serviceWorker from './serviceWorker';

console.log(configureStore);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
