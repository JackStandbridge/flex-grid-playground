import { createReducer, createAction } from '@reduxjs/toolkit';
import initial from './initial';

import {
	setStyleReducer,
	changePageReducer,
	selectChildReducer,
	removeChildReducer,
	setChildrenReducer,
	clearStylesReducer,
	shiftPressedReducer,
} from './reducers';

export const setStyle = createAction('setStyle');
export const changePage = createAction('changePage');
export const selectChild = createAction('selectChild');
export const removeChild = createAction('removeChild');
export const setChildren = createAction('setChildren');
export const clearStyles = createAction('clearStyles');
export const shiftPressed = createAction('shiftPressed');

export { chooseChild } from './asyncActions';

const reducer = createReducer(initial, {
	[setStyle]: setStyleReducer,
	[changePage]: changePageReducer,
	[selectChild]: selectChildReducer,
	[removeChild]: removeChildReducer,
	[setChildren]: setChildrenReducer,
	[clearStyles]: clearStylesReducer,
	[shiftPressed]: shiftPressedReducer,
});

export default reducer;
