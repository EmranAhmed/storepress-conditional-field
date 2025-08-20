/**
 * External dependencies
 */
import { createStorePressPlugin } from '@storepress/utils';

/**
 * Internal dependencies
 */
import { Plugin } from './Plugin';

const StorePressConditionalField = createStorePressPlugin( {
	selector: '[data-storepress-conditional-field]',
	options: {},
	plugin: Plugin,
	namespace: 'Conditional',
} );

StorePressConditionalField.setup();

export default StorePressConditionalField;
