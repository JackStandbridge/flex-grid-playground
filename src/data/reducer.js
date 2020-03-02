import { createReducer, createAction } from '@reduxjs/toolkit';
import initial from './initial';

import {
	selectChildReducer,
	setChildrenReducer,
	changePageReducer,
	setStyleReducer,
} from './reducers';

export const changePage = createAction('changePage');
export const setStyle = createAction('setStyle');
export const selectChild = createAction('selectChild');
export const setChildren = createAction('setChildren');

const reducer = createReducer(initial, {
	[selectChild]: selectChildReducer,
	[setChildren]: setChildrenReducer,
	[changePage]: changePageReducer,
	[setStyle]: setStyleReducer,
});

export default reducer;