const initial = {
	page: window.location.hash.slice(1,) || 'flex',
	pages: {
		flex: {
			title: 'Flexbox Playground',
			icon: 'flex.ico',
			parentStyles: 0,
			childrenStyles: 1,
			childStyles: [4, 5, 6],
			currentChild: null,
		},
		grid: {
			title: 'Grid Playground',
			icon: 'grid.ico',
			parentStyles: 2,
			childrenStyles: 3,
			childStyles: [7, 8, 9],
			currentChild: null,
		}
	},
	styleObjects: {
		0: [0],
		1: [1],
		2: [2],
		3: [3],
		4: [],
		5: [],
		6: [],
		7: [],
		8: [],
		9: [],
	},
	styleEntries: {
		0: {
			schema: 'display',
			values: ['flex'],
		},
		1: {
			schema: 'padding',
			values: ['1', 'rem'],
		},
		2: {
			schema: 'display',
			values: ['grid'],
		},
		3: {
			schema: 'padding',
			values: ['1', 'rem'],
		},
	},
};

export default initial;