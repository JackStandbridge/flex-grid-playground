const clearStyles = (state, { payload }) => {
	const { page, pages, styleObjects, styleEntries } = state;

	const styleObjectId =
		payload.section === 'child'
			? pages[page].currentChild
			: pages[page][payload.section];

	styleObjects[styleObjectId].forEach(styleEntry => {
		if (!styleEntries[styleEntry].protected) {
			delete styleEntries[styleEntry];
		}
	});

	styleObjects[styleObjectId] = styleObjects[styleObjectId]
		.filter(styleEntry => styleEntries[styleEntry]);

}

export default clearStyles;