import init from './init.js';
import { initial } from '../data.js';

init();

const controls = document.getElementById('interface');
const container = document.getElementById('container');
const containerInterface = document.getElementById('container-interface');

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
			.forEach(([prop, val]) => div.style[prop] = `${val}px`)

		fragment.append(div);
	}

	container.textContent = '';
	container.append(fragment);
}

const setChildStyles = target => {
	if (target.matches('input[type="number"]')) {

		const property = target.dataset.property;
		const value = target.value;
		childProperties[property] = value;

	}
}

controls.addEventListener('input', ({ target, path }) => {

	if (path.includes(containerInterface)) {
		setContainerStyles(target);
	} else if (target.matches('[type="range"]')) {
		addChildren(target);
	} else {
		setChildStyles(target);
	}

});