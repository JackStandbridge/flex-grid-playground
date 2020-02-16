const makeContents = (options, parentName) => {
	const fragment = document.createDocumentFragment();
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
	input.classList.add('number', 'number--multi');

	select.classList.add('select', 'select--multi');

	fragment.append(input);
	fragment.append(select);

	return fragment;

}

let shiftListener;

const makeMulti = ({ options, parentName }) => {

	const container = document.createElement('div');
	const add = document.createElement('button');
	const tooltip = document.createElement('div');
	const buttonWrapper = document.createElement('div');

	add.addEventListener('click', ({ shiftKey }) => {
		if (shiftKey) {
			buttonWrapper.previousElementSibling.remove()
			buttonWrapper.previousElementSibling.remove()
		} else {
			buttonWrapper.before(makeContents(options, parentName));
		}

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

	container.classList.add('multi-container');
	add.classList.add('add');
	tooltip.classList.add('tooltip', 'disappear');
	buttonWrapper.classList.add('button-wrapper');

	buttonWrapper.append(add);
	buttonWrapper.append(tooltip);
	container.append(buttonWrapper);

	buttonWrapper.before(makeContents(options, parentName));

	return container;
}

export default makeMulti;