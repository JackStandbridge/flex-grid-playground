import { targetHasAncestor } from '../utilities/utilities.js';

const handleFieldsets = e => {
	const browser = document.body.classList[0];

	const button = e.target;
	const fieldset = targetHasAncestor('fieldset', e);
	const collapsed = !button.classList.contains('expander--expanded');

	if (collapsed) {
		// expanding
		button.setAttribute('aria-label', `collapse ${ name }`);
		setTimeout(() => {
			fieldset.classList.remove('fieldset--overflow-hidden');
		}, 400);
		fieldset.classList.remove('fieldset--collapsed');
		fieldset.classList.remove('fieldset--content-hidden');

	} else {
		// collapsing
		button.setAttribute('aria-label', `expand ${ name }`);
		fieldset.classList.add('fieldset--collapsed');
		fieldset.classList.add('fieldset--overflow-hidden');

		switch (browser) {
			case 'safari':
				fieldset.classList.add('fieldset--content-hidden');
				break;

			case 'firefox':
				setTimeout(() => {
					fieldset.classList.add('fieldset--content-hidden');
				}, 200);
				break;

			default:
				setTimeout(() => {
					fieldset.classList.add('fieldset--content-hidden');
				}, 400);
		}
	}


	button.classList.toggle('expander--expanded');

}

export default handleFieldsets;