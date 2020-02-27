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
		}

		// set property
		if (targetHasAncestor('.multi-container', e)) {
			property = e.target.parentNode.dataset.property;
		} else {
			property = e.target.dataset.property;
		}

		// set value
		if (e.target.matches('[type="radio"]')) {
			value = e.target.dataset.value;

		} else {
			const parent = e.target.parentNode;
			const inputs = [...parent.querySelectorAll('input, select')]
			value = getConstructedStyle(inputs);

			if (
				parent.matches('.number__container')
				&& Number.isNaN(parseFloat(value))
			) {
				value = '';
			}
		}

		// set section
		if (targetHasAncestor('#parent-interface', e)) {
			section = 'parentStyles';
		} else if (targetHasAncestor('#children-interface', e)) {
			section = 'childrenStyles';
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
