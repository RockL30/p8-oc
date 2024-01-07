/*global app, $on */
import './../node_modules/todomvc-common/base.css';
import './../node_modules/todomvc-app-css/index.css';

(() => {
	'use strict';

	/**
	 * Sets up a brand new Todo list.
	 *
	 * @param {string} name The name of your new to do list.
	 */
	class Todo {
		constructor(name) {
			this.storage = new app.Store(name);
			this.model = new app.Model(this.storage);
			this.template = new app.Template();
			this.view = new app.View(this.template);
			this.controller = new app.Controller(this.model, this.view);
		}
	}

	let todo = new Todo('todos-vanillajs');

	const setView = () => {
		todo.controller.setView(document.location.hash);
	};
	$on(window, 'load', setView);
	$on(window, 'hashchange', setView);
})();