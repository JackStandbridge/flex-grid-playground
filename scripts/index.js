import init from './init.js';

init();

const controls = document.getElementById('interface');
const container = document.getElementById('container');
const containerInterface = document.getElementById('container-interface');

const childProperties = new Proxy({}, {
	set(target, prop, val) {
		target[prop] = val;

		[...container.children].forEach(child => {
			child.style[prop] = `${ val }px`
		});

		return true;
	}
});

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
