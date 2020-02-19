import state from './state.js';

const makeContents = options => {
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

let shiftListener;
let tooltips = [];
let addButtons = [];
let firstTouch = true;

const removeInputs = buttonWrapper => {
	buttonWrapper.previousElementSibling.remove();
	buttonWrapper.previousElementSibling.remove();
}

const makeMulti = ({ options, parentName }) => {

	const container = document.createElement('div');
	const add = document.createElement('button');
	const tooltip = document.createElement('div');
	const buttonWrapper = document.createElement('div');
	tooltips.push(tooltip);
	addButtons.push(add);

	add.addEventListener('click', ({ shiftKey }) => {

		if (shiftKey) {
			removeInputs(buttonWrapper);
		}

		const inputs = [...container.querySelectorAll('input, select')];

		if (!shiftKey) {

			const contents = makeContents(options, parentName);
			inputs.push(...contents.inputs);
			buttonWrapper.before(contents.fragment);

		}

		state.setConstructedStyle(inputs, parentName);

		// fix safari focus inconsistency
		add.focus();
	});

	add.addEventListener('mouseenter', ({ shiftKey }) => {
		if (shiftKey) {
			add.classList.add('remove');
		}
	});

	add.addEventListener('mouseleave', ({ shiftKey }) => {
		if (
			shiftKey &&
			!(
				add.matches(':hover')
				|| add.matches(':focus')
				|| add.matches(':active')
			)
		) {
			add.classList.remove('remove');
		}
	});

	if (!shiftListener) {

		shiftListener = document.addEventListener('keydown', ({ key }) => {
			if (
				key === 'Shift'
				&& (
					add.matches(':hover')
					|| add.matches(':focus')
					|| add.matches(':active')
				)
			) {
				add.classList.add('remove');
			}
		});

		document.addEventListener('keyup', (e) => {
			if (e.key === 'Shift' && add.classList.contains('remove')) {
				add.classList.remove('remove');
			}
		});

	}

	tooltip.textContent = 'Shift click to remove';

	let touchTimeout;

	add.addEventListener('touchstart', () => {

		if (firstTouch) {
			tooltips.forEach(tooltip => {
				tooltip.textContent = 'Long press to remove';
			});
		}

		firstTouch = false;
		add.classList.add('remove');

		clearTimeout(touchTimeout);

		touchTimeout = setTimeout(() => {
			removeInputs(buttonWrapper);
			const inputs = [...container.querySelectorAll('input, select')];
			state.setConstructedStyle(inputs, parentName);
		}, 1000);

	});

	add.addEventListener('touchend', () => {
		clearTimeout(touchTimeout);
		add.classList.remove('remove');
	});

	add.addEventListener('contextmenu', e => e.preventDefault());

	container.classList.add('multi-container');
	add.classList.add('add');
	tooltip.classList.add('tooltip', 'disappear');
	buttonWrapper.classList.add('button-wrapper');

	buttonWrapper.append(add);
	buttonWrapper.append(tooltip);
	container.append(buttonWrapper);
	container.setAttribute('data-property', parentName);

	const contents = makeContents(options, parentName);

	state.setConstructedStyle(contents.inputs, parentName);

	buttonWrapper.before(contents.fragment);

	return container;
}

export default makeMulti;