import React from 'react';
import TrafficLights from '../TrafficLights';
import Tabs from '../Tabs';
import Bar from '../Bar';
import styles from './Chrome.module.scss';

const Chrome = () => {
	return (
		<div className={ styles.chrome }>
			<TrafficLights />
			<Tabs />
			<Bar />
		</div>

	);
};

export default Chrome;