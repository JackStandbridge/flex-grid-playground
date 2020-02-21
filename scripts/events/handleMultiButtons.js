import store from '../store.js';
import { getConstructedStyle } from '../utilities/utilities.js';

const removeInputs = buttonWrapper => {
	for (let i = 0; i < 2; i++) {
		if (buttonWrapper.previousElementSibling) {
			buttonWrapper.previousElementSibling.remove();
		}
	}
}

const handleClick = ({ add, makeContents, options, parentName, buttonWrapper, container }) => {
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

		const property = parentName;
		const value = getConstructedStyle(inputs);
		const section = 'parentStyles';
		store.setStyle(property, value, section);

		// fix safari focus inconsistency
		add.focus();
	});
};

const handleHover = ({ add }) => {
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
};

const handleShift = ({ add }) => {
	document.addEventListener('keydown', ({ key }) => {

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
};

const handleTouch = ({ add, tooltips, buttonWrapper, parentName, container }) => {
	let touchTimeout;
	let firstTouch = true;

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
			const property = parentName;
			const value = getConstructedStyle(inputs);
			const section = 'parentStyles';

			store.setStyle(property, value, section);

		}, 900);

	});

	add.addEventListener('touchend', () => {
		clearTimeout(touchTimeout);
		add.classList.remove('remove');
	});

	add.addEventListener('contextmenu', e => e.preventDefault());

};

const handleMultiButtons = options => {
	handleClick(options);
	handleTouch(options);
	handleHover(options);
	handleShift(options);
};

export default handleMultiButtons;