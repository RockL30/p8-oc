/*global app, jasmine, describe, it, beforeEach, expect */

describe('controller', function () {
	'use strict';

	var subject, model, view;

	var setUpModel = function (todos) {
		model.read.and.callFake(function (query, callback) {
			callback = callback || query;
			callback(todos);
		});

		model.getCount.and.callFake(function (callback) {

			var todoCounts = {
				active: todos.filter(function (todo) {
					return !todo.completed;
				}).length,
				completed: todos.filter(function (todo) {
					return !!todo.completed;
				}).length,
				total: todos.length
			};

			callback(todoCounts);
		});

		model.remove.and.callFake(function (id, callback) {
			callback();
		});

		model.create.and.callFake(function (title, callback) {
			callback();
		});

		model.update.and.callFake(function (id, updateData, callback) {
			callback();
		});
	};

	var createViewStub = function () {
		var eventRegistry = {};
		return {
			render: jasmine.createSpy('render'),
			bind: function (event, handler) {
				eventRegistry[event] = handler;
			},
			trigger: function (event, parameter) {
				eventRegistry[event](parameter);
			}
		};
	};

	beforeEach(function () {
		model = jasmine.createSpyObj('model', ['read', 'getCount', 'remove', 'create', 'update']);
		view = createViewStub();
		subject = new app.Controller(model, view);
	});

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
	describe('routing', function () {

		it('should show all entries without a route', function () {
			var todo = { title: 'my todo' };
			setUpModel([todo]);

			subject.setView('');

			expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
		});

		it('should show all entries without "all" route', function () {
			var todo = { title: 'my todo' };
			setUpModel([todo]);

			subject.setView('#/');

			expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
		});

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

	it('should show the content block when todos exists', function () {
		setUpModel([{ title: 'my todo', completed: true }]);

		subject.setView('');

		expect(view.render).toHaveBeenCalledWith('contentBlockVisibility', {
			visible: true
		});
	});

	it('should hide the content block when no todos exists', function () {
		setUpModel([]);

		subject.setView('');

		expect(view.render).toHaveBeenCalledWith('contentBlockVisibility', {
			visible: false
		});
	});

	it('should check the toggle all button, if all todos are completed', function () {
		setUpModel([{ title: 'my todo', completed: true }]);

		subject.setView('');

		expect(view.render).toHaveBeenCalledWith('toggleAll', {
			checked: true
		});
	});

	it('should set the "clear completed" button', function () {
		var todo = { id: 42, title: 'my todo', completed: true };
		setUpModel([todo]);

		subject.setView('');

		expect(view.render).toHaveBeenCalledWith('clearCompletedButton', {
			completed: 1,
			visible: true
		});
	});

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

	it('should highlight "Active" filter when switching to active view', function () {
		// TODO: write test
		var todos = [{ id: 1, title: 'Todo 1', completed: false },];
		setUpModel(todos);

		subject.setView('#/active');

		expect(view.render).toHaveBeenCalledWith('setFilter', 'active');
	});

	describe('toggle all', function () {
		// TODO: write test
		// does this functionality exist in the first place? anyway here's the test
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

		it('should add a new todo to the view', function () {
			setUpModel([]);

			subject.setView('');

			view.render.calls.reset();
			model.read.calls.reset();
			model.read.and.callFake(function (callback) {
				callback([{
					title: 'a new todo',
					completed: false
				}]);
			});

			view.trigger('newTodo', 'a new todo');

			expect(model.read).toHaveBeenCalled();

			expect(view.render).toHaveBeenCalledWith('showEntries', [{
				title: 'a new todo',
				completed: false
			}]);
		});

		it('should clear the input field when a new todo is added', function () {
			setUpModel([]);

			subject.setView('');

			view.trigger('newTodo', 'a new todo');

			expect(view.render).toHaveBeenCalledWith('clearNewTodo');
		});
	});

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

		it('should remove an entry from the view', function () {
			var todo = { id: 42, title: 'my todo', completed: true };
			setUpModel([todo]);

			subject.setView('');
			view.trigger('itemRemove', { id: 42 });

			expect(view.render).toHaveBeenCalledWith('removeItem', 42);
		});

		it('should update the element count', function () {
			var todo = { id: 42, title: 'my todo', completed: true };
			setUpModel([todo]);

			subject.setView('');
			view.trigger('itemRemove', { id: 42 });

			expect(view.render).toHaveBeenCalledWith('updateElementCount', 0);
		});
	});

	describe('remove completed', function () {
		it('should remove a completed entry from the model', function () {
			var todo = { id: 42, title: 'my todo', completed: true };
			setUpModel([todo]);

			subject.setView('');
			view.trigger('removeCompleted');

			expect(model.read).toHaveBeenCalledWith({ completed: true }, jasmine.any(Function));
			expect(model.remove).toHaveBeenCalledWith(42, jasmine.any(Function));
		});

		it('should remove a completed entry from the view', function () {
			var todo = { id: 42, title: 'my todo', completed: true };
			setUpModel([todo]);

			subject.setView('');
			view.trigger('removeCompleted');

			expect(view.render).toHaveBeenCalledWith('removeItem', 42);
		});
	});

	describe('element complete toggle', function () {
		it('should update the model', function () {
			var todo = { id: 21, title: 'my todo', completed: false };
			setUpModel([todo]);
			subject.setView('');

			view.trigger('itemToggle', { id: 21, completed: true });

			expect(model.update).toHaveBeenCalledWith(21, { completed: true }, jasmine.any(Function));
		});

		it('should update the view', function () {
			var todo = { id: 42, title: 'my todo', completed: true };
			setUpModel([todo]);
			subject.setView('');

			view.trigger('itemToggle', { id: 42, completed: false });

			expect(view.render).toHaveBeenCalledWith('elementComplete', { id: 42, completed: false });
		});
	});

	describe('edit item', function () {
		it('should switch to edit mode', function () {
			var todo = { id: 21, title: 'my todo', completed: false };
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemEdit', { id: 21 });

			expect(view.render).toHaveBeenCalledWith('editItem', { id: 21, title: 'my todo' });
		});

		it('should leave edit mode on done', function () {
			var todo = { id: 21, title: 'my todo', completed: false };
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemEditDone', { id: 21, title: 'new title' });

			expect(view.render).toHaveBeenCalledWith('editItemDone', { id: 21, title: 'new title' });
		});

		it('should persist the changes on done', function () {
			var todo = { id: 21, title: 'my todo', completed: false };
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemEditDone', { id: 21, title: 'new title' });

			expect(model.update).toHaveBeenCalledWith(21, { title: 'new title' }, jasmine.any(Function));
		});

		it('should remove the element from the model when persisting an empty title', function () {
			var todo = { id: 21, title: 'my todo', completed: false };
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemEditDone', { id: 21, title: '' });

			expect(model.remove).toHaveBeenCalledWith(21, jasmine.any(Function));
		});

		it('should remove the element from the view when persisting an empty title', function () {
			var todo = { id: 21, title: 'my todo', completed: false };
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemEditDone', { id: 21, title: '' });

			expect(view.render).toHaveBeenCalledWith('removeItem', 21);
		});

		it('should leave edit mode on cancel', function () {
			var todo = { id: 21, title: 'my todo', completed: false };
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemEditCancel', { id: 21 });

			expect(view.render).toHaveBeenCalledWith('editItemDone', { id: 21, title: 'my todo' });
		});

		it('should not persist the changes on cancel', function () {
			var todo = { id: 21, title: 'my todo', completed: false };
			setUpModel([todo]);

			subject.setView('');

			view.trigger('itemEditCancel', { id: 21 });

			expect(model.update).not.toHaveBeenCalled();
		});
	});
});
