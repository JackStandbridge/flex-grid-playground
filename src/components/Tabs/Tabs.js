import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Tab from '../Tab';
import stylesheet from './Tabs.module.scss';

const Tabs = () => {
	const pages = useSelector(
		({ pages }) => Object.keys(pages),
		shallowEqual
	);

	return (
		<nav className={ stylesheet.tabs }>
			{
				pages.map(page => (
					<Tab
						key={ page }
						id={ page }
						icon='flex'
					/>
				))
			}
		</nav>
	);
};

export default Tabs;