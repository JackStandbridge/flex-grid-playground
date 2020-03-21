import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import stylesheet from './InputMulti.module.scss';
import { getEntry } from '../../data/utilities';
import { setStyle } from '../../data/reducer';
import propertySchema from '../../data/propertySchema.json';
import Accordion from '../Accordion';
import Help from '../Help';

const InputMulti = ({ section, schema, disabled }) => {

	const dispatch = useDispatch();

	const entry = useSelector(state => {
		return getEntry(state, section, schema)
	}, shallowEqual);

	const { name, inputs } = propertySchema[schema];

	const handleChange = (value, changedIndex) => {

		const values = inputs.map((input, inputIndex) => {

			const newValue = {
				value:
					entry?.values[inputIndex].value
					?? input.default
					?? ''
			};

			if (input.default === '/') {
				newValue.default = '/';
				newValue.value = '/';
			}

			if (inputIndex === changedIndex) {

				newValue.value = value;

				const belowMin = input.min !== undefined && value < input.min;
				const aboveMax = input.max !== undefined && value > input.max;

				if (value && belowMin) {
					newValue.value = input.min;
				}

				if (value && aboveMax) {
					newValue.value = input.max
				}

			}

			if (input.space) {
				newValue.space = true;
			}

			return newValue;
		});

		const oneSidedGridProperty =
			values[2]?.default === '/'
			&& (
				values.slice(0, 2).map(({ value }) => value).join('') === ''
				|| values.slice(3,).map(({ value }) => value).join('') === ''
			)

		if (oneSidedGridProperty) {
			values[2].value = '';
			values[2].default = '/';
		}

		const id = entry?.id;

		const newEntry = { id, schema, values };

		dispatch(setStyle({
			newEntry,
			section,
			schema,
		}));
	}

	const renderNumber = ({ input, index, disabled, value = '', id }) => {

		const classNames = [
			stylesheet.number,
			input.max < 100 ? stylesheet.narrow : ''
		].join(' ');

		return (
			<input
				id={ id }
				key={ index }
				onChange={ e => handleChange(e.currentTarget.value, index) }
				disabled={ disabled }
				min={ input.min }
				max={ input.max }
				className={ classNames }
				type='number'
				value={ value }
			/>
		);
	};

	const renderSelect = ({ input, index, disabled, value }) => (
		<select
			key={ index }
			onChange={ e => handleChange(e.currentTarget.value, index) }
			disabled={ disabled }
			className={ stylesheet.select }
			value={ value }
		>
			{ input.values.map(value => (
				<option key={ value }>{ value }</option>
			)) }
		</select>
	);

	const handleKeyDownCheck = e => {
		if (['Enter', ' '].includes(e.key)) {
			e.preventDefault();
			e.currentTarget.click();
		}
	}

	const renderCheck = ({ input, index, disabled, value = '' }) => {
		const labelClassNames = [
			stylesheet.toggle,
			value ? stylesheet.checked : ''
		].join(' ');

		const handleChangeCheck = e => {
			const value = e.currentTarget.checked ? input.value : '';
			handleChange(value, index);
		};

		return (
			<label
				onKeyDown={ handleKeyDownCheck }
				key={ index }
				className={ labelClassNames }
				tabIndex={ disabled ? -1 : 0 }
			>
				<input
					checked={ !!value }
					onChange={ handleChangeCheck }
					type='checkbox'
					className={ stylesheet.checkbox }
				/>
				{ input.value }
			</label>
		)
	};

	const renderDisabled = ({ input, index }) => (
		<input
			key={ index }
			className={ stylesheet.disabled }
			disabled
			type='text'
			value={ input.default }
		/>
	);

	const renderContents = disabled => (
		<>
			<div className={ stylesheet.inputWrapper }>
				{ inputs.map((input, index) => {

					const value = entry?.values[index].value;
					const id = index === 0 ? `${ section }-${ schema }` : null;

					const options = {
						input,
						index,
						value,
						disabled,
						id,
					};

					switch (input.type) {
						case 'number': return renderNumber(options);
						case 'select': return renderSelect(options);
						case 'check': return renderCheck(options);
						case 'disabled': return renderDisabled(options);
						default: return null;
					}

				}) }
			</div>

			{ inputs.length < 2 &&
				<hr className={ stylesheet.endHr } />
			}
			<Help
				disabled={ disabled }
				fieldset={ inputs.length > 2 }
				content={ propertySchema[schema]?.description }
			/>
		</>
	);

	const renderWithAccordion = () => (
		<Accordion
			legend={ name }
			ancestorDisabled={ disabled }
			collapsed={ true }
			targetClass={ 'fieldset' }
			buttonClass={ 'expander' }
			animateIn={ false }
			animateOut={ false }
		>
			{ renderContents }
		</Accordion>
	);

	const renderWithoutAccordion = () => (
		<>
			<span className={ stylesheet.label }>
				<label htmlFor={ `${ section }-${ schema }` }>
					{ name }
				</label>
				<hr className={ stylesheet.midHr } />
				{ renderContents(disabled) }
			</span>
		</>
	);

	return inputs.length > 3 ? renderWithAccordion() : renderWithoutAccordion();
};

export default InputMulti;