import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import stylesheet from './InputNumber.module.scss';
import { getEntry } from '../../data/utilities';
import { setStyle } from '../../data/reducer';
import propertySchema from '../../data/propertySchema.json';

const InputNumber = ({ section, schema, disabled }) => {

	const dispatch = useDispatch();

	const { entry } = useSelector(state => {
		return getEntry(state, { section, schema });
	}, shallowEqual);

	const {
		name,
		units,
	} = propertySchema[schema];

	const [
		digit = '',
		unit = units?.[0]
	] = entry ? entry.values : [];

	const unitless = unit === undefined;

	const handleNumber = ({ target: { value } }) => {
		dispatch(setStyle({
			section,
			schema,
			values: unitless ? [value] : [value, unit],
		}));
	};

	const handleUnit = ({ target: { value } }) => {
		dispatch(setStyle({
			section,
			schema,
			values: [digit, value],
		}));
	};

	return (
		<label className={ stylesheet.label }>

			{ name }

			<hr className={ stylesheet.midHr } />

			<input
				type='number'
				className={ stylesheet.number }
				value={ digit }
				onChange={ handleNumber }
				disabled={ disabled }
			/>

			{ unitless ? <hr className={ stylesheet.endHr } /> :
				<select
					className={ stylesheet.select }
					value={ unit }
					onChange={ handleUnit }
					disabled={ disabled }
				>
					{
						units.map(unit => (
							<option
								key={ unit }
								value={ unit }
							>{ unit }</option>
						))
					}
				</select>
			}
		</label>
	);
};

export default InputNumber;