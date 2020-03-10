import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ControlGroup from '../ControlGroup';
import ChildrenSlider from '../ChildrenSlider';
import Accordion from '../Accordion';
import stylesheet from './Controls.module.scss';

const Controls = () => {
	const currentChild = useSelector(({ pages, page }) => {
		return pages[page].currentChild;
	});

	const removingChild = useSelector(({ removingChild }) => removingChild);

	const index = useSelector(({ pages, page }) => {
		return pages[page].child.indexOf(currentChild);
	});

	const [collapsed, setCollapsed] = useState(false);
	const [hidden, setHidden] = useState(false);
	const handleCollapse = () => {
		if (collapsed) {
			setCollapsed(false);

			setTimeout(() => {
				setHidden(false);
			}, 200);
		} else {
			setHidden(true);
			setCollapsed(true);
		}
	};

	const showChildControls = index !== -1;

	const screenWidth = window.innerWidth;

	const collapseChildren = screenWidth > 1024 || screenWidth < 850;

	const sectionClassNames = [
		stylesheet.controls,
		collapsed ? stylesheet.collapsed : '',
		hidden ? stylesheet.hidden : '',
	].join(' ');

	return (
		<section className={ sectionClassNames }>
			<h1 className={ stylesheet.title }>
				<button
					className={ stylesheet.collapse }
					onClick={ handleCollapse }
				>Controls</button>
			</h1>

			<div className={ stylesheet.scrollContainer }>

				<Accordion
					legend='parent'
					targetClass='fieldset section'
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
					targetClass='fieldset section'
					buttonClass='expander caps'
					collapsed={ false }
					animateIn={ collapseChildren && currentChild === null }
					animateOut={ collapseChildren && currentChild !== null }
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
						legend={ `child ${ index + 1 }` }
						targetClass='fieldset section'
						buttonClass='expander caps'
						collapsed={ false }
						animateIn={ removingChild !== currentChild }
						animateOut={ removingChild === currentChild }
					>
						{ disabled => (
							<ControlGroup
								section='child'
								id={ index }
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