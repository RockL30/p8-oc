# should highlight "Active" filter when switching to active view

```javascript
describe('controller', function () {
	'use strict';

	var subject, model, view;	
	...
	it('should highlight "Active" filter when switching to active view', function () {
		// TODO: write test
		var todos = [{ id: 1, title: 'Todo 1', completed: false },];
		setUpModel(todos);

		subject.setView('#/active');

		expect(view.render).toHaveBeenCalledWith('setFilter', 'active');
	});
	...
}
```
