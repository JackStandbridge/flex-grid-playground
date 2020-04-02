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
		fieldset ? stylesheet.fieldset : stylesheet.basic,
		'visible'
	].filter(name => name).join(' ');

	return !schema ? null : (
		<div className={ containerClasses }>

			<button
				disabled={ disabled }
				aria-label='More Information'
				className={ stylesheet.button }
				onClick={ handleToggle }
				title='More Information'
			>?</button>

			<Modal
				schema={ schema }
				handleDismiss={ handleToggle }
				display={ display }
			/>

		</div>
	);

};

export default Help;