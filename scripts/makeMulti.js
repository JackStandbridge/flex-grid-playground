const makeContents = (options, parentName) => {
	const fragment = document.createDocumentFragment();
	const input = document.createElement('input');
	const select = document.createElement('select');

	options.forEach(text => {

		const option = document.createElement('option');
		option.textContent = text;
		select.append(option);

	});

	input.type = 'number';
	input.min = 0;
	input.classList.add('number', 'number--multi');

	select.classList.add('select', 'select--multi');

	fragment.append(input);
	fragment.append(select);

	return fragment;

}

const makeMulti = ({ options, parentName }) => {
	console.log(parentName);

	const container = document.createElement('div');

	const remove = document.createElement('button');
	const add = document.createElement('button');

	add.classList.add('add');
	remove.classList.add('remove');

	add.addEventListener('click', () => {
		add.before(makeContents(options, parentName));
	});

	container.append(add);
	container.append(remove);
	container.classList.add('multi-container')

	add.before(makeContents(options, parentName));

	return container;
}

export default makeMulti;