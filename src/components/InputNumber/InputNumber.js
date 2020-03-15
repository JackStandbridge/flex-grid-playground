import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import stylesheet from './InputNumber.module.scss';
import { getEntry } from '../../data/utilities';
import { setStyle } from '../../data/reducer';
import propertySchema from '../../data/propertySchema.json';

const InputNumber = ({ section, schema, disabled }) => {

	const dispatch = useDispatch();

	const entry = useSelector(state => {
		return getEntry(state, section, schema)
	}, shallowEqual);

	const { name, units, min } = propertySchema[schema];

	const unitless = units === undefined;

	const [
		digit = { value: '' },
		unit = { value: units?.[0] }
	] = entry ? entry.values : [];


	const handleChange = values => {
		const newEntry = {
			id: entry?.id,
			values,
			schema,
		};

		dispatch(setStyle({
			newEntry,
			section,
			schema,
		}));
	}

	const handleNumber = ({ target: { value } }) => {

		if (
			value &&
			(
				(min !== null && value < min)
				|| Number.isNaN(parseFloat(value))
			)
		) {
			value = min;
		}

		const values = unitless ? [{ value }] : [{ value }, { value: unit.value }];
		handleChange(values);
	};

	const handleUnit = ({ target: { value } }) => {
		const values = [{ value: digit.value }, { value }]
		handleChange(values);
	};

	const handleSelectFocus = e => {
		e.preventDefault();
	}

	return (
		<label className={ stylesheet.label }>

			{ name }

			<hr className={ stylesheet.midHr } />

			<input
				type='number'
				className={ `${ stylesheet.number } ${ unitless ? stylesheet.unitless : '' }` }
				value={ digit.value }
				min={ min }
				onChange={ handleNumber }
				disabled={ disabled }
			/>

			{ unitless ? <hr className={ stylesheet.endHr } /> :
				<select
					className={ stylesheet.select }
					value={ unit.value }
					onChange={ handleUnit }
					onClick={ handleSelectFocus }
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