import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import propertySchema from '../../data/propertySchema.json';
import { setStyle } from '../../data/reducer';
import { getEntry } from '../../data/utilities';
import stylesheet from './InputFlexi.module.scss';
import Help from '../Help';

const InputFlexi = ({ section, schema, disabled, ancestorDisabled }) => {

	const { units } = propertySchema[schema];

	const entry = useSelector(state => {
		return getEntry(state, section, schema);
	}, shallowEqual);

	const shiftPressed = useSelector(({ shiftPressed }) => shiftPressed);

	const values = entry?.values ?? [];

	const dispatch = useDispatch();

	const handleChange = ({ target: { value } }, index) => {
		const newValues = values.map((valObject, i) => {
			return {
				...valObject,
				value: i === index ? value : valObject.value
			}
		})
		const newEntry = {
			values: newValues,
			id: entry?.id,
			schema,
		};

		dispatch(setStyle({
			newEntry,
			section,
			schema,
		}));
	};

	const handleClick = ({ shiftKey }) => {

		let newValues = [...values];

		if (shiftKey) {
			newValues.pop();
			newValues.pop();
		} else {
			newValues.push({ value: '1', type: 'number', space: true });
			newValues.push({ value: 'fr', type: 'option' });
		}

		const newEntry = {
			id: entry?.id,
			values: newValues,
			schema
		}

		dispatch(setStyle({
			newEntry,
			section,
			schema,
		}));
	}

	const renderInput = (value, index) => {
		return (
			<input
				aria-label={ `${ schema } number ${ index + 1 }` }
				disabled={ disabled }
				key={ index }
				value={ value }
				className={ stylesheet.input }
				type='number'
				onChange={ e => handleChange(e, index) }
			/>
		)
	}

	const renderSelect = (value, index) => {
		return (
			<select
				aria-label={ `${ schema } unit ${ index + 1 }`}
				className={ stylesheet.select }
				disabled={ disabled }
				key={ index }
				value={ value }
				onChange={ e => handleChange(e, index) }
			>
				{
					units.map(option => (
						<option key={ option }>{ option }</option>
					))
				}
			</select>
		)
	}

	const renderByType = {
		number: renderInput,
		option: renderSelect,
	};

	const elementGroup = values
		.map(({ value, type }, i) => {
			return renderByType[type](value, i);
		})
		.reduce((elements, element, i, arr) => {
			// group each input and select in a div
			if (i % 2) {
				elements.push(
					<div
						key={ i }
						className={ stylesheet.inputContainer }
					>
						{ arr[i - 1] }
						{ element }
					</div>
				);
			}

			return elements;
		}, []);

	return (
		<>
			<Help
				disabled={ ancestorDisabled }
				fieldset={ true }
				schema={ propertySchema[schema] }
			/>
			<div className={ stylesheet.inputsContainer }>

				{ elementGroup }

				<div className={ stylesheet.buttonContainer }>
					<button
						aria-label={ shiftPressed ? 'remove' : 'add' }
						className={ `${ stylesheet.add } ${ shiftPressed ? stylesheet.shift : '' }` }
						onClick={ handleClick }
						disabled={ disabled }
					/>

					<div className={ stylesheet.tooltip }>
						Shift-click <br />
						to remove
					</div>
				</div>
			</div>
		</>
	);
};

export default InputFlexi;