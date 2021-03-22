import {
	removeChild,
	selectChild
} from '../reducer';

const chooseChild = id => (dispatch, getState) => {

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

};

export default chooseChild;