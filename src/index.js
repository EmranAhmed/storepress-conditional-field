/**
 * External dependencies
 */
import {
	createPluginInstance,
	triggerEvent,
	getPluginInstance,
} from '@storepress/utils';

/**
 * Internal dependencies
 */
import { Plugin } from './Plugin';

export default function StorePressConditionalFieldPlugin() {
	const StorePressConditionalField = {
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
					StorePressConditionalField.initWith(el, settings);
				}
			} else {
				StorePressConditionalField.initWith(element, settings);
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
					StorePressConditionalField.destroyWith(el);
				}
			} else {
				StorePressConditionalField.destroyWith(element);
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
					StorePressConditionalField.reInitWith(el, settings);
				}
			} else {
				StorePressConditionalField.reInitWith(element, settings);
			}
		},
		{ passive: true }
	);
}

document.addEventListener('DOMContentLoaded', () => {
	StorePressConditionalFieldPlugin();
	triggerEvent(document, 'storepress_conditional_field_init', {
		element: ['[data-storepress-conditional-field]'],
		settings: {},
	});
});
