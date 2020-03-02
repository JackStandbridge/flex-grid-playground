import { generateId, getEntry } from '../utilities';

const setStyle = (state, { payload }) => {

	const { styleObjects, styleEntries } = state;
	const { schema, values } = payload;
	const { entry, objectId } = getEntry(state, payload);

	if (entry) {
		entry.values = values;

	} else {
		const newEntry = { schema, values };
		const id = generateId(styleEntries);

		styleEntries[id] = newEntry;

		styleObjects[objectId].push(id);
	}

}

export default setStyle;