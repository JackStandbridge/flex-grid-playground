import init from './init.js';
import { setContainerStyles } from './containerState.js';
import { addChildren, setChildStyles } from './childState.js';

const page = location.hash.slice(1) || 'flex';
init(page);

const controls = document.getElementById('interface');
let containerInterface = document.getElementById('container-interface');
const tabs = document.querySelectorAll('.tab');

controls.addEventListener('input', e => {

	const { target } = e;
	const path = e.path || (e.composedPath && e.composedPath());

	if (path.includes(containerInterface)) {
		setContainerStyles(target);
	} else if (target.matches('[type="range"]')) {
		addChildren(target);
	} else {
		setChildStyles(target);
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
	tab.addEventListener('keydown', ({ key }) => ['Enter', ' '].includes(key) && selectTab(tab));
});
