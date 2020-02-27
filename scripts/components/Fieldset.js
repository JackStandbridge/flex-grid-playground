import Input from './Input.js';

const Fieldset = ({
	name,
	fieldsets,
	inputs,
	classNames,
	collapsed = true,
}) => {
	const fieldset = document.createElement('fieldset');
	fieldset.classList.add('fieldset');

	if (name) {
		const legend = document.createElement('legend');

		const button = document.createElement('button');
		button.classList.add('expander');
		button.textContent = name;
		button.setAttribute('aria-label', `expand ${ name }`);
		legend.append(button);

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
			fieldset.append(Input(input, name, isFirst));
		});
	}

	if (classNames) {
		fieldset.classList.add(...classNames);
	}

	return fieldset;
}

export default Fieldset;