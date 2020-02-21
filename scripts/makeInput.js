import makeNumber from './makeNumber.js';
import makeRange from './makeRange.js';
import makeRadio from './makeRadio.js';
import makeMulti from './makeMulti.js';

const makeInput = (data, parentset, isFirst) => {
	const { type } = data;
	const parentName = parentset.replace(/\s/g, '-').toLowerCase();
	const props = {
		...data,
		parentName,
		isFirst,
		parentset,
	};

	switch (type) {
		case 'number': return makeNumber(props);
		case 'range': return makeRange(props);
		case 'radio': return makeRadio(props);
		case 'multi': return makeMulti(props);
	}
}

export default makeInput;