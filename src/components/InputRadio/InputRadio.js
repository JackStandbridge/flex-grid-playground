import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Help from '../Help';
import propertySchema from '../../data/propertySchema.json';
import stylesheet from './InputRadio.module.scss';
import { setStyle } from '../../data/reducer';
import { getEntry } from '../../data/utilities';
import { formatMarkDown } from '../../data/utilities';

const InputRadio = (
	{
		section,
		schema,
		disabled,
		ancestorDisabled,
		customValues = [],
		displayError,
	}
) => {

	const page = useSelector(({ page }) => page);
	const {
		name,
		values = customValues,
		[page]: pageSpecificValues = []
	} = propertySchema[schema];
	const allValues = [...values, ...pageSpecificValues];

	const entry = useSelector(state => {
		return getEntry(state, section, schema)
	}, shallowEqual);

	let index = allValues.indexOf(entry?.values[0].value);
	if (index === -1) {
		index = 0;
	}

	const dispatch = useDispatch();

	const handleChange = ({ target: { value } }) => {
		const newEntry = {
			values: [{ value }],
			id: entry?.id,
			schema,
		};

		dispatch(setStyle({
			newEntry,
			section,
			schema,
		}));
	};

	return (
		<>
			<Help
				disabled={ ancestorDisabled }
				fieldset={ true }
				schema={ schema }
			/>
			{ displayError ?
				<p
					className={ stylesheet.error }
					dangerouslySetInnerHTML={
						{
							__html: formatMarkDown(
								propertySchema[schema].noValues,
								stylesheet
							)
						}
					}
				/>
				:
				allValues.map((value, i) => (
					<label className={ stylesheet.label } key={ value } >
						<input
							checked={ i === index }
							disabled={ disabled }
							value={ value }
							onChange={ handleChange }
							type='radio'
							name={ `${ section }-${ name }` }
						/>
						{ value }
					</label>
				))
			}
		</>
	)
};

export default InputRadio;