# should highlight "All" filter by default when todos are present

```javascript
describe('controller', function () {
	'use strict';

	var subject, model, view;
	...
	it('should highlight "All" filter by default when todos are present', function () {
		// TODO: write test
		// mock model with a single todo
		var todos = [
			{ id: 1, title: 'Todo 1', completed: false },
			{ id: 2, title: 'Todo 2', completed: true }
		];
		// call setUpModel with the mock model
		setUpModel(todos);
		// set the view to empty string
		subject.setView('');
		// expect the view to render the setFilter command with an empty string
		expect(view.render).toHaveBeenCalledWith('setFilter', '');
	});
	...
}
```
