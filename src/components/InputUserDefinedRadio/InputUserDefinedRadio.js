import React from 'react';
import { useSelector } from 'react-redux';
import InputRadio from '../InputRadio';

const InputUserDefinedRadio = props => {

	const customValues = [...new Set(

		useSelector(({ styleEntries }) => {
			return Object.values(styleEntries)

				.filter(entry => {
					return entry.hook === props.schema
				})

				.map(({ values }) => console.log(values) || (
					values.map(({ value }) => (
						value.split(/['\s]+/)
					))
				))

				.flat(Infinity)
		})

	)];

	return (
		<InputRadio
			{ ...props }
			customValues={ customValues }
			displayError={ !customValues.length }
		/>
	)
};

export default InputUserDefinedRadio;