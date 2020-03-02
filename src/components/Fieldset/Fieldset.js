import React from 'react';
import { useSelector } from 'react-redux';
import controls from '../../data/controls.json';
import propertySchema from '../../data/propertySchema.json';
import InputRadio from '../InputRadio/InputRadio';
import InputNumber from '../InputNumber';
import InputMulti from '../InputMulti';
import { useAccordion } from '../../hooks';


const Fieldset = (
	{
		children,
		section,
		collapsed,
		position = null
	}
) => {

	const [
		fieldset,
		expander,
		disabled,
		handleCollapse
	] = useAccordion({
		fieldset: 'fieldset col',
		expander: 'expander',
		collapsed,
	});

	const title = section.slice(0, 1).toUpperCase() + section.slice(1,);
	const legend = `${ title } ${ position !== null ? position + 1 : '' }`;
	const page = useSelector(({ page }) => page);
	const structure = controls[page][section];
	const inputs = structure ? structure : controls[page].children;

	return (
		<fieldset className={ fieldset }>
			<legend>
				<button
					className={ expander }
					onClick={ handleCollapse }
				>
					{ legend }
				</button>
			</legend>

			{ children?.(disabled) }

			{
				inputs.map(property => {
					const schema = propertySchema[property];

					const props = {
						key: schema.name,
						schema: property,
						section,
						disabled,
					}

					switch (schema.type) {
						case 'radio': return <InputRadio { ...props } />;
						case 'number': return <InputNumber { ...props } />;
						case 'multi': return <InputMulti { ...props } />;
						default: return null;
					}
				})
			}
		</fieldset>
	);
};

export default Fieldset;