import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import propertySchema from '../../data/propertySchema.json';
import { useAccordion } from '../../hooks';
import { setStyle } from '../../data/reducer';
import { getEntry } from '../../data/utilities';

const InputRadio = ({ section, schema, disabled }) => {

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
	const { name, values, [page]: pageValues = [] } = propertySchema[schema];
	const allValues = [...values, ...pageValues];

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
				allValues.map((value, i) => (
					<label className='label' key={ value } >
						<input
							checked={ i === index }
							disabled={ collapsed }
							value={ value }
							onChange={ handleChange }
							type='radio'
							name={ `${ section }-${ name }` }
						/>
						{ value }
					</label>
				))
			}
		</fieldset>
	);
};

export default InputRadio;