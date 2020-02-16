const multiStyles = {};
const container = document.getElementById('container');

class DomSync {
	syncDom(target) {

		const cssValue = target.join(' ').replace(/\s\D/g, s => s.slice(1));
		container.style[this.name] = cssValue;

	}

	set(target, prop, val) {

		if (!this.name) {
			this.name = val.name;
		}
		if (prop === 'length') {
			target[prop] = val;
		} else {
			target[prop] = val.value;
			this.syncDom(target);
		}

		return true;
	}

	deleteProperty(target, prop) {

		delete target[prop];
		target.length = prop;
		this.syncDom(target)
		return true;

	}
}

export const setContainerStyles = ({ dataset, type, value }) => {
	const { property, index } = dataset;

	switch (type) {
		case 'radio':
			container.style[property] = dataset.value;
			break;
		case 'number':
		case 'select-one':
			if (!multiStyles[property]) {
				multiStyles[property] = new Proxy([], new DomSync());
			}
			multiStyles[property][index] = { name: property, value };
			console.log(multiStyles);
			break;
		default:
			console.log('input type', type);
			console.log('input value', value);
	}
}

export const removeContainerStyle = property => {
	multiStyles[property].pop();
}