import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Browser from './components/Browser';
import Controls from './components/Controls';
import Output from './components/Output';
import stylesheet from './App.module.scss';
import { setBrowser } from './data/utilities';
import './styles/index.scss';
import { shiftPressed } from './data/reducer';

const App = () => {

	const dispatch = useDispatch();

	const page = useSelector(({ page }) => page);
	const title = useSelector(({ page, pages }) => pages[page].title);

	const shiftListener = ({ key, shiftKey }) => {
		if (key === 'Shift') {
			dispatch(shiftPressed(shiftKey));
		}
	}

	useEffect(() => {
		setBrowser();

		document.addEventListener('keydown', shiftListener);
		document.addEventListener('keyup', shiftListener);

		return () => {
			document.removeEventListener('keydown', shiftListener);
			document.removeEventListener('keyup', shiftListener);
		}

	}, []);

	useEffect(() => {
		window.location.hash = '#' + page;
		document.title = title;
		const icon = document.getElementById('icon')
		const iconPath = icon.getAttribute('href');
		icon.href = iconPath.replace(/\w+(?=.ico)/, page);
	}, [page, title]);

	return (
		<main className={ stylesheet.app }>
			<Browser />
			<Controls />
			<Output />
		</main>
	);
};

export default App;