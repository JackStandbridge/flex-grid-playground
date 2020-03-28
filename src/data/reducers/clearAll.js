import initial from '../initial';

const clearAll = state => {
	const page = state.pages[state.page];
	const toClear = page.child;
	const toReset = [page.children, page.parent]

	toClear.forEach(objId => {
		state.styleObjects[objId].forEach(entryId => {
			delete state.styleEntries[entryId];
		});
		state.styleObjects[objId] = [];
	});

	toReset.forEach(objId => {
		if (objId in initial.styleObjects) {
			state.styleObjects[objId] = initial.styleObjects[objId];
		} else {
			state.styleObjects[objId].forEach(entryId => {
				delete state.styleEntries[entryId];
			})
		}
	})

};

export default clearAll;