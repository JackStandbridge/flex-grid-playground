import store from '../store.js';

const body = document.querySelector('.body');

const handleChildren = () => {
	body.addEventListener('click', ({ target }) => {

		const { currentPage, pages } = store.state;
		const controls = document.getElementById('child-interface');

		if (target.matches('.child')) {

			controls.classList.remove('hidden');
			const index = [...target.parentNode.children].indexOf(target);

			const button = controls.querySelector('button');
			button.textContent = `Child ${ index + 1 }`;

			pages[currentPage].currentChild = index;

		} else {
			controls.classList.add('hidden');
			pages[currentPage].currentChild = null;
		}

	});
};

export default handleChildren;