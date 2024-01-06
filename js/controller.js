class Controller {
	/**
	 * Initializes a new instance of the Controller class.
	 * 
	 * @param {object} model The model instance
	 * @param {object} view The view instance
	 */
	constructor(model, view) {
		this.model = model;
		this.view = view;

		// Bind events to view actions
		// use of bind to set the context of this
		this.view.bind('newTodo', title => this.addItem(title));
		this.view.bind('itemEdit', item => this.editItem(item.id));
		this.view.bind('itemEditDone', item => this.editItemSave(item.id, item.title));
		this.view.bind('itemEditCancel', item => this.editItemCancel(item.id));
		this.view.bind('itemRemove', item => this.removeItem(item.id));
		this.view.bind('itemToggle', item => this.toggleComplete(item.id, item.completed));
		this.view.bind('removeCompleted', () => this.removeCompletedItems());
		this.view.bind('toggleAll', status => this.toggleAll(status.completed));
	}

	/**
	 * Sets the view based on the current location hash.
	 *
	 * @param {string} locationHash The current location hash
	 */
	setView(locationHash) {
		const route = locationHash.split('/')[1] || '';
		this._updateFilterState(route);
	}

	/**
	 * Displays all tasks.
	 */
	showAll() {
		this.model.read(data => {
			this.view.render('showEntries', data);
		});
	}

	/**
	 * Displays active tasks.
	 */
	showActive() {
		this.model.read({ completed: false }, data => {
			this.view.render('showEntries', data);
		});
	}

	/**
	 * Displays completed tasks.
	 */
	showCompleted() {
		this.model.read({ completed: true }, data => {
			this.view.render('showEntries', data);
		});
	}

	/**
	 * Adds a new item and updates the view.
	 *
	 * @param {string} title The title of the new item
	 */
	addItem(title) {
		if (title.trim() === '') {
			return;
		}

		this.model.create(title, () => {
			this.view.render('clearNewTodo');
			this._filter(true);
		});
	}

	/**
	 * Enters the item editing mode.
	 *
	 * @param {number} id The ID of the item to edit
	 */
	editItem(id) {
		this.model.read(id, data => {
			this.view.render('editItem', { id, title: data[0].title });
		});
	}

	/**
	 * Saves the edited item and updates the view.
	 *
	 * @param {number} id The ID of the item to save
	 * @param {string} title The new title of the item
	 */
	editItemSave(id, title) {
		title = title.trim();

		if (title) {
			this.model.update(id, { title }, () => {
				this.view.render('editItemDone', { id, title });
			});
		} else {
			this.removeItem(id);
		}
	}

	/**
	 * Cancels the item editing mode.
	 *
	 * @param {number} id The ID of the item to cancel editing
	 */
	editItemCancel(id) {
		this.model.read(id, data => {
			this.view.render('editItemDone', { id, title: data[0].title });
		});
	}

	/**
	 * Removes an item from the model and updates the view.
	 *
	 * @param {number} id The ID of the item to remove
	 */
	removeItem(id) {
		this.model.remove(id, () => {
			this.view.render('removeItem', id);
		});

		this._filter();
	}

	/**
	 * Removes all completed items from the model and updates the view.
	 */
	removeCompletedItems() {
		this.model.read({ completed: true }, data => {
			data.forEach(item => this.removeItem(item.id));
		});

		this._filter();
	}

	/**
	 * Toggles the completion state of an item.
	 *
	 * @param {number} id The ID of the item to toggle
	 * @param {boolean} completed The completion state to set
	 * @param {boolean} [silent=false] If true, does not re-filter the items
	 */
	toggleComplete(id, completed, silent = false) {
		this.model.update(id, { completed }, () => {
			this.view.render('elementComplete', { id, completed });
		});

		if (!silent) {
			this._filter();
		}
	}

	/**
	 * Toggles the completion state of all items.
	 *
	 * @param {boolean} completed The completion state to set for all items
	 */
	toggleAll(completed) {
		this.model.read({ completed: !completed }, data => {
			data.forEach(item => this.toggleComplete(item.id, completed, true));
		});

		this._filter();
	}

	/**
	 * Updates the count of active and completed todos.
	 * Private method used internally.
	 */
	_updateCount() {
		this.model.getCount(todos => {
			this.view.render('updateElementCount', todos.active);
			this.view.render('clearCompletedButton', {
				completed: todos.completed,
				visible: todos.completed > 0
			});

			this.view.render('toggleAll', { checked: todos.completed === todos.total });
			this.view.render('contentBlockVisibility', { visible: todos.total > 0 });
		});
	}

	/**
	 * Re-filters the todo items based on the active route.
	 * Private method used internally.
	 *
	 * @param {boolean} [force=false] If true, forces a re-painting of todo items
	 */
	_filter(force = false) {
		const activeRoute = this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);

		this._updateCount();

		if (force || this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {
			this['show' + activeRoute]();
		}

		this._lastActiveRoute = activeRoute;
	}

	/**
	 * Updates the filter state of the application.
	 * Private method used internally.
	 *
	 * @param {string} currentPage The current page to set as the active route
	 */
	_updateFilterState(currentPage) {
		this._activeRoute = currentPage || 'All';
		this._filter();
		this.view.render('setFilter', currentPage);
	}
}

// Export to window
window.app = window.app || {};
window.app.Controller = Controller;
