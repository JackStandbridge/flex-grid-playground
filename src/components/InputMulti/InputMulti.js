import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import propertySchema from '../../data/propertySchema.json';
import { useAccordion } from '../../hooks';
import { setStyle } from '../../data/reducer';
import { getEntry } from '../../data/utilities';

const InputMulti = ({ section, schema, disabled }) => {

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

	const {
		name,
	} = propertySchema[schema];

	const { entry } = useSelector(state => {
		return getEntry(state, { section, schema });
	}, shallowEqual);

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
		</fieldset>
	);
};

export default InputMulti;