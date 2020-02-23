import init from '../init.js';

const handleChrome = () => {

	const tabs = document.querySelectorAll('.tab');

	const selectTab = tab => {
		if (tab.classList.contains('tab--inactive')) {
			init(tab.dataset.playground);
		}
	};

	tabs.forEach(tab => {
		tab.addEventListener('click', () => selectTab(tab));

		tab.addEventListener('keydown', ({ key }) => {
			if (['Enter', ' '].includes(key)) {
				selectTab(tab)
			}
		});

	});

	const options = document.getElementById('options');
	const source = document.getElementById('source');

	const clickOff = () => {
		document.removeEventListener('click', clickOff);
		source.classList.remove('tooltip--visible');
	};

	options.addEventListener('click', e => {
		e.stopPropagation();
		source.classList.toggle('tooltip--visible');
		document.addEventListener('click', clickOff);
	});

	const controls = document.querySelector('.controls');
	const animations = [
		{
			name: 'escape',
			duration: 4000
		},
		{
			name: 'shuffle',
			duration: 2000
		},
		{
			name: 'roll',
			duration: 2000
		},
	];

	let counter = 0;
	controls.addEventListener('click', ({ target }) => {
		const animation = animations[counter % animations.length];
		counter++;

		[...target.parentNode.children].forEach((child, i) => {

			setTimeout(() => {
				child.classList.add(`control--${ animation.name }`);
			}, i * 50);

			setTimeout(() => {
				child.classList.remove(`control--${ animation.name }`);
			}, animation.duration + i * 50);

		});
	});

}

export default handleChrome;