import data from '../data.js';
import Fieldset from './components/Fieldset.js';
import store from './store.js';

const mainInterface = document.getElementById('interface');
const pages = {};

const init = page => {

	store.setPage(page);

	mainInterface.textContent = '';
	const fragment = document.createDocumentFragment();

	if (pages[page]) {
		// page already exists
		pages[page].children.forEach(el => fragment.append(el));

	} else {
		// page doesn't exist yet
		data[page].fieldsets.forEach(fieldset => {
			fragment.append(Fieldset(fieldset));
		});
		pages[page] = {};
		pages[page].children = [...fragment.children];
	}

	mainInterface.append(fragment);
}

export default init;