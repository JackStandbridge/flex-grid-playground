import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ControlGroup from '../ControlGroup';
import ChildrenSlider from '../ChildrenSlider';
import Accordion from '../Accordion';
import stylesheet from './Controls.module.scss';
import { clearAll } from '../../data/reducer';

const Controls = () => {
	const currentChild = useSelector(({ pages, page }) => {
		return pages[page].currentChild;
	});

	const removingChild = useSelector(({ removingChild }) => removingChild);

	const index = useSelector(({ pages, page }) => {
		return pages[page].child.indexOf(currentChild);
	});

	const showChildControls = index !== -1;

	const screenWidth = window.innerWidth;

	const collapseChildren = screenWidth > 1200 || screenWidth < 850;

	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(clearAll());
	}

	return (
		<section className={ stylesheet.controls }>
			<h1 className={ stylesheet.title }>Controls</h1>

			<div className={ stylesheet.scrollContainer }>

				<Accordion
					legend='Number of Children'
					targetClass='fieldset full-width'
					buttonClass='expander'
					collapsed={ false }
				>
					{ disabled => (
						<ChildrenSlider disabled={ disabled } />
					) }
				</Accordion>

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
					legend='child'
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
						/>
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
				<button
					className={ stylesheet.clear }
					onClick={ handleClick }
				>
					Reset All
			</button>
			</div>
		</section>
	);
};

export default Controls;