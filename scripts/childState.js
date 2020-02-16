import { initial } from '../data.js';

const container = document.getElementById('container');
const page = location.hash.slice(1) || 'flex';

// Proxies ensures DOM stays up to date
// with current childProperties state
const childProperties = new Proxy({}, {
	set(target, prop, val) {
		target[prop] = val;
		[...container.children].forEach(child => {
			child.style[prop] = val === '' ? '' : `${ val }px`;
		});

		return true;
	}
});

// update DOM with initial values.
Object.assign(childProperties, initial[page]);

export const addChildren = ({ value }) => {
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

export const setChildStyles = target => {
	if (target.matches('input[type="number"]')) {

		const { property } = target.dataset;
		const value = target.value;
		childProperties[property] = value;

	}
}