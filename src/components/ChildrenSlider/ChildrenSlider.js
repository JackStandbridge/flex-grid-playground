import React from 'react';
import InputRange from '../InputRange';
import { useSelector, useDispatch } from 'react-redux';
import { setChildren } from '../../data/reducer';

const ChildrenSlider = ({ disabled }) => {
	const dispatch = useDispatch();

	const handleChange = value => {
		dispatch(setChildren(value));
	}

	const value = useSelector(({ page, pages }) => {
		return pages[page].childStyles.length;
	});

	return (
		<InputRange
			name='Number of Children'
			handleChange={ handleChange }
			disabled={ disabled }
			min={ 1 }
			max={ 30 }
			value={ value }
			startCollapsed={ false }
		/>
	);
};

export default ChildrenSlider;