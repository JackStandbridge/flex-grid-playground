import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import stylesheet from './Body.module.scss';
import Child from '../Child';
import { getConstructedStyle } from '../../data/utilities';

const Body = () => {

	const childIds = useSelector(({ page, pages}) => {
		return pages[page].child;
	}, shallowEqual);

	const styles = useSelector(state => {
		return getConstructedStyle(state, 'parent');
	});

	return (
		<div className={ stylesheet.body }>
			<div
				id='container'
				className={ stylesheet.container }
				style={ styles }
			>
				{
					childIds.map(id => <Child key={ id } id={ id } />)
				}
			</div>
		</div>
	);
};

export default Body;