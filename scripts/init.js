import data from '../data.js';
import makeFieldset from './makeFieldset.js';
import { initial } from '../data.js';
import { childProperties } from './childState.js';

const titles = {
	flex: 'CSS Flexbox Playground',
	grid: 'CSS Grid Playground',
};

const tabs = [...document.querySelectorAll('.tab')];
const setTab = page => {
	location.hash = '#' + page;
	document.title = titles[page];
	const chosenTab = tabs.find(tab => tab.dataset.playground === page);
	const oldTab = tabs.find(tab => tab.classList.contains('tab--active'));

	chosenTab.classList.remove('tab--inactive');
	chosenTab.classList.add('tab--active');

	if (oldTab) {
		oldTab.classList.remove('tab--active');
		oldTab.classList.add('tab--inactive');
	}
}

const mainInterface = document.getElementById('interface');
const container = document.getElementById('container');
const pages = {};

const init = page => {
	// add grid or flex to container
	container.style.display = page;
	setTab(page);

	// update DOM with initial values.
	Object.assign(childProperties, initial[page]);

	mainInterface.textContent = '';
	const fragment = document.createDocumentFragment();

	if (pages[page]) {
		pages[page].forEach(el => fragment.append(el));
	} else {
		data[page].fieldsets.forEach(fieldset => {
			fragment.append(makeFieldset(fieldset));
		});
		pages[page] = [...fragment.children];
	}

	mainInterface.append(fragment);
}

export default init;