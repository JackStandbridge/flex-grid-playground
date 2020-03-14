import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import reducer from './data/reducer';
import initial from './data/initial';
import * as serviceWorker from './serviceWorker';

const store = configureStore(
	{ reducer },
	initial,
);

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('root'),
);

serviceWorker.register();
