(function (window) {
	'use strict';

	class View {
		constructor(template) {
			this.template = template;

			this.ENTER_KEY = 13;
			this.ESCAPE_KEY = 27;

			this.$todoList = qs('.todo-list');
			this.$todoItemCounter = qs('.todo-count');
			this.$clearCompleted = qs('.clear-completed');
			this.$main = qs('.main');
			this.$footer = qs('.footer');
			this.$toggleAll = qs('.toggle-all');
			this.$newTodo = qs('.new-todo');
		}

		_removeItem(id) {
			const elem = qs(`[data-id="${id}"]`);
			if (elem) {
				this.$todoList.removeChild(elem);
			}
		}

		_clearCompletedButton(completedCount, visible) {
			this.$clearCompleted.innerHTML = this.template.clearCompletedButton(completedCount);
			this.$clearCompleted.style.display = visible ? 'block' : 'none';
		}

		_setFilter(currentPage) {
			qs('.filters .selected').className = '';
			qs(`.filters [href="#/${currentPage}"]`).className = 'selected';
		}

		_elementComplete(id, completed) {
			const listItem = qs(`[data-id="${id}"]`);
			if (!listItem) return;

			listItem.className = completed ? 'completed' : '';
			qs('input', listItem).checked = completed;
		}

		_editItem(id, title) {
			const listItem = qs(`[data-id="${id}"]`);
			if (!listItem) return;

			listItem.className += ' editing';

			const input = document.createElement('input');
			input.className = 'edit';
			input.value = title;

			listItem.appendChild(input);
			input.focus();
		}

		_editItemDone(id, title) {
			const listItem = qs(`[data-id="${id}"]`);
			if (!listItem) return;

			const input = qs('input.edit', listItem);
			listItem.removeChild(input);

			listItem.className = listItem.className.replace('editing', '');
			qsa('label', listItem).forEach(label => label.textContent = title);
		}

		render(viewCmd, parameter) {
			const viewCommands = {
				showEntries: () => this.$todoList.innerHTML = this.template.show(parameter),
				removeItem: () => this._removeItem(parameter),
				updateElementCount: () => this.$todoItemCounter.innerHTML = this.template.itemCounter(parameter),
				clearCompletedButton: () => this._clearCompletedButton(parameter.completed, parameter.visible),
				contentBlockVisibility: () => {
					this.$main.style.display = this.$footer.style.display = parameter.visible ? 'block' : 'none';
				},
				toggleAll: () => this.$toggleAll.checked = parameter.checked,
				setFilter: () => this._setFilter(parameter),
				clearNewTodo: () => this.$newTodo.value = '',
				elementComplete: () => this._elementComplete(parameter.id, parameter.completed),
				editItem: () => this._editItem(parameter.id, parameter.title),
				editItemDone: () => this._editItemDone(parameter.id, parameter.title)
			};

			viewCommands[viewCmd]();
		}

		_itemId(element) {
			const li = $parent(element, 'li');
			return parseInt(li.dataset.id, 10);
		}

		_bindItemEditDone(handler) {
			$delegate(this.$todoList, 'li .edit', 'blur', event => {
				if (!event.target.dataset.iscanceled) {
					handler({ id: this._itemId(event.target), title: event.target.value });
				}
			});

			$delegate(this.$todoList, 'li .edit', 'keypress', event => {
				if (event.keyCode === this.ENTER_KEY) {
					event.target.blur();
				}
			});
		}

		_bindItemEditCancel(handler) {
			$delegate(this.$todoList, 'li .edit', 'keyup', event => {
				if (event.keyCode === this.ESCAPE_KEY) {
					event.target.dataset.iscanceled = true;
					event.target.blur();

					handler({ id: this._itemId(event.target) });
				}
			});
		}

		bind(event, handler) {
			const eventBindings = {
				newTodo: () => $on(this.$newTodo, 'change', () => handler(this.$newTodo.value)),
				removeCompleted: () => $on(this.$clearCompleted, 'click', () => handler()),
				toggleAll: () => $on(this.$toggleAll, 'click', () => handler({ completed: this.$toggleAll.checked })),
				itemEdit: () => $delegate(this.$todoList, 'li label', 'dblclick', event => {
					handler({ id: this._itemId(event.target) });
				}),
				itemRemove: () => $delegate(this.$todoList, '.destroy', 'click', event => {
					handler({ id: this._itemId(event.target) });
				}),
				itemToggle: () => $delegate(this.$todoList, '.toggle', 'click', event => {
					handler({ id: this._itemId(event.target), completed: event.target.checked });
				}),
				itemEditDone: () => this._bindItemEditDone(handler),
				itemEditCancel: () => this._bindItemEditCancel(handler)
			};

			eventBindings[event]();
		}
	}

	window.app = window.app || {};
	window.app.View = View;
}(window));
