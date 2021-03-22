const selectChild = (state, { payload }) => {
	const { page, pages } = state;
	pages[page].currentChild = payload;
	state.removingChild = null;

}

export default selectChild;