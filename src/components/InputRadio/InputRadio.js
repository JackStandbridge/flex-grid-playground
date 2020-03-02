import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import propertySchema from '../../data/propertySchema.json';
import { useAccordion } from '../../hooks';
import { setStyle } from '../../data/reducer';
import { getEntry } from '../../data/utilities';

const InputRadio = ({ section, schema, disabled }) => {

	const dispatch = useDispatch();
	const handleChange = ({ target: { value } }) => {
		dispatch(setStyle({ section, schema, values: [value] }));
	};

	const [
		fieldset,
		expander,
		collapsed,
		handleCollapse,
	] = useAccordion({
		fieldset: 'fieldset',
		expander: 'expander',
	});

	const page = useSelector(({ page }) => page);

	const {
		name,
		values: generalValues,
	} = propertySchema[schema];

	const pageSpecificValues = propertySchema[schema][`${ page }Values`] || [];

	const values = [
		...generalValues,
		...pageSpecificValues
	];

	const { entry } = useSelector(state => {
		return getEntry(state, { section, schema });
	}, shallowEqual);

	const selected = values.indexOf(entry?.values[0]);
	const index = selected === -1 ? 0 : selected;

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
			{
				values.map((value, i) => (
					<label className='label' key={ value } >
						<input
							checked={ i === index }
							disabled={ collapsed }
							value={ value }
							onChange={ handleChange }
							type='radio'
							name={ `${section}-${name}` }
						/>
						{ value }
					</label>
				))
			}
		</fieldset>
	);
};

export default InputRadio;