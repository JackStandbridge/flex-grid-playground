import React, { Fragment, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import CopyButton from '../CopyButton'
import stylesheet from './Output.module.scss';
import { getEntries } from '../../data/utilities';

const Output = () => {

	const styles = useSelector(state => {
		const page = state.pages[state.page];

		const entities = [
			{
				name: '.parent',
				entries: getEntries(state, page.parent)
			},
			{
				name: '.children',
				entries: getEntries(state, page.children)
			},
			...page.child.map((id, i) => ({
				name: `.child${ i + 1 }`,
				entries: getEntries(state, id)
			}))
		].filter(({ entries }) => entries.length);

		return entities;
	}, shallowEqual);

	const [collapsed, setCollapsed] = useState(false);
	const [hidden, setHidden] = useState(false);
	const handleCollapse = () => {
		if (collapsed) {
			setCollapsed(false);

			setTimeout(() => {
				setHidden(false);
			}, 200);
		} else {
			setHidden(true);
			setCollapsed(true);
		}
	};

	const sectionClassNames = [
		stylesheet.output,
		collapsed ? stylesheet.collapsed : '',
		hidden ? stylesheet.hidden : '',
	].join(' ');

	return (
		<section className={ sectionClassNames }>
			<h1 className={ stylesheet.title }>
				<button
					className={ stylesheet.collapse }
					onClick={ handleCollapse }
				>CSS Rules</button>
			</h1>

			<div className={ stylesheet.scrollContainer }>

				<div className={ stylesheet.rules }>
					<CopyButton
						copyAllStyles={ true }
						entries={ styles }
					/>
					{ styles.map(({ name, entries }) => (
						<Fragment key={ name } >
							<code className={ stylesheet.code }>
								<pre className={ stylesheet.pre }>
									<span className={ stylesheet.selector }>{ name }&nbsp;</span>

									{ '{\r\n' }

									{ entries.map(({ property, value }) => (
										<span
											key={ property }
											className={ stylesheet.line }
										>
											{ '\t' }
											<span className={ stylesheet.property }>
												{ property }
											</span>
											{ ': ' }
											<span className={ stylesheet.value }>
												{ value }
											</span>
											{ ';\r\n' }
										</span>
									)) }

									{ '}' }

								</pre>
							</code>

							<CopyButton
								copyAllStyles={ false }
								name={ name }
								entries={ entries }
							/>
						</Fragment>
					)) }
				</div>

			</div>

		</section>
	);
};

export default Output;