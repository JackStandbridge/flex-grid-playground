import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './Body.module.scss';
import Child from '../Child';

const Body = () => {

	const childIds = useSelector(
		({ page, pages }) => pages[page].childStyles.allIds,
		shallowEqual
	);

	return (
		<div className={ styles.body }>
			<div id='container' className={ styles.container }>
				{
					childIds.map(id => <Child key={ id } id={ id } />)
				}
			</div>
		</div>
	);
};

export default Body;