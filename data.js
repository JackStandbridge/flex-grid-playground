export const initial = {
	currentPage: 'flex',

	pages: {
		flex: {
			numberOfChildren: 3,
			parentStyles: {
				display: 'flex',
			},
			childrenStyles: {
				margin: '5px',
				padding: '15px',
				width: '120px',
				height: '50px',
			},

			children: [{}, {}, {}],
			currentChild: null,
		},

		grid: {
			numberOfChildren: 3,
			parentStyles: {
				display: 'grid',
				'grid-gap': '10px',
			},
			childrenStyles: {
				margin: '0px',
				padding: '15px',
				width: '',
				height: '',
			},

			children: [{}, {}, {}],
			currentChild: null,
		}
	}
}

const data = {
	flex: {
		fieldsets: [
			{
				name: 'Parent',
				classNames: ['col'],
				collapsed: false,
				fieldsets: [
					{
						name: 'flex-direction',
						classNames: ['choice'],
						inputs: [
							{
								name: 'row',
								type: 'radio'
							},
							{
								name: 'column',
								type: 'radio'
							},
							{
								name: 'row-reverse',
								type: 'radio'
							},
							{
								name: 'column-reverse',
								type: 'radio'
							}
						]
					},
					{
						name: 'justify-content',
						classNames: ['choice'],
						inputs: [
							{
								name: 'flex-start',
								type: 'radio'
							},
							{
								name: 'flex-end',
								type: 'radio'
							},
							{
								name: 'space-between',
								type: 'radio'
							},
							{
								name: 'space-around',
								type: 'radio'
							},
							{
								name: 'space-evenly',
								type: 'radio'
							},
							{
								name: 'center',
								type: 'radio'
							}
						]
					},
					{
						name: 'align-items',
						classNames: ['choice'],
						inputs: [
							{
								name: 'stretch',
								type: 'radio'
							},
							{
								name: 'center',
								type: 'radio'
							},
							{
								name: 'flex-start',
								type: 'radio'
							},
							{
								name: 'flex-end',
								type: 'radio'
							}
						]
					},
					{
						name: 'flex-wrap',
						classNames: ['choice'],
						inputs: [
							{
								name: 'nowrap',
								type: 'radio'
							},
							{
								name: 'wrap',
								type: 'radio'
							}
						]
					}
				]
			},
			{
				name: 'Children',
				page: 'flex',
				collapsed: false,
				classNames: ['col'],
				fieldsets: [
					{
						name: 'Number',
						classNames: ['choice'],
						collapsed: false,
						inputs: [
							{
								name: 'range',
								type: 'range',
								ariaLabel: 'Number of children',
								id: 'number-of-children',
								min: 1,
								max: 20,
								value: initial.pages.flex.numberOfChildren,
							}
						]
					},
					{
						name: 'box-sizing',
						classNames: ['choice'],
						collapsed: false,
						inputs: [
							{
								name: 'content-box',
								type: 'radio',
							},
							{
								name: 'border-box',
								type: 'radio',
							}
						]
					}
				],
				inputs: [
					{
						name: 'margin',
						type: 'number',
						options: [
							'px', '%', 'rem'
						],
						value: initial.pages.flex.childrenStyles.margin,
					},
					{
						name: 'padding',
						type: 'number',
						options: [
							'px', '%', 'rem'
						],
						min: 0,
						value: initial.pages.flex.childrenStyles.padding,
					},
					{
						name: 'width',
						type: 'number',
						options: [
							'px', '%', 'rem'
						],
						min: 0,
						value: initial.pages.flex.childrenStyles.width,
					},
					{
						name: 'height',
						type: 'number',
						options: [
							'px', '%', 'rem'
						],
						min: 0,
						value: initial.pages.flex.childrenStyles.height,
					},
				]
			}
		]
	},
	grid: {
		fieldsets: [
			{
				name: 'Parent',
				classNames: ['col'],
				collapsed: false,
				fieldsets: [
					{
						name: 'grid-template-columns',
						classNames: ['choice'],
						inputs: [
							{
								type: 'multi',
								options: [
									'fr',
									'px',
									'%',
								],
							}
						]
					},
					{
						name: 'grid-template-rows',
						classNames: ['choice'],
						inputs: [
							{
								type: 'multi',
								options: [
									'fr',
									'px',
									'%',
								],
							}
						]
					},
					{
						name: 'align-items',
						classNames: ['choice'],
						inputs: [
							{
								name: 'stretch',
								type: 'radio',
							},
							{
								name: 'center',
								type: 'radio',
							},
							{
								name: 'start',
								type: 'radio',
							},
							{
								name: 'end',
								type: 'radio'
							}
						]
					},
					{
						name: 'justify-items',
						classNames: ['choice'],
						inputs: [
							{
								name: 'stretch',
								type: 'radio',
							},
							{
								name: 'center',
								type: 'radio',
							},
							{
								name: 'start',
								type: 'radio',
							},
							{
								name: 'end',
								type: 'radio'
							}
						]
					}
				],
				inputs: [
					{
						name: 'grid-gap',
						type: 'number',
						options: [
							'px', '%', 'rem'
						],
						min: 0,
						value: initial.pages.grid.parentStyles['grid-gap'],
					}
				]
			},
			{
				name: 'Children',
				collapsed: false,
				classNames: ['col'],
				fieldsets: [
					{
						name: 'Number',
						classNames: ['choice'],
						collapsed: false,
						inputs: [
							{
								name: 'range',
								type: 'range',
								ariaLabel: 'Number of children',
								id: 'number-of-children',
								min: 1,
								max: 30,
								value: initial.pages.grid.numberOfChildren,
							}
						]
					}
				],
				inputs: [
					{
						name: 'margin',
						type: 'number',
						options: [
							'px', '%', 'rem'
						],
						value: initial.pages.grid.childrenStyles.margin,
					},
					{
						name: 'padding',
						type: 'number',
						options: [
							'px', '%', 'rem'
						],
						min: 0,
						value: initial.pages.grid.childrenStyles.padding,
					},
					{
						name: 'width',
						type: 'number',
						options: [
							'px', '%', 'rem'
						],
						min: 0,
						value: initial.pages.grid.childrenStyles.width,
					},
					{
						name: 'height',
						type: 'number',
						options: [
							'px', '%', 'rem'
						],
						min: 0,
						value: initial.pages.grid.childrenStyles.height,
					}
				]
			},
			{
				name: 'Child',
				classNames: ['col', 'hidden'],
				collapsed: false,
				fieldsets: [
					{
						name: 'align-self',
						classNames: ['choice'],
						inputs: [
							{
								name: 'stretch',
								type: 'radio'
							},
							{
								name: 'center',
								type: 'radio'
							},
							{
								name: 'start',
								type: 'radio'
							},
							{
								name: 'end',
								type: 'radio'
							},
						]
					},
					{
						name: 'justify-self',
						classNames: ['choice'],
						inputs: [
							{
								name: 'stretch',
								type: 'radio'
							},
							{
								name: 'center',
								type: 'radio'
							},
							{
								name: 'start',
								type: 'radio'
							},
							{
								name: 'end',
								type: 'radio'
							},
						]
					},
				],
				inputs: [
					{
						name: 'margin',
						type: 'number',
						options: [
							'px', '%', 'rem'
						],
						value: initial.pages.grid.childrenStyles.margin,
					},
					{
						name: 'padding',
						type: 'number',
						options: [
							'px', '%', 'rem'
						],
						min: 0,
						value: initial.pages.grid.childrenStyles.padding,
					},
					{
						name: 'width',
						type: 'number',
						options: [
							'px', '%', 'rem'
						],
						min: 0,
						value: initial.pages.grid.childrenStyles.width,
					},
					{
						name: 'height',
						type: 'number',
						options: [
							'px', '%', 'rem'
						],
						min: 0,
						value: initial.pages.grid.childrenStyles.height,
					}
				]
			}
		]
	}
}

export default data;