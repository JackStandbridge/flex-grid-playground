import React, { useRef, useState } from 'react';
import stylesheet from './InputRange.module.scss';

const InputRange = (
	{
		disabled,
		handleChange,
		min,
		max,
		value,
		arialabel,
	}
) => {

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
		display: visible && !disabled ? '' : 'none'
	};

	return (
		<>
			<div className={ stylesheet.container }>
				<input
					ref={ inputRef }
					type='range'
					min={ min }
					max={ max }
					value={ value }
					className={ stylesheet.range }
					disabled={ disabled }
					onChange={ onChange }
					arialabel={ arialabel }
				/>

				<div
					className={`${ stylesheet.tooltip } tooltip`}
					style={ tooltipStyle }
				>
					{ value }
				</div>
			</div>
		</>
	);
};

export default InputRange;