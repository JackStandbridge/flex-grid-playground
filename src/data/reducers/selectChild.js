const selectChild = ({ page, pages }, { payload }) => {
	pages[page].currentChild = payload;
}

export default selectChild;