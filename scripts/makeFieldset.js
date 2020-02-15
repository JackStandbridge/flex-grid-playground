import makeInput from './makeInput.js';

const makeFieldset = data => {
	const fieldset = document.createElement('fieldset');

	if (data.name) {
		const legend = document.createElement('legend');
		legend.textContent = data.name;
		fieldset.append(legend);
		fieldset.id = data.name.toLowerCase() + '-interface';
	}

	if (data.fieldsets) {
		data.fieldsets.forEach(subset => {
			fieldset.append(makeFieldset(subset));
		});
	}

	if (data.inputs) {
		data.inputs.forEach((input, i) => {
			const isFirst = i === 0;

			if (!isFirst) {
				const hr = document.createElement('hr');
				fieldset.append(hr);
			}

			fieldset.append(makeInput(input, data.name, isFirst));
		});
	}

	if (data.className) {
		fieldset.classList.add(data.className);
	}

	return fieldset;
}

export default makeFieldset;