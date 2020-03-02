import { generateId } from '../utilities';

const createChildren = ({ pages, page, styleObjects }) => {
	const { childStyles } = pages[page];
	const id = generateId(styleObjects);
	styleObjects[id] = [];
	childStyles.push(id);
};

const deleteChildren = ({ pages, page, styleObjects, styleEntries }) => {
	const { childStyles } = pages[page];
	const deleted = childStyles.pop();

	const { currentChild } = pages[page];

	if (deleted === currentChild) {
		pages[page].currentChild = null;
	}

	styleObjects[deleted].forEach(entry => {
		delete styleEntries[entry];
	});

	delete styleObjects[deleted];
}

const setChildren = (state, { payload }) => {
	const { page, pages } = state;
	const { childStyles } = pages[page];
	while (payload > childStyles.length) {
		createChildren(state);
	}
	while (payload < childStyles.length) {
		deleteChildren(state);
	}
};

export default setChildren;