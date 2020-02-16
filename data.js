export const initial = {
	flex: {
		margin: 5,
		padding: 15,
		width: 120,
		height: 50,
	},
	grid: {
		margin: 0,
		padding: 15,
		width: '',
		height: '',
	}
}

const data = {
	flex: {
		fieldsets: [
			{
				name: 'Container',
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
				className: 'col',
				fieldsets: [
					{
						name: 'Number',
						className: 'choice',
						inputs: [
							{
								name: 'range',
								type: 'range',
								min: 1,
								max: 20,
								value: 3,
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
								value: initial.flex.margin,
							},
							{
								name: 'padding',
								type: 'number',
								min: 0,
								value: initial.flex.padding,
							},
							{
								name: 'width',
								type: 'number',
								min: 0,
								value: initial.flex.width,
							},
							{
								name: 'height',
								type: 'number',
								min: 0,
								value: initial.flex.height,
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
				name: 'Container',
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
				]
			},
			{
				name: 'Children',
				className: 'col',
				fieldsets: [
					{
						name: 'Number',
						className: 'choice',
						inputs: [
							{
								name: 'range',
								type: 'range',
								min: 1,
								max: 20,
								value: 3,
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
								value: initial.grid.margin,
							},
							{
								name: 'padding',
								type: 'number',
								min: 0,
								value: initial.grid.padding,
							},
							{
								name: 'width',
								type: 'number',
								min: 0,
								value: initial.grid.width,
							},
							{
								name: 'height',
								type: 'number',
								min: 0,
								value: initial.grid.height,
							}
						]
					}
				]
			}
		]
	}
}

export default data;