import React, { Fragment } from 'react';
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
				name: '.child',
				entries: getEntries(state, page.children)
			},
			...page.child.map((id, i) => ({
				name: `.child:nth-child(${ i + 1 })`,
				entries: getEntries(state, id)
			}))
		].filter(({ entries }) => entries.length);

		return entities;
	}, shallowEqual);

	return (
		<section className={ stylesheet.output }>
			<h1 className={ stylesheet.title }>CSS Rules</h1>

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