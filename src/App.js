import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DragResize from './components/DragResize';
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

	const shiftListener = useCallback(({ key, shiftKey }) => {
		if (key === 'Shift') {
			dispatch(shiftPressed(shiftKey));
		}
	}, [dispatch]);

	useEffect(setBrowser, []);

	useEffect(() => {

		document.addEventListener('keydown', shiftListener);
		document.addEventListener('keyup', shiftListener);

		return () => {
			document.removeEventListener('keydown', shiftListener);
			document.removeEventListener('keyup', shiftListener);
		}

	}, [shiftListener]);

	useEffect(() => {
		window.location.hash = '#' + page;
		document.title = title;
		const icon = document.getElementById('icon')
		const iconPath = icon.getAttribute('href');
		icon.href = iconPath.replace(/\w+(?=.ico)/, page);
	}, [page, title]);


	const [resizable, setResizeable] = useState(window.innerWidth > 1200);

	useEffect(() => {
		window.addEventListener('resize', () => {
			setResizeable(window.innerWidth > 1200);
		});
	}, [setResizeable]);

	return (
		<main className={ stylesheet.app }>
			{ resizable
				?
				<DragResize ratio={ [1, 2, 1] }>
					<Controls />
					<Browser />
					<Output />
				</DragResize>
				:
				<>
					<Browser />
					<div className={ stylesheet.spacer } />
					<Controls />
					<div className={ stylesheet.spacer } />
					<Output />
				</>
			}
		</main>
	);
};

export default App;