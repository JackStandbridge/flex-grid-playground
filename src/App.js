import React from 'react';
import Browser from './components/Browser';
import Controls from './components/Controls';
import Output from './components/Output';
import styles from './App.module.scss';

const App = () => {
	return (
		<main className={ styles.app }>
			<Browser/>
			<Controls/>
			<Output/>
		</main>
	);
};

export default App;