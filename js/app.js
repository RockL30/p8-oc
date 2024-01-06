/*global app, $on */
(() => {
	'use strict';

	/**
	 * Sets up a brand new Todo list.
	 *
	 * @param {string} name The name of your new to do list.
	 */
	class Todo {
		constructor(name) {
			const { Store, Model, Template, View, Controller } = app;
			this.storage = new Store(name);
			this.model = new Model(this.storage);
			this.template = new Template();
			this.view = new View(this.template);
			this.controller = new Controller(this.model, this.view);
		}
	}

	const todo = new Todo('todos-vanillajs');

	const setView = () => {
		todo.controller.setView(document.location.hash);
	};
	$on(window, 'load', setView);
	$on(window, 'hashchange', setView);
})();