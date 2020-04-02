import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getEntry } from '../../data/utilities';
import { setStyle } from '../../data/reducer';
import Help from '../Help';
import stylesheet from './InputFreeType.module.scss';

const InputFreeType = ({ disabled, schema, section, ancestorDisabled, placeholder }) => {
	const dispatch = useDispatch();

	const entry = useSelector(state => {
		return getEntry(state, section, schema)
	}, shallowEqual);

	const handleChange = ({ currentTarget: { value } }) => {
		const newEntry = {
			schema,
			id: entry?.id,
			values: [{ value, newLine: true }],
			hook: 'gridArea',
		};

		dispatch(setStyle({
			newEntry,
			section,
			schema,
		}));
	};

	const property = entry?.values[0].value ?? '';

	return (
		<>
			<Help
				disabled={ ancestorDisabled }
				fieldset={ true }
				schema={ schema }
			/>
			<textarea
				disabled={ disabled }
				onChange={ handleChange }
				className={ stylesheet.input }
				rows='4'
				value={ property }
				placeholder={ placeholder }
			></textarea>
		</>
	);
};

export default InputFreeType;