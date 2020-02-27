import { initial } from '../data.js';

const titles = {
	flex: 'CSS Flexbox Playground',
	grid: 'CSS Grid Playground',
};

const icon = document.getElementById('icon');
const container = document.getElementById('container');
const tabs = [...document.querySelectorAll('.tab')];
const parentStylesOutput = document.getElementById('parent-styles');
const childrenStylesOutput = document.getElementById('child-styles');


class ParentHandler {
	set(target, prop, val) {

		target[prop] = val;
		container.style[prop] = target[prop];

		return true
	}
}

class ChildrenHandler {
	set(target, prop, val) {

		target[prop] = val;

		[...container.children].forEach(child => {
			child.style[prop] = target[prop];
		});

		return true;
	}
}

class ChildHandler {
	set(target, prop, val) {

		target[prop] = val;

		const currentPage = store.state.pages[store.state.currentPage];
		const currentChild = currentPage.currentChild;

		[...container.children][currentChild].style[prop] = val;

		return true;
	}
}

const store = {

	setPage(page) {
		this.state.currentPage = page;

		this.setTab();
		this.updateChildren();
		Object.assign(container.style, this.state.pages[page].parentStyles);
		this.outputCSS();
	},

	outputCSS() {
		const currentPage = this.state.pages[this.state.currentPage];
		const styleSets = [
			{
				styles: currentPage.parentStyles,
				target: parentStylesOutput
			},
			{
				styles: currentPage.childrenStyles,
				target: childrenStylesOutput
			}
		];

		styleSets.forEach(({ styles, target }) => {
			target.textContent = '';

			Object.entries(styles).forEach(([prop, val]) => {

				if (val !== '') {

					const fragment = document.createDocumentFragment();

					const spaces = document.createTextNode('\n\t');
					fragment.append(spaces);

					const propSpan = document.createElement('span');
					propSpan.classList.add('property');
					propSpan.textContent = prop;
					fragment.append(propSpan);

					const colon = document.createTextNode(': ');
					fragment.append(colon);

					const valSpan = document.createElement('span');
					valSpan.classList.add('value');
					valSpan.textContent = val;
					fragment.append(valSpan);

					const semicolon = document.createTextNode(';');
					fragment.append(semicolon);

					target.append(fragment);
				}

			});

		});

	},

	setTab() {

		location.hash = '#' + this.state.currentPage;
		document.title = titles[this.state.currentPage];
		icon.href = `./assets/${ this.state.currentPage }.ico`;

		const chosenTab = tabs.find(tab => tab.dataset.playground === this.state.currentPage);
		const oldTab = tabs.find(tab => tab.classList.contains('tab--active'));

		chosenTab.classList.remove('tab--inactive');
		chosenTab.classList.add('tab--active');

		if (oldTab) {
			oldTab.classList.remove('tab--active');
			oldTab.classList.add('tab--inactive');
		}
	},

	setStyle(property, value, section) {
		const currentPage = this.state.pages[this.state.currentPage];

		if (section === 'childStyles') {
			const currentChild = currentPage.currentChild;
			currentPage.children[currentChild][property] = value;

		} else {
			currentPage[section][property] = value;
			this.outputCSS();
		}
	},

	setChildren({ value }) {
		const currentPage = this.state.pages[this.state.currentPage];
		currentPage.numberOfChildren = +value;

		while (value > currentPage.children.length) {
			currentPage.children.push(new Proxy({}, new ChildHandler()));
		}

		while (value < currentPage.children.length) {
			currentPage.children.pop();
		}

		this.updateChildren();
	},

	updateChildren() {

		const fragment = document.createDocumentFragment();
		const currentPage = this.state.pages[this.state.currentPage];

		for (let i = 0; i < currentPage.numberOfChildren; i++) {

			const div = document.createElement('div');
			div.classList.add('child', `child--${ i + 1 }`);
			div.setAttribute('tabindex', 0);

			Object.assign(div.style, currentPage.childrenStyles);

			fragment.append(div);
		}

		container.textContent = '';
		container.append(fragment);
	}
}

for (let pageName in initial.pages) {
	const parentStyles = initial.pages[pageName].parentStyles;
	const childrenStyles = initial.pages[pageName].childrenStyles;

	initial.pages[pageName].parentStyles = new Proxy(parentStyles, new ParentHandler());

	initial.pages[pageName].childrenStyles = new Proxy(childrenStyles, new ChildrenHandler());

	initial.pages[pageName].children.forEach((child, i, arr) => {
		arr[i] = new Proxy(child, new ChildHandler());
	});
}

store.state = initial;

export default store;
