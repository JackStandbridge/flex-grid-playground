import React from 'react';
import { useAccordion } from '../../hooks';

const Accordion = (
	{
		children,
		legend,
		ancestorDisabled,
		collapsed,
		targetClass,
		buttonClass,
	}
) => {

	const [
		fieldset,
		expander,
		disabled,
		handleCollapse
	] = useAccordion({
		fieldset: targetClass,
		expander: buttonClass,
		collapsed,
	});

	return (
		<fieldset className={ fieldset }>
			<legend>
				<button
					disabled={ ancestorDisabled }
					className={ expander }
					onClick={ handleCollapse }
				>
					{ legend }
				</button>
			</legend>
			{ children(disabled || ancestorDisabled) }
		</fieldset>
	);
};

export default Accordion;