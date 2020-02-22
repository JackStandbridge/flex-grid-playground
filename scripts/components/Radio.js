const Radio = ({ parentName, name, parentset, isFirst }) => {

	const input = document.createElement('input');
	const label = document.createElement('label');

	input.checked = isFirst;
	input.id = `${ parentName }-${ name }`;
	input.name = parentName;
	input.type = 'radio';
	input.setAttribute('data-property', parentset);
	input.setAttribute('data-value', name);

	label.textContent = name;
	label.prepend(input);

	return label;
}

export default Radio;