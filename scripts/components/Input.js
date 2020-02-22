import Numeric from './Numeric.js';
import Range from './Range.js';
import Radio from './Radio.js';
import Multi from './Multi.js';

const Input = (data, parentset, isFirst) => {
	const { type } = data;
	const parentName = parentset.replace(/\s/g, '-').toLowerCase();
	const props = {
		...data,
		parentName,
		isFirst,
		parentset,
	};

	switch (type) {
		case 'number': return Numeric(props);
		case 'range': return Range(props);
		case 'radio': return Radio(props);
		case 'multi': return Multi(props);
	}
}

export default Input;