# ES6

Updated code to ES6:

* app.js
* controller.js
* helper.js
* store.js
* template.js
* view.js

With ES6, the code is now easier to write, read and maintain with:

* **Class**: Cleaner and more concise syntax for creating constructors and defining methods.
* **this**: Arrow functions capture the this context of the enclosing scope, which eliminates the need for var self = this.
* **Inheritance**, we are not extending any class, but ES6 allows the project easier to maintain in the future
*   **Method Definitinons**: Methods make the functions easier to read by allowing us to avoid writing&#x20;

    ```javascript
    Controller.prototype.methodName = function () {...}
    ```

    for each method.
* Set **Default Parameters** directly in the method, ex:
  *   Before:

      ```javascript
      	Model.prototype.create = function (title, callback) {
      		title = title || '';
      		callback = callback || function () {};

      		var newItem = {
      			title: title.trim(),
      			completed: false
      		};

      		this.storage.save(newItem, callback);
      	};
      ```
  *   After:

      ```javascript
      	create(title = '', callback = () => { }) {
      		var newItem = {
      			title: title.trim(),
      			completed: false
      		};

      		this.storage.save(newItem, callback);
      	}
      ```
* Variable Declarations
  * Replaced var with let for variable declaration, since let has block scope.
  * Replaced var with const to declare constants, meaning a value that cannot be changed once it's assigned. (**Quick Note**: const does not mean that the value is immutable, it just means that the value is reassigned, i.e. if a const variable holds an object, the properties of that object can still be modified.)
* Equality Comparision
  * In the ES6 version we use strict equality comparison, what this means is that we are also checking the type as well as the value, this helps to prevent unexpected results due to Javascript type coercion rules.
  * Type Coercion refers to the automatic conversion of values from one data type to another during comparisons or operations which can sometimes lead to unexpected results.
* Template Literals
  * &#x20;Template literals allow us to create strings that include variables or expressions, this can be done by wrapping these strings in backticks ( ) and putting the variables or expressions inside `${}`. This way, it's possible to mix text and code together, making the code easier to understand and manage.
* Event Binding
  * Arrow Functions automatically bind the this value to the view instance
  * Easier to read
* Switch Case
  * Replaced the long if/else statement with a Switch Case



