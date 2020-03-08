import React, { useState, useRef } from 'react';
import stylesheet from './CopyButton.module.scss';
import { allCopiableText, copiableText } from '../../data/utilities';

const CopyButton = ({ copyAllStyles, name, entries }) => {

	const initial = {
		text: copyAllStyles ? 'Copy All' : 'Copy',
		className: '',
	};

	const [options, setOptions] = useState(initial);
	const buttonRef = useRef(null);

	const handleClick = async () => {

		const result =
			copyAllStyles
				? allCopiableText(entries)
				: copiableText({ name, entries });

		try {

			if (window.navigator.clipboard) {
				await window.navigator.clipboard.writeText(result);
				setOptions({
					text: 'Copied!',
					className: 'success',
				});

			} else {
				const el = document.createElement('pre');
				el.style.position = 'absolute';
				el.style.left = -1000;
				el.textContent = result;
				document.body.append(el);
				const selection = window.getSelection();
				const range = document.createRange();

				range.selectNodeContents(el);
				selection.removeAllRanges();
				selection.addRange(range);

				document.execCommand("copy");
				selection.removeAllRanges();
				el.remove();

				setOptions({
					text: 'Copied!',
					className: 'success',
				});
			}

		} catch (e) {
			setTimeout(() => {
				setOptions({
					text: 'Error',
					className: 'error',
				});
			}, 500);
		} finally {

			setTimeout(() => {
				buttonRef.current.blur();
				setOptions(initial);
			}, 3000);

		}

	}

	const classNames = [
		stylesheet.button,
		copyAllStyles ? stylesheet.all : '',
		stylesheet[options.className],
	].join(' ');

	return (
		<button
			className={ classNames }
			onClick={ handleClick }
			ref={ buttonRef }
		>
			{ options.text }
		</button>
	);
};

export default CopyButton;