import React, { useState, useEffect, useRef, useCallback } from 'react';
import stylesheet from './Bar.module.scss';

const Bar = () => {
	const [tooltip, setTooltip] = useState(false);
	const buttonRef = useRef(null);

	const clickOff = useCallback(({ target }) => {
		if (target !== buttonRef.current) {

			setTooltip(false);
		}
	}, [setTooltip]);

	const handleClick = () => {
		setTooltip(!tooltip);
	}

	useEffect(() => {

		if (tooltip) {
			document.addEventListener('click', clickOff);
		} else {
			document.removeEventListener('click', clickOff);
		}

	}, [tooltip, clickOff]);


	return (
		<div className={ stylesheet.bar }>
			<div className={ stylesheet.buttons }>
				<i className={ stylesheet.back }></i>
				<i className={ stylesheet.forward }></i>
			</div>
			<div
				className={ stylesheet.url }
				tabIndex='0'
			>
				css-playground
			</div>
			<button
				ref={ buttonRef }
				className={ stylesheet.options }
				aria-label='toggle link to source code'
				onClick={ handleClick }
			>
				<div className={ stylesheet.dot }></div>
				<div className={ stylesheet.dot }></div>
				<div className={ stylesheet.dot }></div>
			</button>
			{
				tooltip &&
				<div className={ stylesheet.tooltip } id='source'>
					<a href='https://github.com/JackStandbridge/flex-grid-playground'>
						See source code
					</a>
				</div>
			}
		</div>
	)
};


export default Bar;