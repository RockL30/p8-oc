"use strict";

class Store {
	constructor(name, callback = () => { }) {
		this._dbName = name;

		if (!localStorage[name]) {
			let data = {
				todos: []
			};

			localStorage[name] = JSON.stringify(data);
		}

		callback.call(this, JSON.parse(localStorage[name]));
	}

	find(query, callback) {
		if (!callback) {
			return;
		}

		let todos = JSON.parse(localStorage[this._dbName]).todos;

		callback.call(this, todos.filter((todo) => {
			for (let q in query) {
				if (query[q] !== todo[q]) {
					return false;
				}
			}
			return true;
		}));
	}

	findAll(callback = () => { }) {
		callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
	}

	save(updateData, callback = () => { }, id) {
		let data = JSON.parse(localStorage[this._dbName]);
		let todos = data.todos;

		// Generate an ID
		let newId = Date.now();

		// If an ID was actually given, find the item and update each property
		if (id) {
			for (let i = 0; i < todos.length; i++) {
				if (todos[i].id === id) {
					for (let key in updateData) {
						todos[i][key] = updateData[key];
					}
					break;
				}
			}

			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, todos);
		} else {
			// Assign an ID
			updateData.id = parseInt(newId);

			todos.push(updateData);
			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, [updateData]);
		}
	}

	remove(id, callback) {
		let data = JSON.parse(localStorage[this._dbName]);
		let todos = data.todos;
		let todoId;

		for (let i = 0; i < todos.length; i++) {
			if (todos[i].id == id) {
				todoId = todos[i].id;
			}
		}

		for (let i = 0; i < todos.length; i++) {
			if (todos[i].id == todoId) {
				todos.splice(i, 1);
			}
		}

		localStorage[this._dbName] = JSON.stringify(data);
		callback.call(this, todos);
	}

	drop(callback) {
		let data = { todos: [] };
		localStorage[this._dbName] = JSON.stringify(data);
		callback.call(this, data.todos);
	}
}

window.app = window.app || {};
window.app.Store = Store;