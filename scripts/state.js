import { initial } from '../data.js';

const numToPx = val => val === '' ? '' : `${ val }px`

const titles = {
	flex: 'CSS Flexbox Playground',
	grid: 'CSS Grid Playground',
};

const icon = document.getElementById('icon');
const container = document.getElementById('container');
const tabs = [...document.querySelectorAll('.tab')];

class ChildHandler {
	set(target, prop, val) {
		target[prop] = numToPx(val);

		[...container.children].forEach(child => {
			child.style[prop] = target[prop];
		});

		return true;
	}
};

class ParentHandler {
	set(target, prop, val) {

		target[prop] = val;
		container.style[prop] = val;

		return true
	}
}

/**
 * @TODO - save state in LocalStorage?
 */

const state = {
	page: 'flex',
	children: 3,

	setPage(page) {
		this.page = page;

		this.setTab();
		this.updateChildren();
		Object.assign(container.style, this[page].parentStyles);
	},

	setTab() {
		location.hash = '#' + this.page;
		document.title = titles[this.page];
		icon.href = `./assets/${ this.page }.ico`;

		const chosenTab = tabs.find(tab => tab.dataset.playground === this.page);
		const oldTab = tabs.find(tab => tab.classList.contains('tab--active'));

		chosenTab.classList.remove('tab--inactive');
		chosenTab.classList.add('tab--active');

		if (oldTab) {
			oldTab.classList.remove('tab--active');
			oldTab.classList.add('tab--inactive');
		}
	},

	setChildStyles({ dataset, value }) {
		const { property } = dataset;
		this[this.page].childStyles[property] = value;
	},

	setParentStyles({ dataset }) {
		const { property, value } = dataset;
		this[this.page].parentStyles[property] = value;
	},

	setConstructedStyle(inputs, parentName) {
		let value = '';
		for (let i = 0; i < inputs.length; i++) {
			if (i && i % 2 === 0) {
				value += ' '
			}
			value += inputs[i].value;
		}
		this.setParentStyles({
			dataset: {
				property: parentName,
				value
			}
		});
	},

	setChildren({ value }) {
		this[this.page].children = +value;
		this.updateChildren();
	},

	updateChildren() {

		const fragment = document.createDocumentFragment();

		for (let i = 0; i < this[this.page].children; i++) {

			const div = document.createElement('div');
			div.classList.add('child');

			Object.assign(div.style, this[this.page].childStyles);

			fragment.append(div);
		}

		container.textContent = '';
		container.append(fragment);
	}
}


Object
	.entries(initial)
	.forEach(([property, values]) => {

		const childStyles = Object.assign(
			{},
			Object.fromEntries(Object.entries(values)
				.map(([key, val]) => [key, numToPx(val)]))
		);

		const parentStyles = { display: property };
		state[property] = {
			children: 3,
			childStyles: new Proxy(childStyles, new ChildHandler()),
			parentStyles: new Proxy(parentStyles, new ParentHandler()),
		}
	});

export default state;