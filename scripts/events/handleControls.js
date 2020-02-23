import store from '../store.js';
import handleRange from './handleRange.js';
import handleFieldsets from './handleFieldsets.js';
import {
	getConstructedStyle,
	targetHasAncestor
} from '../utilities/utilities.js';

const handleControls = () => {

	const controls = document.getElementById('interface');

	controls.addEventListener('input', e => {

		if (e.target.matches('[type="range"]')) {
			handleRange(e);
		}

		let property, value, section;

		if (e.target.id === 'number-of-children') {
			store.setChildren(e.target);
			return;
		} else if (targetHasAncestor('.multi-container', e)) {
			property = e.target.parentNode.dataset.property;
		} else {
			property = e.target.dataset.property;
		}

		if (targetHasAncestor('.multi-container', e)) {
			const inputs = [...e.target.parentNode.querySelectorAll('input, select')]
			value = getConstructedStyle(inputs);
		} else if (e.target.matches('[type="radio"]')) {
			value = e.target.dataset.value;
		} else {
			value = e.target.value;
		}

		if (targetHasAncestor('#parent-interface', e)) {
			section = 'parentStyles';
		} else {
			section = 'childStyles';
		}

		store.setStyle(property, value, section);

	});

	controls.addEventListener('submit', e => e.preventDefault());

	controls.addEventListener('click', e => {
		if (e.target.matches('.expander')) {
			handleFieldsets(e);
		}
	});
};

export default handleControls;
