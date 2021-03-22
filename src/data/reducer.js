import { createReducer, createAction } from '@reduxjs/toolkit';
import initial from './initial';
import * as reducers from './reducers';

export const setStyle = createAction('setStyle');
export const clearAll = createAction('clearAll');
export const changePage = createAction('changePage');
export const selectChild = createAction('selectChild');
export const removeChild = createAction('removeChild');
export const setChildren = createAction('setChildren');
export const clearStyles = createAction('clearStyles');
export const shiftPressed = createAction('shiftPressed');
export { chooseChild } from './asyncActions';

const reducer = createReducer(initial, {
	[setStyle]: reducers.setStyle,
	[clearAll]: reducers.clearAll,
	[changePage]: reducers.changePage,
	[selectChild]: reducers.selectChild,
	[removeChild]: reducers.removeChild,
	[setChildren]: reducers.setChildren,
	[clearStyles]: reducers.clearStyles,
	[shiftPressed]: reducers.shiftPressed,
});

export default reducer;
