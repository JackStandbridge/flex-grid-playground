import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import stylesheet from './Modal.module.scss';

const Modal = ({ content, display, handleDismiss }) => {

	const modalRoot = useRef(document.getElementById('modal-root'));
	const html = useRef(document.querySelector('html'));
	const [activeElement, setActiveElement] = useState(null);
	const buttonRef = useRef(null);

	const handleKey = useCallback(e => {
		if (e.key === 'Escape') {
			handleDismiss();
		}

		if (e.key === 'Tab' && buttonRef.current) {
			e.preventDefault();
			buttonRef.current.focus();
		}
	}, [handleDismiss]);

	const onModalClose = useCallback(() => {
		if (activeElement) {
			activeElement.focus();
			activeElement.removeEventListener('keydown', handleKey);
		}

		html.current.style.overflow = '';
	}, [handleKey, activeElement]);

	useEffect(() => {

		if (display) {
			setActiveElement(document.activeElement);
			document.addEventListener('keydown', handleKey);
			html.current.style.overflow = 'hidden';

		} else {
			onModalClose();
		}

		return onModalClose;

	}, [display, handleKey, onModalClose]);

	const handleBackingClick = e => {
		if (e.currentTarget === e.target) {
			handleDismiss()
		}
	}

	return display && createPortal(
		<div
			className={ stylesheet.backing }
			onClick={ handleBackingClick }
		>
			<section
				className={ stylesheet.window }
				>
				<button
					ref={ buttonRef }
					tabIndex={ 0 }
					className={ stylesheet.close }
					onClick={ handleDismiss }
				/>
				{ content }
			</section>
		</div>,
		modalRoot.current
	)
};

export default Modal;