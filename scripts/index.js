import init from './init.js';
import state from './state.js';

const page = location.hash.slice(1) || 'flex';
init(page);

const controls = document.getElementById('interface');
let containerInterface = document.getElementById('container-interface');
const tabs = document.querySelectorAll('.tab');

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

const selectTab = tab => {
	if (tab.classList.contains('tab--inactive')) {
		init(tab.dataset.playground);
		containerInterface = document.getElementById('container-interface');
	}
};

tabs.forEach(tab => {
	tab.addEventListener('click', () => selectTab(tab));

	tab.addEventListener('keydown', ({ key }) => {
		if (['Enter', ' '].includes(key)) {
			selectTab(tab)
		}
	});

});
