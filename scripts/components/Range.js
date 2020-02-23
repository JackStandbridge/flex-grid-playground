const Range = ({ parentName, min, max, value, name, id }) => {

	const container = document.createElement('div');
	container.classList.add('range__container');

	const input = document.createElement('input');
	input.id = id || `${ parentName }-${ name }`;
	input.type = 'range';
	input.min = min;
	input.max = max;
	input.value = value;
	input.classList.add('range');

	const tooltip = document.createElement('div');
	tooltip.classList.add('range__tooltip');
	tooltip.classList.add('tooltip');

	container.append(input);
	container.append(tooltip);

	return container;
}

export default Range;