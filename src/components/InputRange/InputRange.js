import React, { useRef, useState } from 'react';
import { useAccordion } from '../../hooks';
import stylesheet from './InputRange.module.scss';

const InputRange = (
	{
		name,
		disabled,
		handleChange,
		min,
		max,
		value,
		startCollapsed,
	}
) => {

	const [
		fieldset,
		expander,
		collapsed,
		handleCollapse,
	] = useAccordion({
		fieldset: 'fieldset',
		expander: 'expander',
		collapsed: startCollapsed,
	});

	const [left, setTooltipPosition] = useState(null);
	const [visible, setVisible] = useState(false);
	const inputRef = useRef(null);

	let timeout = useRef(null);

	const onChange = ({ target }) => {
		const position = (target.offsetWidth - 15)
			/ (target.max - target.min)
			* (target.value - 1)
			+ 10;

		setTooltipPosition(position);
		setVisible(true);

		clearTimeout(timeout.current);
		handleChange(target.value);

		timeout.current = setTimeout(() => {
			setVisible(false);
		}, 1000);
	};

	const tooltipStyle = {
		left,
		display: visible && !collapsed ? '' : 'none'
	};

	return (
		<fieldset className={ fieldset } >
			<legend>
				<button
					className={ expander }
					onClick={ handleCollapse }
					disabled={ disabled }
				>
					{ name }
				</button>
			</legend>

			<div className={ stylesheet.container }>
				<input
					ref={ inputRef }
					type='range'
					min={ min }
					max={ max }
					value={ value }
					className={ stylesheet.range }
					disabled={ collapsed }
					onChange={ onChange }
				/>

				<div
					className='tooltip'
					style={ tooltipStyle }
				>
					{ value }
				</div>
			</div>
		</fieldset>
	);
};

export default InputRange;