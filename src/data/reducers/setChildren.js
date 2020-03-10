import { generateId } from '../utilities';

const createChildren = ({ pages, page, styleObjects }) => {
	const { child } = pages[page];
	const id = generateId(styleObjects);
	styleObjects[id] = [];
	child.push(id);
};

const deleteChildren = ({ pages, page, styleObjects, styleEntries }) => {
	const { child } = pages[page];
	const deleted = child.pop();

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
	const { child } = pages[page];
	while (payload > child.length) {
		createChildren(state);
	}
	while (payload < child.length) {
		deleteChildren(state);
	}
};

export default setChildren;