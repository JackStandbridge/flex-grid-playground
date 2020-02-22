import Input from './Input.js';

const Fieldset = ({ name, fieldsets, inputs, className, collapsed = true }) => {
	const fieldset = document.createElement('fieldset');
	fieldset.classList.add('fieldset');

	if (name) {
		const legend = document.createElement('legend');

		const button = document.createElement('button');
		button.classList.add('expander');
		button.textContent = name;
		button.setAttribute('aria-label', `expand ${ name }`);
		legend.append(button);

		button.addEventListener('click', () => {

			if (collapsed) {
				button.setAttribute('aria-label', `collapse ${ name }`);
				setTimeout(() => {
					fieldset.classList.remove('fieldset--overflow-hidden');
				}, 400);
				fieldset.classList.remove('fieldset--collapsed');
				fieldset.classList.remove('fieldset--content-hidden');

			} else {
				button.setAttribute('aria-label', `expand ${ name }`);
				fieldset.classList.add('fieldset--collapsed');
				fieldset.classList.add('fieldset--overflow-hidden');
				setTimeout(() => {
					fieldset.classList.add('fieldset--content-hidden');
				}, 400);
			}
			collapsed = !collapsed;
			button.classList.toggle('expander--expanded');

		});

		if (collapsed) {
			fieldset.classList.add('fieldset--collapsed');
			fieldset.classList.add('fieldset--content-hidden');
			fieldset.classList.add('fieldset--overflow-hidden');
		} else {
			button.classList.add('expander--expanded');
		}
		fieldset.append(legend);
		fieldset.id = name.toLowerCase() + '-interface';
	}

	if (fieldsets) {
		fieldsets.forEach(subset => {
			fieldset.append(Fieldset(subset));
		});
	}

	if (inputs) {
		inputs.forEach((input, i) => {
			const isFirst = i === 0;

			if (!isFirst) {
				const hr = document.createElement('hr');
				fieldset.append(hr);
			}

			fieldset.append(Input(input, name, isFirst));
		});
	}

	if (className) {
		fieldset.classList.add(className);
	}

	return fieldset;
}

export default Fieldset;