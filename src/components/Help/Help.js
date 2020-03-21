import React, { useState } from 'react';
import Modal from '../Modal';
import stylesheet from './Help.module.scss';

const Help = ({ content, fieldset, disabled }) => {

	const [display, setDisplay] = useState(false);
	const handleToggle = () => {
		setDisplay(!display);
	};

	const containerClasses = [
		stylesheet.container,
		fieldset ? stylesheet.fieldset : stylesheet.basic
	].filter(name => name).join(' ');

	return !content ? null : (
		<div className={ containerClasses }>

			<button
				disabled={ disabled }
				aria-label='help'
				className={ stylesheet.button }
				onClick={ handleToggle }
				title='help'
			>?</button>

			<Modal
				content={ content }
				handleDismiss={ handleToggle }
				display={ display }
			/>

		</div>
	);

};

export default Help;