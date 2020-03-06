import React from 'react';
import { useSelector } from 'react-redux';
import controls from '../../data/controls.json';
import propertySchema from '../../data/propertySchema.json';
import InputRadio from '../InputRadio/InputRadio';
import InputNumber from '../InputNumber';
import InputMulti from '../InputMulti';
import Accordion from '../Accordion';

const ControlGroup = (
	{
		children,
		section,
		disabled,
	}
) => {

	const page = useSelector(({ page }) => page);
	const structure = controls[page][section];
	const inputs = structure ? structure : controls[page].children;

	return (
		<>
			{ children }

			{
				inputs.map(property => {
					const schema = propertySchema[property];

					const props = {
						schema: property,
						section,
						disabled,
					}

					switch (schema.type) {
						case 'radio': return (
							<Accordion
								key={ schema.name }
								legend={ schema.name }
								targetClass='fieldset'
								buttonClass='expander'
								ancestorDisabled={ disabled }
								collapsed={ true }
							>
								{ disabled => (
									<InputRadio
										{ ...props }
										disabled={ disabled }
									/>
								) }
							</Accordion>
						);

						case 'number': return (
							<InputNumber key={ schema.name } { ...props } />
						);

						case 'multi': return (
							<Accordion
								key={ schema.name }
								legend={ schema.name }
								targetClass='fieldset'
								buttonClass='expander'
								ancestorDisabled={ disabled }
								collapsed={ true }
							>
								{ disabled => (
									<InputMulti
										{ ...props }
										disabled={ disabled }
									/>
								) }
							</Accordion>
						);

						default: return null;
					}
				})
			}
		</>
	);
};

export default ControlGroup;