import React from 'react';
import styles from './TrafficLights.module.scss';

const TrafficLights = () => {
	return (
		<div className={ styles.lights }>
			<div className={ `${ styles.close } ${ styles.light }` }></div>
			<div className={ `${ styles.minimize } ${ styles.light }` }></div>
			<div className={ `${ styles.maximize } ${ styles.light }` }></div>
		</div>
	);
};

export default TrafficLights;