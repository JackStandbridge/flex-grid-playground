import data from '../data.js';

const makeInput = (data, parentset, isFirst) => {
	const {
		name,
		type,
		min,
		max,
		value,
		className
	} = data;

	const parentName = parentset.replace(/\s/g, '-').toLowerCase();
	const fragment = document.createDocumentFragment();
	const input = document.createElement('input');

	input.id = `${ parentName }-${ name }`;
	input.name = parentName;
	input.type = type;

	if (isFirst) {
		input.checked = true;
	}

	const label = document.createElement('label');

	switch (type) {
		case 'number':
			label.textContent = name;
			label.append(input);
			label.style.display = 'flex';
			fragment.append(label);

			input.setAttribute('data-property', name);
			input.setAttribute('min', min);
			input.value = value;
			input.classList.add(className);
			break;

		case 'range':
			input.min = min;
			input.max = max;
			input.value = value;
			fragment.append(input);
			input.classList.add(className);
			break;

		case 'radio':
			label.textContent = name;
			label.prepend(input);
			fragment.append(label);

			input.setAttribute('data-property', parentset);
			input.setAttribute('data-value', name);
			break;

		default:

	}

	return fragment;
}

const makeFieldset = data => {
	const fieldset = document.createElement('fieldset');

	if (data.name) {
		const legend = document.createElement('legend');
		legend.textContent = data.name;
		fieldset.append(legend);
		fieldset.id = data.name.toLowerCase() + '-interface';
	}

	if (data.fieldsets) {
		data.fieldsets.forEach(subset => {
			fieldset.append(makeFieldset(subset));
		});
	}

	if (data.inputs) {
		data.inputs.forEach((input, i) => {
			if (i) {
				const hr = document.createElement('hr');
				fieldset.append(hr);
			}
			fieldset.append(makeInput(input, data.name, !i));
		});
	}

	if (data.className) {
		fieldset.classList.add(data.className);
	}

	return fieldset;
}

const init = () => {
	const mainInterface = document.getElementById('interface');
	const fragment = document.createDocumentFragment();
	data.fieldsets.forEach(fieldset => {
		fragment.append(makeFieldset(fieldset));
	});
	mainInterface.firstElementChild.append(fragment);
}

export default init;