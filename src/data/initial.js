const initial = {
	page: 'flex',
	pages: {
		flex: {
			title: 'Flexbox Playground',
			icon: 'flex.ico',
			parentStyles: {},
			childrenStyles: {
				padding: '2rem',
				margin: '5px'
			},
			childStyles: {
				byId: {
					0: { padding: '1rem' },
					1: {},
					2: {}
				},
				allIds: [0, 1, 2],
			},
			currentChild: null,
		},
		grid: {
			title: 'Grid Playground',
			icon: 'grid.ico',
			parentStyles: {},
			childrenStyles: {},
			childStyles: {
				byId: {
					0: {},
					1: { background: 'black' },
					2: {}
				},
				allIds: [0, 1, 2],
			},
			currentChild: null,
		},
	},
};

export default initial;