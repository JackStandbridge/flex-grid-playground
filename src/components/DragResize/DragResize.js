import React, { useState, useEffect } from 'react';
import stylesheet from './DragResize.module.scss';

const appRoot = document.getElementById('app-root');

const DragControl = ({ children, initial }) => {

	const [widths, setWidths] = useState(initial.map(width => {
		return width / initial.reduce((a, b) => a + b, 0) * 100;
	}));

	const [selectedDragPoint, setSelectedDragPoint] = useState(null);
	const [currentValue, setCurrentValue] = useState(null);

	useEffect(() => {
		if (selectedDragPoint !== null) {

			setWidths(widths => {

				const newWidths = [...widths];

				const dragPointPosition =
					widths.slice(0, selectedDragPoint + 1).reduce((a, b) => a + b)

				const percentageChange =
					(currentValue ?? dragPointPosition)
					- dragPointPosition;

				newWidths[selectedDragPoint] += percentageChange;
				newWidths[selectedDragPoint + 1] -= percentageChange;

				let exceededBounds = newWidths.reduce((bool, width) => {
					return width / 100 * appRoot.clientWidth < 300 || bool
				}, false);

				return exceededBounds ? widths : newWidths;

			});

		}
	}, [currentValue, selectedDragPoint]);

	const trackCursor = e => {
		const percentage =
			(e.clientX - appRoot.offsetLeft)
			/ appRoot.clientWidth * 100;

		setCurrentValue(percentage);
	};

	const startTracking = index => {
		appRoot.style.userSelect = 'none';

		setSelectedDragPoint(index);
		appRoot.addEventListener('mousemove', trackCursor);
		document.addEventListener('mouseup', endTracking);
	}

	const endTracking = () => {
		appRoot.style.userSelect = '';
		setSelectedDragPoint(null);
		setCurrentValue(null);

		appRoot.removeEventListener('mousemove', trackCursor);
		document.removeEventListener('mouseup', endTracking);
	};

	return children.reduce((acc, child, i) => {
		if (i) {
			acc.push(
				<div
					key={ -i }
					onMouseDown={ () => startTracking(i - 1) }
					className={ stylesheet.divider }
				/>
			)
		}

		acc.push(
			<div
				key={ i }
				className={ stylesheet.section }
				style={ { width: `${ widths[i] }%` } }
			>
				{ child }
			</div>
		);

		return acc;
	}, []);
};

export default DragControl;