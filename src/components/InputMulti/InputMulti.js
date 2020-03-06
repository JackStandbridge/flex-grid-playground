import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import propertySchema from '../../data/propertySchema.json';
import { useAccordion } from '../../hooks';
import { setStyle } from '../../data/reducer';
import { getEntry } from '../../data/utilities';
import stylesheet from './InputMulti.module.scss';

const InputMulti = ({ section, schema, disabled }) => {

	const [
		fieldset,
		expander,
		collapsed,
		handleCollapse,
	] = useAccordion({
		fieldset: 'fieldset',
		expander: 'expander',
	});

	const { name, units } = propertySchema[schema];

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
			newValues.push({ value: '1', type: 'number' });
			newValues.push({ value: 'fr', type: 'option', space: true });
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
				disabled={ collapsed }
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
				className={ stylesheet.select }
				disabled={ collapsed }
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
		<fieldset className={ fieldset } >
			<legend>
				<button
					disabled={ disabled }
					className={ expander }
					onClick={ handleCollapse }
				>
					{ name }
				</button>
			</legend>

			<div className={ stylesheet.inputsContainer }>

				{ elementGroup }

				<div className={ stylesheet.buttonContainer }>
					<button
						className={ `${stylesheet.add} ${shiftPressed ? stylesheet.hover : ''}` }
						onClick={ handleClick }
						disabled={ collapsed }
					/>

					<div className={ stylesheet.tooltip }>
						Shift-click <br />
						to remove
					</div>
				</div>
			</div>

		</fieldset>
	);
};

export default InputMulti;