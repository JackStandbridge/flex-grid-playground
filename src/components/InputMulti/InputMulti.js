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

	const { values = [] } = entry;

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
	}

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


			<div className={ stylesheet.inputContainer }>
				{ values.map(({ value, type }, i) => {
					return renderByType[type](value, i);
				}) }

				<div className={ stylesheet.buttonContainer }>
					<button className={ stylesheet.add } />
					<div className={ stylesheet.tooltip }>Shift-click <br /> to remove</div>
				</div>
			</div>

		</fieldset>
	);
};

export default InputMulti;