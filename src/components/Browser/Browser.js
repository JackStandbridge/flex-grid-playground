import React from 'react';
import styles from './Browser.module.scss';
import Chrome from '../Chrome';
import Page from '../Body';

const Browser = () => {
	return (
		<section className={ styles.page }>
			<Chrome/>
			<Page/>
		</section>
	);
};

export default Browser;