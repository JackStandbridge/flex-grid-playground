import { createReducer, createAction } from '@reduxjs/toolkit';
import initial from './initial';

import {
	setStyleReducer,
	changePageReducer,
	selectChildReducer,
	removeChildReducer,
	setChildrenReducer,
	shiftPressedReducer,
} from './reducers';

export const setStyle = createAction('setStyle');
export const changePage = createAction('changePage');
export const selectChild = createAction('selectChild');
export const removeChild = createAction('removeChild');
export const setChildren = createAction('setChildren');
export const shiftPressed = createAction('shiftPressed');

const reducer = createReducer(initial, {
	[setStyle]: setStyleReducer,
	[changePage]: changePageReducer,
	[selectChild]: selectChildReducer,
	[removeChild]: removeChildReducer,
	[setChildren]: setChildrenReducer,
	[shiftPressed]: shiftPressedReducer,
});

export default reducer;

export const chooseChild = id => (dispatch, getState) => {

	const state = getState();
	const { page, pages } = state;
	const currentChild = pages[page].currentChild;

	if (currentChild === id) {
		return;
	}

	const timeout = currentChild === null ? 0 : 200;
	dispatch(removeChild(currentChild));
	setTimeout(() => {
		dispatch(selectChild(id));
	}, timeout);

}