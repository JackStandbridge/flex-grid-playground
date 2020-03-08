import { useState, useEffect } from 'react';

const browser = document.body.classList[0];
const timeout = {
	safari: 0,
	firefox: 100,
}[browser] ?? 200;

const useAccordion = (
	{
		fieldset,
		expander,
		collapsed,
		animateIn = false,
		animateOut = false,
		legend,
	}
) => {

	const [stateCollapsed, setCollapsed] = useState(collapsed || animateIn);
	const [disabled, setDisabled] = useState(collapsed);

	useEffect(() => {
		if (animateIn) {
			// set timeout to wait for first render before animating
			setTimeout(() => {
				setCollapsed(false);
				setDisabled(false);
			}, 0);
		}
	}, [animateIn, legend]);

	useEffect(() => {
		if (animateOut) {
			setTimeout(() => {
				setCollapsed(true);
				setDisabled(true);
			})
		}
	}, [animateOut, legend])


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
