import React, { useState } from 'react';
import Modal from '../Modal';
import stylesheet from './Help.module.scss';

const Help = ({ schema, fieldset, disabled }) => {

	const [display, setDisplay] = useState(false);
	const handleToggle = () => {
		setDisplay(!display);
	};

	const containerClasses = [
		stylesheet.container,
		fieldset ? stylesheet.fieldset : stylesheet.basic
	].filter(name => name).join(' ');

	return !schema ? null : (
		<div className={ containerClasses }>

			<button
				disabled={ disabled }
				aria-label='help'
				className={ stylesheet.button }
				onClick={ handleToggle }
				title='help'
			>?</button>

			<Modal
				title={ schema.name }
				content={ schema.description }
				handleDismiss={ handleToggle }
				display={ display }
			/>

		</div>
	);

};

export default Help;