import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import reducer from './data/reducer';
import initial from './data/initial';
import * as serviceWorker from './serviceWorker';

const store = configureStore({ reducer }, initial);

const app = (
	<Provider store={ store }>
		<App />
	</Provider>
);

const container = document.getElementById('app-root');

render(app, container);

serviceWorker.register();
