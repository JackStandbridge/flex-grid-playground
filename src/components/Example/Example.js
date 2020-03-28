import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import stylesheet from './Example.module.scss';
import propertySchema from '../../data/propertySchema.json';
import { camelKeys } from '../../data/utilities';

const Example = ({ schema }) => {

	const { name, jsName } = propertySchema[schema];
	let { example } = propertySchema[schema];

	const page = useSelector(({ page }) => page);
	example = example[page] ?? example;

	const [index, setIndex] = useState(0);
	const [className, setClassName] = useState('');
	const [paused, setPaused] = useState(false);

	const handlePause = () => {
		setPaused(!paused);
	};

	const handleNext = () => {
		setIndex((index + 1) % example.values.length);
	}

	const handlePrev = () => {
		setIndex((index === 0 ? example.values.length : index) - 1);
	}

	useEffect(() => {
		const timeouts = []
		if (!paused) {

			timeouts.push(setTimeout(() => {

				setClassName('fade');

				timeouts.push(setTimeout(() => {
					setIndex(current => (current + 1) % example.values.length);
					setClassName('');
				}, 500));

			}, 6000));

		}
		return () => timeouts.forEach(clearTimeout);

	}, [setIndex, example.values.length, paused, index]);

	const renderRule = ([key, value], animate) => (
		<span key={ key } className={ animate ? '' : stylesheet.deemphasised }>
			{ '\t' }
			<span className={ stylesheet.property }>
				{ key }
			</span>
			{ ': ' }
			<span className={ animate ? stylesheet[className] : stylesheet.property }>
				<span className={ stylesheet.value }>
					{ value }
				</span>
			</span>
			{ ';\r\n' }
		</span>
	);

	const renderSelector = selector => (
		<Fragment key={ selector }>
			<span className={ stylesheet.selector }>
				.{ selector }&nbsp;{ '{\r\n' }
			</span>

			{ Object
				.entries(example.otherProperties[selector] ?? {})
				.map(entry => renderRule(entry, false))
			}

			{ example.applyTo === selector &&
				renderRule([name, example.values[index]], true)
			}

			{ '}' }
		</Fragment>
	);

	const renderNthChildSelectors = () => {
		if (+example.applyTo === example.applyTo) {
			const cssIndex = example.applyTo + 1;
			return (
				<>
					<span className={ stylesheet.selector }>
						.child:nth-child({ cssIndex })&nbsp;{ '{\r\n' }
					</span>

					{
						renderRule([name, example.values[index]], true)
					}

					{ '}' }
				</>
			)
		}
	}

	const propertyObject = { [jsName]: example.values[index] };
	const parentProperties = camelKeys(example.otherProperties.parent);
	const childProperties = camelKeys(example.otherProperties.child);

	return !example.values.length ? null : (
		<section className={ stylesheet.example }>
			<code className={ stylesheet.code }>
				<pre className={ stylesheet.pre }>
					{
						['parent', 'child'].map(selector => (
							example.otherProperties[selector]
								|| example.applyTo === selector
								? renderSelector(selector) : null
						))
					}

					{ renderNthChildSelectors() }
				</pre>
			</code>

			<div
				className={ stylesheet.parent }
				style={ {
					...parentProperties,
					...(example.applyTo === 'parent' ? propertyObject : {}),
				} }
			>
				{ Array(example.children).fill().map((_, i) => (
					<div
						key={ i }
						className={ stylesheet[example.applyTo === i ? 'emphasisedChild' : 'child'] }
						style={ {
							...childProperties,
							...(['child', i].includes(example.applyTo) ? propertyObject : {}),
						} }
					/>
				)) }
			</div>

			<div className={ stylesheet.controls }>
				<button
					onClick={ handlePrev }
					className={ stylesheet.back }
				/>
				<button
					onClick={ handlePause }
					className={ paused ? stylesheet.play : stylesheet.pause }
				>{ paused ? <span className={ stylesheet.playIcon } /> : null }</button>
				<button
					onClick={ handleNext }
					className={ stylesheet.forward }
				/>
			</div>
		</section>
	);
};

export default Example;