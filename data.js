export const initial = {
	currentPage: 'flex',

	pages: {
		flex: {
			numberOfChildren: 3,
			parentStyles: {
				display: 'flex',
			},
			childStyles: {
				margin: '5px',
				padding: '15px',
				width: '120px',
				height: '50px',
			}
		},

		grid: {
			numberOfChildren: 5,
			parentStyles: {
				display: 'grid',
				'grid-gap': '10px',
			},
			childStyles: {
				margin: '0px',
				padding: '15px',
				width: '',
				height: '',
			}
		}
	}
}

const data = {
	flex: {
		fieldsets: [
			{
				name: 'Parent',
				className: 'col',
				fieldsets: [
					{
						name: 'flex-direction',
						className: 'choice',
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
						className: 'choice',
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
						className: 'choice',
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
						className: 'choice',
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
				className: 'col',
				fieldsets: [
					{
						name: 'Number',
						className: 'choice',
						inputs: [
							{
								name: 'range',
								type: 'range',
								id: 'number-of-children',
								min: 1,
								max: 20,
								value: initial.pages.flex.numberOfChildren,
							}
						]
					},
					{
						name: 'Properties (in px)',
						className: 'choice',
						inputs: [
							{
								name: 'margin',
								type: 'number',
								value: initial.pages.flex.childStyles.margin,
							},
							{
								name: 'padding',
								type: 'number',
								min: 0,
								value: initial.pages.flex.childStyles.padding,
							},
							{
								name: 'width',
								type: 'number',
								min: 0,
								value: initial.pages.flex.childStyles.width,
							},
							{
								name: 'height',
								type: 'number',
								min: 0,
								value: initial.pages.flex.childStyles.height,
							}
						]
					}
				]
			}
		]
	},
	grid: {
		fieldsets: [
			{
				name: 'Parent',
				className: 'col',
				fieldsets: [
					{
						name: 'grid-template-columns',
						className: 'choice',
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
						className: 'choice',
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
						name: 'Other Properties',
						className: 'choice',
						inputs: [
							{
								name: 'grid-gap',
								type: 'number',
								min: 0,
								value: initial.pages.grid.parentStyles['grid-gap'],
							}
						]
					}
				]
			},
			{
				name: 'Children',
				page: 'grid',
				className: 'col',
				fieldsets: [
					{
						name: 'Number',
						className: 'choice',
						inputs: [
							{
								name: 'range',
								type: 'range',
								id: 'number-of-children',
								min: 1,
								max: 30,
								value: initial.pages.grid.numberOfChildren,
							}
						]
					},
					{
						name: 'Properties (in px)',
						className: 'choice',
						inputs: [
							{
								name: 'margin',
								type: 'number',
								value: initial.pages.grid.childStyles.margin,
							},
							{
								name: 'padding',
								type: 'number',
								min: 0,
								value: initial.pages.grid.childStyles.padding,
							},
							{
								name: 'width',
								type: 'number',
								min: 0,
								value: initial.pages.grid.childStyles.width,
							},
							{
								name: 'height',
								type: 'number',
								min: 0,
								value: initial.pages.grid.childStyles.height,
							}
						]
					}
				]
			}
		]
	}
}

export default data;