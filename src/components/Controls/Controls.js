import React from 'react';
import { useSelector } from 'react-redux';
import ControlGroup from '../ControlGroup';
import ChildrenSlider from '../ChildrenSlider';
import Accordion from '../Accordion';
import stylesheet from './Controls.module.scss';

const Controls = () => {
	const currentChild = useSelector(({ pages, page }) => {
		const { currentChild } = pages[page];
		return pages[page].child.indexOf(currentChild);
	});

	const showChildControls = currentChild !== -1;

	return (
		<section className={ stylesheet.container }>
			<h1 className={ stylesheet.title }>Controls</h1>
			<div className={ stylesheet.controls }>

				<Accordion
					legend='parent'
					targetClass='fieldset col'
					buttonClass='expander caps'
					collapsed={ false }
				>
					{ disabled => (
						<ControlGroup
							section='parent'
							disabled={ disabled }
						/>
					) }
				</Accordion>

				<Accordion
					legend='children'
					targetClass='fieldset col'
					buttonClass='expander caps'
					collapsed={ false }
				>
					{ disabled => (
						<ControlGroup
							section='children'
							disabled={ disabled }
						>
							<Accordion
								legend='Number of Children'
								targetClass='fieldset'
								buttonClass='expander'
								collapsed={ false }
								ancestorDisabled={ disabled }
							>
								{ disabled => (
									<ChildrenSlider disabled={ disabled } />
								) }
							</Accordion>
						</ControlGroup>
					) }
				</Accordion>

				{
					showChildControls &&
					<Accordion
						legend='child'
						targetClass='fieldset col'
						buttonClass='expander caps'
						collapsed={ false }
					>
						{ disabled => (
							<ControlGroup
								section='child'
								id={ currentChild }
								disabled={ disabled }
							/>
						) }
					</Accordion>
				}
			</div>
		</section>
	);
};

export default Controls;