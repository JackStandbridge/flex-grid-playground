import React, { useState, useEffect } from 'react';
import stylesheet from './Example.module.scss';
import propertySchema from '../../data/propertySchema.json';

const Example = ({ schema }) => {

	const { name, example, jsName } = propertySchema[schema];

	const [index, setIndex] = useState(0);
	const [className, setClassName] = useState('');

	useEffect(() => {
		const interval = setInterval(() => {
			setClassName('fade');
			setTimeout(() => {
				setIndex(current => (current + 1) % example.values.length);
				setClassName('');
			}, 500);
		}, 6000)

		return () => clearInterval(interval);
	}, [setIndex, example?.values.length]);

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
	)

	const renderSelector = selector => (
		<>
			<span className={ stylesheet.selector }>.{ selector }&nbsp;{ '{\r\n' }</span>

			{ Object
				.entries(example.otherProperties[selector])
				.map(entry => renderRule(entry, false))
			}

			{ example.applyTo === selector &&
				renderRule([name, example.values[index]], true)
			}

			{ '}' }
		</>
	)

	return !example?.values.length ? null : (
		<>
			<section className={ stylesheet.example }>
				<code className={ stylesheet.code }>
					<pre className={ stylesheet.pre }>

						{ example.otherProperties.parent && renderSelector('parent') }
						{ example.otherProperties.child && renderSelector('child') }

					</pre>
				</code>
				<div
					className={ stylesheet.parent }
					style={
						{
							...(example.applyTo === 'parent' ? { [jsName]: example.values[index] } : {}),
							...example.otherProperties.parent
						}
					}
				>
					{ Array(example.children).fill().map((_, i) => (
						<div
							key={ i }
							className={ stylesheet.child }
							style={
								{
									...(example.applyTo === 'child' ? { [jsName]: example.values[index] } : {}),
									...example.otherProperties.child
								}
							}
						/>
					)) }
				</div>
			</section>
		</>
	);
};

export default Example;