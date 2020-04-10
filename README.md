# CSS Playground

A little tool for visualising CSS Flexbox and CSS Grid properties.

[Take a look at the live version](https://jackstandbridge.github.io/css-playground)

## Motivation

I made this project after noticing that a lot of students have persistent misconceptions about how to use flex and grid CSS properties, and wanted to make an interactive tool for them to use to figure out how to apply these properties correctly in their own work.

## Technology

This project is built with React, Redux and Redux Toolkit. I initally started this project with limited scope, only including 4 or 5 flex properties, and it was created with just HTML, CSS and JavaScript. Showing it to a coworker, he suggested that I add grid to its capabilities, and so the scope expanded. For state management, I used ES6 [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to ensure that updates to state were reflected in the DOM without any discrepancies, but as the scope expanded, the approach became increasingly difficult.

I then transitioned the project to using React and Redux for a more familiar and easier to reason state management solution. Redux Toolkit simplifies Redux boilerplate a huge deal, leading to a more concise and easy to reason through state in comparison to the Proxy approach.

This project is installable as a progressive web app, and scores 100 for every metric on Google Lighthouse (as measured 2020-04-06).

## Features

### Instant visual feedback

The user can see the updates to the web page as they select different properties, leading to greater visual feedback. This is similar to the browser's own devtools, but limits the user choice to a smaller subset of CSS rules and properties to avoid an over abundance of choice.

### CSS output

The CSS that is generated from the user's selection is output onto the page in a format that will be familiar as it is styled to mimic a text editor. This output is copiable using the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API), with a fallback for browsers that do not support it. The user can copy all rules or the rules for an individual element.

### Resizable browser window

I implemented a custom click-and-drag resizing component, DragResize. This component allows children to be passed in as well as a `ratio` prop that informs it of the initial fraction of the available space the elements should take up, in order. It defaults to a 1:2:1 ratio for this project, but could be repurposed for other contexts.

### Help modals with examples

Each property has an associated modal that pops up when the user clicks on the `?` button next to that property's name. The modal has an explanation of what that property is used for, as well as an animated example of how it can be used, all of which cycle through different possible values for that property, and display the output. I created custom controls for this cycling behaviour, allowing the user to pause, advance or rewind the playback.

### Accessibility

The controls on the app all function through keyboard input alone, and the site scores 100 on Google Lighthouse's accessibility metric. In addition to this, I created a custom FocusLock component that traps keyboard focus within the modal as per [W3C Documentation](https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-7). This prevents the focus from escaping from the modal, and cycles the focused elements in both directions. Upon closing the modal either by clicking off, clicking the close button or pressing escape, the focus position is restored to the place on the page where it was when the modal was opened.

### Easter eggs

Try interacting with the traffic light controls on the faux browser.