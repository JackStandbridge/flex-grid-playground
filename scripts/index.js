import init from './init.js';
import handleControls from './events/handleControls.js';
import handleChrome from './events/handleChrome.js';
import handleClipboard from './events/handleClipboard.js';

const page = location.hash.slice(1) || 'flex';

const userAgent = navigator.userAgent.toLowerCase();
if (userAgent.indexOf('safari') !== -1) {
	if (userAgent.indexOf('chrome') === -1) {
		document.body.classList.add('safari');
	} else {
		document.body.classList.add('chrome');
	}
} else {
	document.body.classList.add('firefox');
}

init(page);
handleControls();
handleChrome();
handleClipboard();
