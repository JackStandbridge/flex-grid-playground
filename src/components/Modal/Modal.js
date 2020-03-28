import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { formatMarkDown } from '../../data/utilities';
import stylesheet from './Modal.module.scss';
import propertySchema from '../../data/propertySchema.json';
import Example from '../Example';
import FocusLock from '../FocusLock';
import Accordion from '../Accordion';

const Modal = ({ schema, display, handleDismiss }) => {

	const { name, description, details } = propertySchema[schema]

	const modalRoot = useRef(document.getElementById('modal-root'));
	const html = useRef(document.querySelector('html'));
	const buttonRef = useRef(null);

	const handleKey = useCallback(e => {
		if (e.key === 'Escape') {
			handleDismiss();
		}
	}, [handleDismiss]);

	const onModalClose = useCallback(() => {
		document.removeEventListener('keydown', handleKey);
		html.current.style.overflow = '';
	}, [handleKey]);

	useEffect(() => {

		if (display) {
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
	};

	const renderContent = (p, i) => (
		<p
			dangerouslySetInnerHTML={
				{ __html: formatMarkDown(p, stylesheet) }
			}
			key={ i }
		/>
	);

	return display && createPortal(
		<FocusLock>
			<div
				className={ stylesheet.backing }
				onClick={ handleBackingClick }
			>
				<section className={ stylesheet.window }>
					<button
						ref={ buttonRef }
						tabIndex={ 0 }
						className={ stylesheet.close }
						onClick={ handleDismiss }
					/>

					<h1 className={ stylesheet.title }>
						{ name.replace(/-/g, ' ') }
					</h1>

					{ description.map(renderContent) }

					{ details &&
						<Accordion
							legend='Further Information'
							collapsed={ true }
							targetClass='modalFieldset'
							buttonClass='expander'
						>
							{ () => details.map(renderContent) }
						</Accordion>
					}

					{ propertySchema[schema].example &&
						<Example schema={ schema } />
					}
				</section>
			</div>
		</FocusLock>,
		modalRoot.current
	)
};

export default Modal;