# should show entries on start-up

```javascript
describe('controller', function () {
	'use strict';

	...

	it('should show entries on start-up', function () {
		// TODO: write test
		var todo = { title: 'my todo' };
		setUpModel([todo]);
		// Method showAll is called to show all entries
		subject.showAll();
		// Method read is called to read all entries
		// if you pass a string or number it will look the id of the model to find
		expect(model.read).toHaveBeenCalled();
		// Method render is called to render all entries
		// in this case the command is showEntries
		expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
	});
	...
}
```
