(function (window) {
	'use strict';

	/**
	 * Creates a new client-side storage object and will create an empty
	 * collection if no collection already exists.
	 *
	 * @param {string} name The name of our DB we want to use
	 * @param {function} callback Our fake DB uses callbacks because in
	 * real life you probably would be making AJAX calls
	 */
	class Store {
		constructor(name, callback = () => { }) {
			this._dbName = name;

			if (!localStorage[name]) {
				const data = { todos: [] };
				localStorage[name] = JSON.stringify(data);
			}

			callback(JSON.parse(localStorage[name]));
		}

		/**
		 * Finds items based on a query given as a JS object.
		 *
		 * @param {object} query The query to match against (i.e. {foo: 'bar'})
		 * @param {function} callback The callback to fire when the query has
		 * completed running
		 *
		 * @example
		 * db.find({foo: 'bar', hello: 'world'}, function (data) {
		 *   // data will return any items that have foo: bar and
		 *   // hello: world in their properties
		 * });
		 */
		find(query, callback) {
			if (!callback) return;

			const todos = JSON.parse(localStorage[this._dbName]).todos;
			callback(todos.filter(todo => Object.keys(query).every(key => query[key] === todo[key])));
		}

		/**
		 * Retrieves all data from the collection.
		 *
		 * @param {function} callback The callback to fire upon retrieving data
		 */
		findAll(callback = () => { }) {
			callback(JSON.parse(localStorage[this._dbName]).todos);
		}

		/**
		 * Saves the given data to the DB. If no item exists it will create a new
		 * item, otherwise it'll simply update an existing item's properties.
		 *
		 * @param {object} updateData The data to save back into the DB
		 * @param {function} callback The callback to fire after saving
		 * @param {number} id An optional param to enter an ID of an item to update
		 */
		save(updateData, callback = () => { }, id) {
			const data = JSON.parse(localStorage[this._dbName]);
			let todos = data.todos;

			if (id) {
				const index = todos.findIndex(todo => todo.id === id);
				if (index !== -1) {
					todos[index] = { ...todos[index], ...updateData };
				}
			} else {
				updateData.id = this.generateUniqueId(todos);
				todos.push(updateData);
			}

			localStorage[this._dbName] = JSON.stringify(data);
			callback([updateData]);
		}

		/**
		 * Generates a unique ID for a todo item.
		 *
		 * @param {Array} todos The array of existing todo items
		 * @returns {string} A unique ID
		 */
		generateUniqueId(todos) {
			let newId;
			do {
				newId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
			} while (todos.some(todo => todo.id === newId));
			return newId;
		}

		/**
		 * Removes an item from the Store based on its ID.
		 *
		 * @param {number} id The ID of the item you want to remove
		 * @param {function} callback The callback to fire after saving
		 */
		remove(id, callback = () => { }) {
			const data = JSON.parse(localStorage[this._dbName]);
			let todos = data.todos;

			todos = todos.filter(todo => todo.id !== id);

			localStorage[this._dbName] = JSON.stringify({ ...data, todos });
			callback(todos);
		}

		/**
		 * Drops all storage and starts fresh.
		 *
		 * @param {function} callback The callback to fire after dropping the data
		 */
		drop(callback = () => { }) {
			const data = { todos: [] };
			localStorage[this._dbName] = JSON.stringify(data);
			callback(data.todos);
		}
	}

	window.app = window.app || {};
	window.app.Store = Store;
})(window);
