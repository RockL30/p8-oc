'use strict';

// Get element(s) by CSS selector:
window.qs = (selector, scope = document) => scope.querySelector(selector);
window.qsa = (selector, scope = document) => scope.querySelectorAll(selector);

// addEventListener wrapper:
window.$on = (target, type, callback, useCapture = false) => target.addEventListener(type, callback, useCapture);

// Attach a handler to event for all elements that match the selector,
// now or in the future, based on a root element
window.$delegate = (target, selector, type, handler) => {
	const dispatchEvent = (event) => {
		let targetElement = event.target;
		let potentialElements = window.qsa(selector, target);
		let hasMatch = Array.from(potentialElements).includes(targetElement);

		if (hasMatch) {
			handler.call(targetElement, event);
		}
	};

	// https://developer.mozilla.org/en-US/docs/Web/Events/blur
	let useCapture = type === 'blur' || type === 'focus';

	window.$on(target, type, dispatchEvent, useCapture);
};

// Find the element's parent with the given tag name:
// $parent(qs('a'), 'div');
window.$parent = (element, tagName) => {
	while (element && element.nodeType === 1) {
		if (element.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element;
		}
		element = element.parentNode;
	}
};

// Allow for looping on nodes by chaining:
// qsa('.foo').forEach(function () {})
NodeList.prototype.forEach = Array.prototype.forEach;