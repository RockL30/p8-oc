(function (window) {
	'use strict';

	const htmlEscapes = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'\'': '&#x27;',
		'`': '&#x60;'
	};

	const reUnescapedHtml = /[&<>"'`]/g;

	const escape = string => string.replace(reUnescapedHtml, chr => htmlEscapes[chr]);

	class Template {
		constructor() {
			this.defaultTemplate
				= `<li data-id="{{id}}" class="{{completed}}">
                       <div class="view">
                           <input class="toggle" type="checkbox" {{checked}}>
                           <label>{{title}}</label>
                           <button class="destroy"></button>
                       </div>
                   </li>`;
		}

		show(data) {
			return data.map(item => {
				let completed = item.completed ? 'completed' : '';
				let checked = item.completed ? 'checked' : '';

				return this.defaultTemplate
					.replace('{{id}}', item.id)
					.replace('{{title}}', escape(item.title))
					.replace('{{completed}}', completed)
					.replace('{{checked}}', checked);
			}).join('');
		}

		itemCounter(activeTodos) {
			let plural = activeTodos === 1 ? '' : 's';
			return `<strong>${activeTodos}</strong> item${plural} left`;
		}

		clearCompletedButton(completedTodos) {
			return completedTodos > 0 ? 'Clear completed' : '';
		}
	}

	window.app = window.app || {};
	window.app.Template = Template;
})(window);
