const Numeric = ({ parentName, min, value, name }) => {

	const fragment = document.createDocumentFragment();
	const input = document.createElement('input');
	const label = document.createElement('label');

	input.id = `${ parentName }-${ name }`;
	input.name = parentName;
	input.value = parseInt(value);
	input.type = 'number';
	input.classList.add('number');
	input.setAttribute('data-property', name);
	input.setAttribute('min', min);

	label.textContent = name;
	label.classList.add('number__container');
	label.append(input);
	fragment.append(label);

	return fragment;
}

export default Numeric;