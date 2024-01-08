# should update the view

```javascript
describe('toggle all', function () {
		...
		it('should update the view', function () {
			// TODO: write test
			// mock model with 3 todos
			var todos = [
				{ id: 1, title: 'Todo 1', completed: false },
				{ id: 2, title: 'Todo 2', completed: false },
				{ id: 3, title: 'Todo 3', completed: false }
			];
			// call setUpModel with the mock model
			setUpModel(todos);

			// Set the view to a valid route
			subject.setView('#/'); // This should set _activeRoute to 'All'

			// Trigger the toggle all event
			view.trigger('toggleAll', { completed: true });

			// Check if view has been updated for each todo
			todos.forEach(function (todo) {
				expect(view.render).toHaveBeenCalledWith('elementComplete', { id: todo.id, completed: true });
			});
		});
	});
```
