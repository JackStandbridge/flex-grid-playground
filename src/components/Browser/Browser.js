import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import stylesheet from './Browser.module.scss';
import Chrome from '../Chrome';
import Page from '../Body';
import { selectChild } from '../../data/reducer';

const Browser = () => {

	const dispatch = useDispatch();
	const selectedChild = useSelector(({ page, pages }) => {
		return pages[page].currentChild;
	});

	const handleClick = () => {
		if (selectedChild !== null) {
			dispatch(selectChild(null));
		}
	};

	return (
		<section
			className={ stylesheet.page }
			onClick={ handleClick }
		>
			<Chrome />
			<Page />
		</section>
	);
};

export default Browser;