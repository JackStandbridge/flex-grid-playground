const makeRange = ({ parentName, min, max, value, name, id }) => {

	const input = document.createElement('input');
	input.id = id || `${ parentName }-${ name }`;
	input.type = 'range';
	input.min = min;
	input.max = max;
	input.value = value;
	input.classList.add('range');

	return input;
}

export default makeRange;