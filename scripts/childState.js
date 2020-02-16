const container = document.getElementById('container');

// Proxies ensures DOM stays up to date
// with current childProperties state
export const childProperties = new Proxy({}, {
	set(target, prop, val) {
		target[prop] = val;
		[...container.children].forEach(child => {
			child.style[prop] = val === '' ? '' : `${ val }px`;
		});

		return true;
	}
});

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