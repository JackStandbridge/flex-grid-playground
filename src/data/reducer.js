import { createReducer, createAction } from '@reduxjs/toolkit';
import initial from './initial';

const updateStyle = createAction('updateStyle');

const reducer = createReducer(initial, {
	[updateStyle]: (state, action) => {

	}
});

export default reducer;