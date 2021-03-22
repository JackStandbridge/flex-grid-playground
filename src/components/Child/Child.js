import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import stylesheet from './Child.module.scss';
import { getConstructedStyle } from '../../data/utilities';
import { chooseChild } from '../../data/reducer';

const Child = ({ id }) => {

	const dispatch = useDispatch();

	const handleClick = e => {
		e.stopPropagation();
		dispatch(chooseChild(id));
	};

	const handleKeyDown = e => {
		if (['Enter', ' '].includes(e.key)) {
			handleClick(e);
		}
	};

	const styles = useSelector(state => {
		return {
			...getConstructedStyle(state, 'children'),
			...getConstructedStyle(state, 'child', id),
		};
	});

	const selected = useSelector(({ page, pages }) => pages[page].currentChild === id);

	const className = `${ stylesheet.child } ${ selected ? stylesheet.selected : '' }`

	return (
		<div
			tabIndex='0'
			onKeyDown={ handleKeyDown }
			onClick={ handleClick }
			className={ className }
			style={ styles }
		></div>
	);
};

export default Child;