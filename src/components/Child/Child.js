import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './Child.module.scss';

const Child = ({ id }) => {
	const individualStyle = useSelector(
		({ page, pages }) => pages[page].childStyles.byId[id],
		shallowEqual
	);

	const allStyles = useSelector(
		({ page, pages }) => pages[page].childrenStyles,
		shallowEqual
	);

	const combinedStyles = { ...allStyles, ...individualStyle };

	return (
		<div
			className={ styles.child }
			style={ combinedStyles }
		></div>
	);
};

export default Child;