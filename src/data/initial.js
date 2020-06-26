const page = window.location.hash.slice(1,);

const initial = {
	page: ['flex', 'grid'].includes(page) ? page : 'flex',
	pages: {
		flex: {
			title: 'Flexbox Playground',
			icon: 'flex.ico',
			parent: 0,
			children: 1,
			child: [4, 5, 6],
			currentChild: null,
		},
		grid: {
			title: 'Grid Playground',
			icon: 'grid.ico',
			parent: 2,
			children: 3,
			child: [7, 8, 9],
			currentChild: null,
		}
	},
	styleObjects: {
		0: [0],
		1: [1],
		2: [2, 4, 5],
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
			id: 0,
			schema: 'display',
			protected: true,
			values: [
				{ value: 'flex' }
			],
		},
		1: {
			id: 1,
			schema: 'padding',
			values: [
				{ value: '1' },
				{ value: 'rem' },
			],
		},
		2: {
			id: 2,
			schema: 'display',
			protected: true,
			values: [
				{ value: 'grid' }
			],
		},
		3: {
			id: 3,
			schema: 'padding',
			values: [
				{ value: '1' },
				{ value: 'rem' }
			],
		},
		4: {
			id: 4,
			schema: 'gridTemplateColumns',
			values: [
				{ value: '', type: 'number', space: true },
				{ value: 'fr', type: 'option' },
			],
		},
		5: {
			id: 5,
			schema: 'gridTemplateRows',
			values: [
				{ value: '', type: 'number', space: true },
				{ value: 'fr', type: 'option' },
			],
		},
	},
	shiftPressed: false,
	removingChild: false,
};

export default initial;