(function (window) {
	'use strict';

	class Store {
		constructor(name, callback = () => { }) {
			this._dbName = name;

			if (!localStorage[name]) {
				const data = { todos: [] };
				localStorage[name] = JSON.stringify(data);
			}

			callback(JSON.parse(localStorage[name]));
		}

		find(query, callback) {
			if (!callback) return;

			const todos = JSON.parse(localStorage[this._dbName]).todos;
			callback(todos.filter(todo => Object.keys(query).every(key => query[key] === todo[key])));
		}

		findAll(callback = () => { }) {
			callback(JSON.parse(localStorage[this._dbName]).todos);
		}

		save(updateData, callback = () => { }, id) {
			const data = JSON.parse(localStorage[this._dbName]);
			let todos = data.todos;

			if (id) {
				const index = todos.findIndex(todo => todo.id.toString() === id.toString());
				if (index !== -1) {
					Object.assign(todos[index], updateData);
				}
			} else {
				// Enhanced ID generation
				updateData.id = this.generateUniqueId(todos);
				todos.push(updateData);
			}

			localStorage[this._dbName] = JSON.stringify(data);
			callback([updateData]);
		}

		generateUniqueId(todos) {
			let newId;
			do {
				newId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
			} while (todos.some(todo => todo.id === newId));
			return newId;
		}

		remove(id, callback = () => { }) {
			const data = JSON.parse(localStorage[this._dbName]);
			data.todos = data.todos.filter(todo => todo.id.toString() === id.toString());

			localStorage[this._dbName] = JSON.stringify(data);
			callback(data.todos);
		}

		drop(callback = () => { }) {
			const data = { todos: [] };
			localStorage[this._dbName] = JSON.stringify(data);
			callback(data.todos);
		}
	}

	window.app = window.app || {};
	window.app.Store = Store;
})(window);
