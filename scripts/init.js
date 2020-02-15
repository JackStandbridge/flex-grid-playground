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


const tabs = [...document.querySelectorAll('.tab')];
const setTab = page => {
	location.hash = '#' + page;
	const chosenTab = tabs.find(tab => tab.dataset.playground === page);
	const oldTab = tabs.find(tab => tab.classList.contains('tab--active'));

	chosenTab.classList.remove('tab--inactive');
	chosenTab.classList.add('tab--active');

	if (oldTab) {
		oldTab.classList.remove('tab--active');
		oldTab.classList.add('tab--inactive');
	}
}

const mainInterface = document.getElementById('interface');
const container = document.getElementById('container');
const pages = {};

const init = page => {
	// add grid or flex to container
	container.style.display = page;
	setTab(page);

	mainInterface.textContent = '';
	const fragment = document.createDocumentFragment();

	if (pages[page]) {
		pages[page].forEach(el => fragment.append(el));
	} else {
		data[page].fieldsets.forEach(fieldset => {
			fragment.append(makeFieldset(fieldset));
		});
		pages[page] = [...fragment.children];
	}

	mainInterface.append(fragment);
}

export default init;