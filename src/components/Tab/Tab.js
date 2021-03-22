import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import stylesheet from './Tab.module.scss';
import { changePage } from '../../data/reducer';

const Tab = ({ id }) => {

	const dispatch = useDispatch();
	const title = useSelector(({ pages }) => pages[id].title);
	const selected = useSelector(({ page }) => page === id);
	const active = selected ? 'active' : 'inactive';

	const tabClass = [
		stylesheet.tab,
		stylesheet[active]
	].join(' ');

	const titleClass = [
		stylesheet.title,
		stylesheet[`title-${ active }`],
		stylesheet[id]
	].join(' ');

	const handleClick = () => {
		dispatch(changePage(id));
	};

	return (
		<button
			className={ tabClass }
			tabIndex='0'
			onClick={ handleClick }
		>
			<span className={ titleClass }>{ title }</span>
			<span className={ stylesheet.close }></span>
		</button>
	);
};

export default Tab;