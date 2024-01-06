"use strict";

// Define HTML escapes
const htmlEscapes = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	'\'': '&#x27;',
	'`': '&#x60;'
};

// Function to escape HTML characters
const escapeHtmlChar = chr => htmlEscapes[chr];

// Regular expression to match unescaped HTML characters
const reUnescapedHtml = /[&<>"'`]/g;
const reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);

// Function to escape a string
const escape = string => (string && reHasUnescapedHtml.test(string))
	? string.replace(reUnescapedHtml, escapeHtmlChar)
	: string;

class Template {
	constructor() {
		// Default template for a to-do item
		this.defaultTemplate
			= '<li data-id="{{id}}" class="{{completed}}">'
			+ '<div class="view">'
			+ '<input class="toggle" type="checkbox" {{checked}}>'
			+ '<label>{{title}}</label>'
			+ '<button class="destroy"></button>'
			+ '</div>'
			+ '</li>';
	}

	show(data) {
		let view = '';

		for (let i = 0, l = data.length; i < l; i++) {
			let template = this.defaultTemplate;
			let completed = '';
			let checked = '';

			// Check if the to-do item is completed
			if (data[i].completed) {
				completed = 'completed';
				checked = 'checked';
			}

			// Replace placeholders in the template with actual values
			template = template.replace('{{id}}', data[i].id);
			template = template.replace('{{title}}', escape(data[i].title));
			template = template.replace('{{completed}}', completed);
			template = template.replace('{{checked}}', checked);

			// Append the generated HTML string to the view
			view += template;
		}

		return view;
	}

	itemCounter(activeTodos) {
		const plural = activeTodos === 1 ? '' : 's';

		return `<strong>${activeTodos}</strong> item${plural} left`;
	}

	clearCompletedButton(completedTodos) {
		return completedTodos > 0 ? 'Clear completed' : '';
	}
}

// Export to window
window.app = window.app || {};
window.app.Template = Template;