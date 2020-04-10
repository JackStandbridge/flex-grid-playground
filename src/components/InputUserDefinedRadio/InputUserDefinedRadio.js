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

				.map(({ values }) => (
					values.map(({ value }) => (
						value.split(/['\s]+/)
					))
				))

				.flat(Infinity)

				.filter(value => value !== '.')

				.map(value => value === '' ? 'unset' : value)

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