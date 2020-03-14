import React, { useState } from 'react';
import stylesheet from './TrafficLights.module.scss';

const TrafficLights = () => {
	const buttons = ['close', 'minimize', 'maximize'];
	const animations = ['escape', 'roll', 'shuffle'];
	const [animation, setAnimation] = useState('');
	const [index, setIndex] = useState(0);

	const animate = () => {
		setAnimation(animations[index]);
		setIndex((index + 1) % buttons.length);
	};

	return (
		<div className={ stylesheet.lights }>
			{
				buttons.map(button => {

					const classNames = [
						stylesheet.light,
						stylesheet[button],
						stylesheet[animation]
					].join(' ');

					return (
						<div
							key={ button }
							className={ classNames }
							onClick={ animate }
						/>
					)

				})
			}
		</div>
	);
};

export default TrafficLights;