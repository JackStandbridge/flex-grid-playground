export default {
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
							className: 'range'
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
							min: 0,
							value: 5,
							className: 'number'
						},
						{
							name: 'padding',
							type: 'number',
							min: 0,
							value: 5,
							className: 'number'
						},
						{
							name: 'width',
							type: 'number',
							min: 0,
							value: 50,
							className: 'number'
						},
						{
							name: 'height',
							type: 'number',
							min: 0,
							value: 50,
							className: 'number'
						}
					]
				}
			]
		}
	]
};