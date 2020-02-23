import { debounce } from '../utilities/utilities.js';

const clearTooltip = debounce((tooltip) => {
	tooltip.classList.remove('tooltip--visible');
}, 1000);

const handleRange = ({ target }) => {

	const tooltipPosition = (target.offsetWidth - 15)
		/ (target.max - target.min)
		* (target.value - 1)
		+ 10;

	const tooltip = target.nextElementSibling;
	tooltip.textContent = target.value;
	tooltip.style.left = `${ tooltipPosition }px`;
	tooltip.classList.add('tooltip--visible');

	clearTooltip(tooltip);
};

export default handleRange;