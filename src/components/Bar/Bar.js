import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Bar.module.scss';

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
		<div className={ styles.bar }>
			<div className={ styles.bar__buttons }>
				<i className={ styles.back }></i>
				<i className={ styles.forward }></i>
				<i className={ styles.refresh }></i>
				<i className={ styles.home }></i>
			</div>
			<input className={ styles.url } readOnly value='flex-grid-playground' />
			<button
				ref={ buttonRef }
				className={ styles.options }
				aria-label='toggle link to source code'
				onClick={ handleClick }
			>
				<div className={ styles.dot }></div>
				<div className={ styles.dot }></div>
				<div className={ styles.dot }></div>
			</button>
			{ tooltip &&
				<div className={ styles.tooltip } id='source'>
					<a href='https://github.com/JackStandbridge/flex-grid-playground'>
						See source code
					</a>
				</div>
			}
		</div>
	)
};


export default Bar;