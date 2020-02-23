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
	options.addEventListener('click', () => {
		source.classList.toggle('tooltip--visible');
	});

}

export default handleChrome;