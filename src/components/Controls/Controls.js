import React from 'react';
import { useSelector } from 'react-redux';
import Fieldset from '../Fieldset';
import ChildrenSlider from '../ChildrenSlider';
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
				<Fieldset
					section='parent'
					collapsed={ false }
				/>

				<Fieldset
					section='children'
					collapsed={ false }
				>
					{ disabled => (
						<ChildrenSlider disabled={ disabled } />
					) }
				</Fieldset>

				{
					showChildControls &&
					<Fieldset
						section='child'
						id={ currentChild }
						collapsed={ false }
					/>
				}
			</div>
		</section>
	);
};

export default Controls;