import data from '../data.js';
import makeFieldset from './makeFieldset.js';
import state from './state.js';

const mainInterface = document.getElementById('interface');
const pages = {};

const init = page => {
	state.setPage(page);

	mainInterface.textContent = '';
	const fragment = document.createDocumentFragment();

	if (pages[page]) {
		// page already exists
		pages[page].children.forEach(el => fragment.append(el));

	} else {
		// page doesn't exist yet
		data[page].fieldsets.forEach(fieldset => {
			fragment.append(makeFieldset(fieldset));
		});
		pages[page] = {};
		pages[page].children = [...fragment.children];
	}

	mainInterface.append(fragment);
}

export default init;