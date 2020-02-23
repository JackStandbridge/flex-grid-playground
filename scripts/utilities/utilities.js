export const getConstructedStyle = inputs => {
	let value = '';
	for (let i = 0; i < inputs.length; i++) {
		if (i && i % 2 === 0) {
			value += ' '
		}
		value += inputs[i].value;
	}
	return value;
}

export const targetHasAncestor = (selector, e) => {
	const path = e.path || (e.composedPath && e.composedPath());

	if (!path) {
		return false;
	}

	for (let i = 0; i < path.length; i++) {
		if (path[i].matches && path[i].matches(selector)) {
			return path[i];
		}
	}

	return false;
}

export const debounce = (fun, timing) => {
	let timeout;

	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => fun(...args), timing);
	}
}