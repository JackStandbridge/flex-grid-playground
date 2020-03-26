import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getEdgeElements } from '../../data/utilities';

const FocusLock = ({ children }) => {

	const containerRef = useRef(null);
	const outerFocusRef = useRef(document.activeElement);
	const [focusable, setFocusable] = useState([]);
	const [, setTabbed] = useState(false);

	useEffect(() => {
		const edgeElements = getEdgeElements(containerRef.current);
		setFocusable(edgeElements);
	}, [setFocusable]);

	const tabListener = useCallback(e => {
		if (e.key === 'Tab') {

			setTabbed(tabbed => {
				if (!tabbed) {
					// ensure starting tab position is first element
					e.preventDefault();
					requestAnimationFrame(() => focusable.start.focus());
				}
				return true;
			})

			if ( // reached the end of tabbable elements
				!e.shiftKey && focusable.end === document.activeElement
			) {
				e.preventDefault();
				focusable.start.focus();

			} else if ( // reached the start of tabbable elements
				e.shiftKey && focusable.start === document.activeElement
			) {
				e.preventDefault();
				focusable.end.focus();
			}

		}
	}, [focusable, setTabbed]);

	useEffect(() => {
		document.addEventListener('keydown', tabListener);
		const outerFocus = outerFocusRef.current;

		return () => {
			document.removeEventListener('keydown', tabListener);
			outerFocus.focus();
		}
	}, [tabListener]);

	return (
		<div ref={ containerRef }>
			{ children }
		</div>
	);
};

export default FocusLock;