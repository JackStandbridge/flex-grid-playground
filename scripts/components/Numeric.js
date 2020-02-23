const Numeric = ({ parentName, min, value, name, options }) => {

	const fragment = document.createDocumentFragment();
	const input = document.createElement('input');
	const label = document.createElement('label');
	const select = document.createElement('select');
	options.forEach(unit => {
		const option = document.createElement('option');
		option.textContent = unit;
		select.append(option);
	});

	input.id = `${ parentName }-${ name }`;
	input.name = parentName;
	input.value = parseInt(value);
	input.type = 'number';
	input.classList.add('number');
	input.setAttribute('data-property', name);
	input.setAttribute('min', min);

	select.classList.add('select');

	label.textContent = name;
	label.classList.add('number__container');
	label.append(input);
	label.append(select);
	fragment.append(label);

	return fragment;
}

export default Numeric;