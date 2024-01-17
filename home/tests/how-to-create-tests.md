# How to create tests

Tests can be created by defining a suite of tests and then a individual test case.

The suite of tests is defined by the keyword `describe` and the individual test case with the keyword `it.`

For example:

```javascript
describe("A suite", function() {
 it("contains spec with an expectation", function() {
   expect(true).toBe(true);
 });
});
```

In this example the `expect` is used to define the expected outcome



Other keywords and concepts.\
MVC (Model View Controller)\


```javascript
var subject, model, view;
```



Controller

The Subject variable represents the controller of the application.

In MVC architecture the Controller is responsible for handling the logic between the model and the view.\


Model&#x20;

The Model variable represents the model of the applicaiton&#x20;

In MVC architercure the model is responsible for managing the data and business logic of the application.&#x20;

In the test suite, spyOn and callFake are being used to replace the model's methods with simulated ones, in order to be able to realize the necessary tests.



View&#x20;

The view variable represents the view of the application.&#x20;

In MVC architecture, the view is responsible for displaying the data from the model to the user. In this test suite, the view is also being stubbed out with fake methods.



setUpModel and callFake

```javascript
var setUpModel = function (todos) {
		model.read.and.callFake(function (query, callback) {
			callback = callback || query;
			callback(todos);
		});
```

The `setUpModel` is used to set up a fake implementation for the `read` method of the `model` object. This is done using Jasmine's `and.callFake` function, that replaces the original method with a custom function.





Render

createSpy and createViewStub&#x20;

```javascript
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
```

createSpy enables the creation of a spy function that tracks its call details, including the arguments used and the returned value, allowing for detailed assertions about the function's usage in tests.



Model\
createSpyObj

```javascript
beforeEach(function () {
		model = jasmine.createSpyObj('model', ['read', 'getCount', 'remove', 'create', 'update']);
		view = createViewStub();
		subject = new app.Controller(model, view);
	});
```

Similar to createSpy but createSpyObj is used to create a spy object with multiple spy methods.

bind, trigger in createViewStub

```javascript
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
```

bind: Register Event Handlers

trigger: Execute Event Handlers



toHaveBeenCalled

Check if a spy function has been called at least once.



toHaveBeenCalledWith

Checks if a spy function has been called with specific arguments.



setView

Defined in controller.js the setView simulates changing the view or route in your application.

In the context of the tests, calling setView with a specific locationHash allows the testing of how the application behaves when the user navigates to a specific route.

```javascript
setView(locationHash) {
		const route = locationHash.split('/')[1];
		const page = route || '';
		this._updateFilterState(page);
	}
```

\
Related Article:\


{% content-ref url="../set-up-project/tests-jasmine/run-jasmine.md" %}
[run-jasmine.md](../set-up-project/tests-jasmine/run-jasmine.md)
{% endcontent-ref %}
