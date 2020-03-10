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
		animateIn,
		animateOut,
	}
) => {

	let [
		fieldset,
		expander,
		disabled,
		handleCollapse
	] = useAccordion({
		fieldset: targetClass,
		expander: buttonClass,
		collapsed,
		animateIn,
		animateOut,
	});

	return (
		<fieldset className={ fieldset }>
			<legend className='legend' title={ legend }>
				<button
					disabled={ ancestorDisabled }
					className={ expander }
					onClick={ handleCollapse }
				>
					<div className='buttonText'>
						{ legend }
					</div>
				</button>
			</legend>
			{ children(disabled || ancestorDisabled) }
		</fieldset>
	);
};

export default Accordion;