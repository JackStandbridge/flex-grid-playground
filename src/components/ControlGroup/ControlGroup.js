import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import controls from '../../data/controls.json';
import propertySchema from '../../data/propertySchema.json';
import InputRadio from '../InputRadio/InputRadio';
import InputMulti from '../InputMulti';
import InputFlexi from '../InputFlexi';
import Accordion from '../Accordion';
import { clearStyles } from '../../data/reducer';
import stylesheet from './ControlGroup.module.scss';

const ControlGroup = (
	{
		children,
		section,
		disabled,
	}
) => {

	const dispatch = useDispatch();

	const page = useSelector(({ page }) => page);
	const structure = controls[page][section];
	const inputs = structure ? structure : controls[page].children;

	const handleClick = () => {
		dispatch(clearStyles({ section }));
	}

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

						case 'multi': return (
							<InputMulti
								key={ schema.name }
								{ ...props }
							/>
						);

						case 'flexi': return (
							<Accordion
								key={ schema.name }
								legend={ schema.name }
								targetClass='fieldset'
								buttonClass='expander'
								ancestorDisabled={ disabled }
								collapsed={ true }
							>
								{ disabled => (
									<InputFlexi
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

			<button
				className={ stylesheet.clear }
				onClick={ handleClick }
				disabled={ disabled }
			>
				Reset
			</button>
		</>
	);
};

export default ControlGroup;