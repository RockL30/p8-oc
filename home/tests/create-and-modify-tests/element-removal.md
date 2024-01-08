# element removal

```javascript
describe('element removal', function () {
		it('should remove an entry from the model', function () {
			// TODO: write test
			// mock model with a single todo
			var todo = { id: 42, title: 'my todo', completed: true };
			// set up model with the mock model
			setUpModel([todo]);
			// set the view to an empty string
			subject.setView('');
			// trigger the itemRemove event with the id of the todo
			view.trigger('itemRemove', { id: 42 });

			expect(model.remove).toHaveBeenCalledWith(42, jasmine.any(Function));
		});
		...
}
```
