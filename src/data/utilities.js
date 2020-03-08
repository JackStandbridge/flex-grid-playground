import propertySchema from '../data/propertySchema.json';

const spacer = ({ value, space }) => `${ value }${ space ? ' ' : '' }`;

const join = values => values.map(spacer).join('').trim();

const filterInvalidStyles = (prop, val) => {
	// transforms invalid styles into null

	// create element and apply style to it
	const el = document.createElement('div');
	el.style[prop] = val;

	// only allow style to pass if it can be applied
	return el.style.cssText ? val : null;
}

const constructStyles = (styles, { schema, values }) => {
	const style = filterInvalidStyles(schema, join(values));

	return {
		...styles,
		...(style !== null ? { [schema]: style } : {})
	}
};

export const getConstructedStyle = (
	{
		page,
		pages,
		styleObjects,
		styleEntries
	},
	target,
	id = null,
) => {

	const objectId = id === null ? pages[page][target] : id;
	const entryIds = styleObjects[objectId];
	const targetEntries = entryIds.map(entryId => styleEntries[entryId]);

	return targetEntries.reduce(constructStyles, {});
};

export const generateId = obj => {
	let counter = 0;
	while (true) {
		if (!obj[counter]) {
			return counter;
		}
		counter++
	}
};

export const getObjectId = ({ page, pages, section }) => {

	const currentPage = pages[page];

	const objectId =
		section === 'child'
			? currentPage.currentChild
			: currentPage[section];

	return objectId;
}

export const getEntry = (
	{
		page,
		pages,
		styleObjects,
		styleEntries
	},
	section,
	schema
) => {

	const objectId = getObjectId({ page, pages, section });

	const entryIds = styleObjects[objectId];
	const targetEntries = entryIds.map(id => styleEntries[id]);
	const entry = targetEntries.find(entry => entry.schema === schema);

	return entry;
}

export const getEntries = ({ styleObjects, styleEntries }, objectId) => {
	const entryIds = styleObjects[objectId];
	const entries = entryIds.map(id => styleEntries[id]);

	return entries.map(({ schema, values }) => {
		const value = filterInvalidStyles(schema, join(values));

		if (!value) {
			return null;
		}

		return {
			property: propertySchema[schema].name || schema,
			value,
		}
	}).filter(entry => entry);
}

export const setBrowser = () => {
	const userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.indexOf('safari') !== -1) {
		if (userAgent.indexOf('chrome') === -1) {
			document.body.classList.add('safari');
		} else {
			document.body.classList.add('chrome');
		}
	} else {
		document.body.classList.add('firefox');
	}
}

export const copiableText = ({ name, entries }) => {
	const entryText = entries.map(({ property, value }) => {
		return `\t${ property }: ${ value };\r\n`
	}).join('');

	return `${ name } {\r\n${ entryText }}`;
}

export const allCopiableText = styles => {
	const text = styles.map(copiableText);
	return text.join('\r\n\r\n')
}