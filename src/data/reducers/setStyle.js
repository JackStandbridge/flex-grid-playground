import { generateId, getEntry, getObjectId } from '../utilities';

const setStyle = (state, { payload }) => {

	const { styleObjects, styleEntries } = state;
	const { newEntry, section, schema } = payload;
	const entry = getEntry(state, section, schema);
	const objectId = getObjectId({ ...state, section });

	if (!entry) {
		const id = generateId(styleEntries);

		newEntry.id = id;
		styleEntries[id] = newEntry;
		styleObjects[objectId].push(id);

	} else {
		styleEntries[entry.id] = newEntry;
	}

}

export default setStyle;