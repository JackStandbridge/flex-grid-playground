import state from '../state.js';

const handleControls = () => {

	const controls = document.getElementById('interface');
	const containerInterface = document.getElementById('container-interface');

	controls.addEventListener('input', e => {

		const { target } = e;
		const path = e.path || (e.composedPath && e.composedPath());

		if (target.parentNode.classList.contains('multi-container')) {
			const inputs = [...target.parentNode.querySelectorAll('input, select')];
			const parentName = target.parentNode.dataset.property;
			state.setConstructedStyle(inputs, parentName);
		} else if (path.includes(containerInterface)) {
			state.setParentStyles(target);
		} else if (target.matches('#number-range')) {
			state.setChildren(target);
		} else {
			state.setChildStyles(target);
		}

	});

	controls.addEventListener('submit', e => e.preventDefault());

};

export default handleControls;
