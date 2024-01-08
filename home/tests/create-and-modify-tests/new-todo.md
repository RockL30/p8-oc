# new todo

```javascript
	describe('new todo', function () {
		it('should add a new todo to the model', function () {
			// TODO: write test
			// set up model with an empty array
			setUpModel([]);
			// set the view to an empty string
			subject.setView('');
			// trigger the newTodo event with a new todo
			view.trigger('newTodo', 'a new todo');
			// expect the model to create a new todo
			expect(model.create).toHaveBeenCalledWith('a new todo', jasmine.any(Function));
		});
		...
	});
```
