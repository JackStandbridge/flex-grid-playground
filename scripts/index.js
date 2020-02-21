import init from './init.js';
import handleControls from './events/handleControls.js';
import handleTabs from './events/handleTabs.js';
import handleClipboard from './events/handleClipboard.js';

const page = location.hash.slice(1) || 'flex';

init(page);
handleControls();
handleTabs();
handleClipboard();
