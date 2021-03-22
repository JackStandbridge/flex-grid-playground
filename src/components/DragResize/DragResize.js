import React, { useState, useEffect } from 'react';
import stylesheet from './DragResize.module.scss';

const appRoot = document.getElementById('app-root');

const DragControl = ({ children, ratio }) => {

	const initialWidths = ratio.map(width => {
		return width / ratio.reduce((a, b) => a + b, 0) * 100;
	});

	const [widths, setWidths] = useState(initialWidths);

	const [selectedDragPoint, setSelectedDragPoint] = useState(null);
	const [currentValue, setCurrentValue] = useState(null);

	useEffect(() => {
		if (selectedDragPoint !== null && window.innerWidth >= 1200) {

			setWidths(widths => {

				const newWidths = [...widths];

				const dragPointPosition =
					widths.slice(0, selectedDragPoint + 1).reduce((a, b) => a + b)

				const percentageChange =
					(currentValue ?? dragPointPosition)
					- dragPointPosition;

				newWidths[selectedDragPoint] += percentageChange;
				newWidths[selectedDragPoint + 1] -= percentageChange;

				let exceededBounds = newWidths.reduce((bool, width, i) => {
					return (width / 100 * appRoot.clientWidth < 300 && width < widths[i]) || bool
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
		appRoot.style.cursor = 'col-resize';

		setSelectedDragPoint(index);
		appRoot.addEventListener('mousemove', trackCursor);
		document.addEventListener('mouseup', endTracking);
	}

	const endTracking = () => {
		appRoot.style.userSelect = '';
		appRoot.style.cursor = '';

		setSelectedDragPoint(null);
		setCurrentValue(null);

		appRoot.removeEventListener('mousemove', trackCursor);
		document.removeEventListener('mouseup', endTracking);

	};

	const handleDoubleClick = () => {
		setWidths(initialWidths);
	}

	return children.reduce((elementsToRender, child, i) => {
		if (i) {
			elementsToRender.push(
				<div
					key={ -i }
					onMouseDown={ () => startTracking(i - 1) }
					onDoubleClick={ handleDoubleClick }
					className={ stylesheet.divider }
				/>
			)
		}

		const width = `calc(${ widths[i] }% - ${ (children.length - 1) * 16 / children.length }px)`;

		elementsToRender.push(
			<div
				key={ i }
				className={ stylesheet.section }
				style={ { width } }
			>
				{ child }
			</div>
		);

		return elementsToRender;
	}, []);
};

export default DragControl;