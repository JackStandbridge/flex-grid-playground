import init from '../init.js';

const handleTabs = () => {

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

}

export default handleTabs;