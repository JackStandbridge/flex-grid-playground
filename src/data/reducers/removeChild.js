const removeChild = (state, { payload }) => {
	state.removingChild = payload;
};

export default removeChild;