# should toggle all todos to completed

```javascript
describe('toggle all', function () {
		// TODO: write test
		it('should toggle all todos to completed', function () {
			// mock model with 3 todos
			var todos = [
				{ id: 1, title: 'Todo 1', completed: false },
				{ id: 2, title: 'Todo 2', completed: false },
				{ id: 3, title: 'Todo 3', completed: false }
			];
			// call setUpModel with the mock model
			setUpModel(todos);
			// Set the view to a valid route
			subject.setView('#/');
			// call toggleAll with completed: true
			view.trigger('toggleAll', { completed: true });

			// Check if model.update is called for each todo item
			todos.forEach(function (todo) {
				expect(model.update).toHaveBeenCalledWith(todo.id, { completed: true }, jasmine.any(Function));
			});
		});
		...
	});
```
