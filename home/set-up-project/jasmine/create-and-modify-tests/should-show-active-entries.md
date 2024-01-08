# should show active entries

```javascript
describe('routing', function () {
		...
		it('should show active entries', function () {
			// TODO: write test
			var todo = { title: 'my todo', completed: false };
			setUpModel([todo]);
			// showActive is called to show active entries
			subject.showActive();
			// Method read is called to read all entries
			// if you pass a string or number it will look the id of the model to find
			// in this case the query is completed: false
			expect(model.read).toHaveBeenCalledWith({ completed: false }, jasmine.any(Function));
			// Method render is called to render all entries
			// in this case the command is showEntries
			expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
		});
		...
	});
```
