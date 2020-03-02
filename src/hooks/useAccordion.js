import { useState } from 'react';

const browser = document.body.classList[0];
const timeout = {
	safari: 0,
	firefox: 100,
}[browser] ?? 200;

const useAccordion = ({ fieldset, expander, collapsed = true }) => {

	const [stateCollapsed, setCollapsed] = useState(collapsed);
	const [disabled, setDisabled] = useState(collapsed);

	const handleCollapse = () => {
		setCollapsed(!stateCollapsed);
		if (disabled) {
			setTimeout(() => {
				setDisabled(!disabled);
			}, timeout);
		} else {
			setDisabled(!disabled);
		}
	}

	const fieldsetClassName = [
		fieldset,
		stateCollapsed ? 'collapsed' : '',
		disabled ? 'no-overflow' : '',
	].join(' ');

	const expanderClassName = [
		expander,
		stateCollapsed ? '' : 'expanded'
	].join(' ');

	return [
		fieldsetClassName,
		expanderClassName,
		disabled,
		handleCollapse
	];

};

export default useAccordion;
