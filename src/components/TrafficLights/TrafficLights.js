import React from 'react';
import stylesheet from './TrafficLights.module.scss';

const TrafficLights = () => {
	return (
		<div className={ stylesheet.lights }>
			<div className={ `${ stylesheet.light } ${ stylesheet.close }` }></div>
			<div className={ `${ stylesheet.light } ${ stylesheet.minimize }` }></div>
			<div className={ `${ stylesheet.light } ${ stylesheet.maximize }` }></div>
		</div>
	);
};

export default TrafficLights;