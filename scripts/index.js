import init from './init.js';
import { initial } from '../data.js';

const page = location.hash.slice(1) || 'flex';
init(page);

const controls = document.getElementById('interface');
const container = document.getElementById('container');
let containerInterface = document.getElementById('container-interface');
const tabs = document.querySelectorAll('.tab');

const childProperties = new Proxy({}, {
	set(target, prop, val) {
		target[prop] = val;

		// Proxy ensures DOM stays up to date
		// with current childProperties state
		[...container.children].forEach(child => {
			child.style[prop] = val === '' ? '' : `${ val }px`;
		});

		return true;
	}
});

// update DOM with initial values.
Object.assign(childProperties, initial);

const setContainerStyles = ({ dataset }) => {
	const { property, value } = dataset;
	container.style[property] = value;
}

const addChildren = ({ value }) => {
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < value; i++) {

		const div = document.createElement('div');
		div.classList.add('child');

		Object.entries(childProperties)
			.forEach(([prop, val]) => div.style[prop] = `${ val }px`)

		fragment.append(div);
	}

	container.textContent = '';
	container.append(fragment);
}

const setChildStyles = target => {
	if (target.matches('input[type="number"]')) {

		const { property } = target.dataset;
		const value = target.value;
		childProperties[property] = value;

	}
}

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
