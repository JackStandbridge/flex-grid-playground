import store from '../store.js';

import handleMultiButtons from '../events/handleMultiButtons.js';

const Contents = (options) => {
	const contents = {
		inputs: [],
		fragment: document.createDocumentFragment(),
	};

	const input = document.createElement('input');
	const select = document.createElement('select');

	options.forEach(text => {

		const option = document.createElement('option');
		option.textContent = text;
		select.append(option);

	});

	input.type = 'number';
	input.min = 0;
	input.max = 999;
	input.value = 1;
	input.classList.add('number', 'number--multi');

	select.classList.add('select', 'select--multi');

	contents.inputs.push(input);
	contents.fragment.append(input);
	contents.inputs.push(select);
	contents.fragment.append(select);

	return contents;

}

let tooltips = [];
let addButtons = [];

const Multi = ({ options, parentName }) => {

	const container = document.createElement('div');
	const add = document.createElement('button');
	const tooltip = document.createElement('div');
	const buttonWrapper = document.createElement('div');
	tooltips.push(tooltip);
	addButtons.push(add);

	handleMultiButtons({
		add,
		buttonWrapper,
		tooltips,
		container,
		Contents,
		options,
		parentName,
	});

	container.classList.add('multi-container');
	add.classList.add('add');
	tooltip.classList.add('tooltip', 'disappear');
	buttonWrapper.classList.add('button-wrapper');

	tooltip.textContent = 'Shift click to remove';

	buttonWrapper.append(add);
	buttonWrapper.append(tooltip);
	container.append(buttonWrapper);
	container.setAttribute('data-property', parentName);

	const contents = Contents(options, parentName);

	const property = parentName;
	const value = '1fr';
	const section = 'parentStyles';
	store.setStyle(property, value, section);

	buttonWrapper.before(contents.fragment);

	return container;
}

export default Multi;