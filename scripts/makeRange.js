const makeRange = ({ parentName, min, max, value }) => {

	const input = document.createElement('input');

	input.id = `${ parentName }-${ name }`;
	input.name = parentName;
	input.type = 'range';
	input.min = min;
	input.max = max;
	input.value = value;
	input.classList.add('range');

	return input;
}

export default makeRange;