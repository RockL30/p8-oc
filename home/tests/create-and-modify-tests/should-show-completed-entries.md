# should show completed entries

```javascript
describe('routing', function () {

		...

		it('should show completed entries', function () {
			// TODO: write test
			var todo = { title: 'my todo', completed: true };
			setUpModel([todo]);
			// showCompleted is called to show completed entries
			subject.showCompleted();
			// Method read is called to read all entries
			// if you pass a string or number it will look the id of the model to find
			// in this case the query is completed: true
			expect(model.read).toHaveBeenCalledWith({ completed: true }, jasmine.any(Function));
			// Method render is called to render all entries
			// in this case the command is showEntries
			expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
		});
	});
```
