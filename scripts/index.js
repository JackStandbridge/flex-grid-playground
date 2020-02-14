const controls = document.getElementById('interface');
const container = document.getElementById('container');

controls.addEventListener('input', e => {
	if (e.target.getAttribute('type') === 'radio') {
		const { property, value } = e.target.dataset;
		container.style[property] = value;
	} else {
		const fragment = document.createDocumentFragment();
		for (let i = 0; i < e.target.value; i++) {
			const div = document.createElement('div');
			div.classList.add('child');
			fragment.append(div);
		}
		container.textContent = '';
		container.append(fragment);
	}
});