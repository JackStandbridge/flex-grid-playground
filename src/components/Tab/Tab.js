import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Tab.module.scss';

const Tab = ({ id }) => {

	const title = useSelector(({ pages }) => pages[id].title);
	const selected = useSelector(({ page }) => page === id);
	const active = selected ? 'active' : 'inactive';
	const tabClass = `${ styles.tab } ${ styles[active] }`;
	const titleClass = `${ styles.title } ${ styles[`title-${ active }`] }`;

	return (
		<div className={ tabClass } data-playground='grid' tabIndex='0'>
			<span className={ titleClass }>{ title }</span>
			<span className={ styles.close }></span>
		</div>
	);
};

export default Tab;