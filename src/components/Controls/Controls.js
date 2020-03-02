import React from 'react';
import { useSelector } from 'react-redux';
import Fieldset from '../Fieldset';
import ChildrenSlider from '../ChildrenSlider';
import stylesheet from './Controls.module.scss';

const Controls = () => {

	const position = useSelector(({ pages, page }) => {
		const { currentChild } = pages[page];
		return pages[page].childStyles.indexOf(currentChild);
	});

	return (
		<section className={ stylesheet.container }>
			<Fieldset section='parent' collapsed={ false } />

			<Fieldset section='children' collapsed={ false } >
				{ disabled => (
					<ChildrenSlider disabled={ disabled } />
				) }
			</Fieldset>

			{
				position !== -1 &&
				<Fieldset section='child' position={ position } collapsed={ false } />
			}

		</section>
	);
};

export default Controls;