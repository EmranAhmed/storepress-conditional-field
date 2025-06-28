/**
 * External dependencies
 */
import {
	createPluginInstance,
	triggerEvent,
	getPluginInstance,
	waitAsync,
} from '@storepress/utils';

/**
 * Internal dependencies
 */
import { Plugin } from './Plugin';

function StorePressConditionalField() {
	const ConditionalField = {
		getInstance(element, options) {
			return createPluginInstance(element, options, Plugin);
		},

		getPluginInstance(element) {
			return getPluginInstance(element);
		},

		initWith($selector, options) {
			const instance = this.getInstance($selector, options);

			for (const { element, reset } of instance) {
				element.addEventListener('destroy', reset);
			}

			return instance;
		},

		destroyWith($selector) {
			const instance = this.getPluginInstance($selector);
			for (const { destroy } of instance) {
				destroy();
			}
		},

		reInitWith($selector, options) {
			this.destroyWith($selector);
			this.initWith($selector, options);
		},
	};

	// Init.
	document.addEventListener(
		'storepress_conditional_field_init',
		(event) => {
			const defaultSettings = {};
			const settings = { ...defaultSettings, ...event.detail?.settings };
			const element = event.detail?.element;

			if (Array.isArray(element)) {
				for (const el of element) {
					ConditionalField.initWith(el, settings);
				}
			} else {
				ConditionalField.initWith(element, settings);
			}
		},
		{ passive: true }
	);

	// Destroy
	document.addEventListener(
		'storepress_conditional_field_destroy',
		(event) => {
			const element = event.detail?.element;

			if (Array.isArray(element)) {
				for (const el of element) {
					ConditionalField.destroyWith(el);
				}
			} else {
				ConditionalField.destroyWith(element);
			}
		},
		{ passive: true }
	);

	// Slider ReInit.
	document.addEventListener(
		'storepress_conditional_field_re_init',
		(event) => {
			const defaultSettings = {};
			const settings = { ...defaultSettings, ...event.detail?.settings };
			const element = event.detail?.element;

			if (Array.isArray(element)) {
				for (const el of element) {
					ConditionalField.reInitWith(el, settings);
				}
			} else {
				ConditionalField.reInitWith(element, settings);
			}
		},
		{ passive: true }
	);
}

document.addEventListener('DOMContentLoaded', () => {
	StorePressConditionalField();

	//await waitAsync(1000);

	triggerEvent(document, 'storepress_conditional_field_init', {
		element: ['[data-storepress-conditional-field]'],
		settings: {},
	});
});

export default StorePressConditionalField;
