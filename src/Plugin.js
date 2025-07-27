/**
 * External dependencies
 */
import { getOptionsFromAttribute } from '@storepress/utils';

/**
 * Initializes the conditional field logic for a given element.
 *
 * @param {HTMLElement} element The DOM element to which the conditional logic is applied. This element will be shown or hidden (using the 'inert' attribute) based on the conditions.
 * @param {Object}      options Configuration options for the plugin, which can be overridden by data attributes on the element.
 * @return {{reset: function(): void}} An object containing public methods to control the plugin instance, such as `reset`.
 */
export function Plugin( element, options ) {
	const PRIVATE = {};

	// Collecting settings from html attributes.
	const ATTRIBUTE = 'storepress-conditional-field'; // data-storepress-conditional-field

	const OPERATORS = {
		COMPARE_OPERATOR: {
			KEY: 'compare',
			DEFAULT: 'EQ',
			AVAILABLE: {
				// ONLY IF VALUE TYPE NUMBER, CHECK BY LENGTH.
				EQ: [ 'EQUAL', '=', 'EQ', 'SAME' ],
				GT: [ 'GREATER THAN', '>', 'GT' ],
				LT: [ 'LESS THAN', '<', 'LT' ],
				GTEQ: [ 'GREATER THAN OR EQUAL', '>=', 'GTEQ' ],
				LTEQ: [ 'LESS THAN OR EQUAL', '<=', 'LTEQ' ],
				// Only for string and string-array
				INCLUDES: [ 'HAS', 'INCLUDES', 'CONTAINS', 'IN', 'LIKE' ],
			},
		},

		// TEXT, NUMBER, RANGE, CHECKBOX, RADIO, SELECT-ONE, SELECT-MULTIPLE

		// Value Type
		// STRING: {"selector":"#InputRange", "value":"string", "inert":true} 				// input value === value
		// STRING-ARRAY: {"selector":"#InputRange", "value":["X", "Y"], "strict": true}  	// input value IN values
		// NUMBER: {"selector":"#InputRange", "value":100}  								// input value length
		// NUMBER-ARRAY: {"selector":"#InputRange", "value":[50, 100, 300]} 				// input value length IN values
		// BOOLEAN: {"selector":"#InputRange", "value":true}				 				// input value not blank or check length > 0
		// MINMAX: {"selector":"#InputRange", "value":[10, 20], "type":"MINMAX"} 			// input value length MIN and MAX values
		// MINMAX: {"selector":"#InputRange", "value":[10, 20], "type":"RANGE"} 			// input value MIN < VALUE and VALUE > MAX
		// ELEMENT: {"selector":"#InputRange", "value":"#other-input", "type":"ELEMENT"} 	// input value === value element value
		// REGEXP: {"selector":"#InputRange", "value":"/[\w.-]+@[\w.-]+\.\w+/g"}  			// input value match regexp

		TYPE_OPERATOR: {
			KEY: 'type',
			DEFAULT: 'BOOLEAN', // If no value specified.
			AVAILABLE: [
				'STRING',
				'STRING-ARRAY',
				'NUMBER',
				'NUMBER-ARRAY',
				'BOOLEAN',
				'RANGE', // Should Define Explicitly. for number and range type only. [10, 20] = {start: 10, end: 20}
				'MINMAX', // Should Define Explicitly. check min length and max length [10, 20] = {min: 10, max: 20}
				'ELEMENT', // Should Define Explicitly.
				'REGEXP',
			],
		},

		FUNCTIONS_FOR_TYPE: {
			BOOLEAN: 'EXISTS', // check by length.
			STRING: 'STRING', // check by value.
			'STRING-ARRAY': 'STRING-ARRAY', // check by value.
			NUMBER: 'NUMBER', // check by length.
			'NUMBER-ARRAY': 'NUMBER-ARRAY', // check by length.
			ELEMENT: 'ELEMENT', // Get from Explicitly defined. Check by check value.
			MINMAX: 'MINMAX', // Get from Explicitly defined. Check by length. minLength, maxLength
			RANGE: 'RANGE', // Get from Explicitly defined. Check by value. for Number and Range Input.
			REGEXP: 'REGEXP', // Check by value.
		},

		RELATION_OPERATOR: {
			DEFAULT: 'AND',
			KEY: 'relation',
			AVAILABLE: [ 'AND', 'OR', 'NOT', 'XOR' ],
		},

		SELECTOR_OPERATOR: {
			KEY: 'selector',
		},

		VALUE_OPERATOR: {
			KEY: 'value',
			DEFAULT: true,
		},

		// inert: true = hide, inert: false = show
		INERT_OPERATOR: {
			KEY: 'inert',
			DEFAULT: false,
		},
		// strict: boolean. Will apply for only for SELECT-MULTIPLE and CHECKBOX values.
		// Check ALL value available case in-sensitive.
		STRICT_OPERATOR: {
			KEY: 'strict',
			DEFAULT: false,
		},
		// Check Case Sensitivity.
		CASE_SENSITIVITY_OPERATOR: {
			KEY: 'case',
			DEFAULT: false,
		},

		// Only for type="ELEMENT"
		ELEMENT_CHECK_FN: {
			KEY: 'check',
			DEFAULT: 'STRING',
			AVAILABLE: [
				'STRING',
				'STRING-ARRAY',
				'NUMBER',
				'NUMBER-ARRAY',
				'RANGE',
				'MINMAX',
				'VISIBLE',
			],
		},

		// require: boolean. if strict = false Will apply for only SELECT-MULTIPLE and CHECKBOX values to check ALL or ANY Values.
		// Only for STRING-ARRAY Type.
		// "require" operator will always false if strict = true.
		REQUIRE_OPERATOR: {
			KEY: 'require',
			DEFAULT: false,
		},

		FN_OPERATOR: {
			KEY: 'fn',
		},

		EVENTS: [ 'input' ],
	};

	// Default Settings
	const DEFAULTS = {
		relation: OPERATORS.RELATION_OPERATOR.DEFAULT,
	};

	/**
	 * Gets the internal function name corresponding to a given condition type.
	 *
	 * @param {string} type The condition type (e.g., 'STRING', 'NUMBER').
	 * @return {string} The name of the comparison function.
	 */
	const getFnNameByType = ( type ) => {
		return OPERATORS.FUNCTIONS_FOR_TYPE[ type ];
	};

	/**
	 * Gets the key for the selector operator.
	 *
	 * @return {string} The operator key.
	 */
	const getSelectorOperatorKey = () => {
		return OPERATORS.SELECTOR_OPERATOR.KEY;
	};

	/**
	 * Gets the key for the case sensitivity operator.
	 *
	 * @return {string} The operator key.
	 */
	const getCaseOperatorKey = () => {
		return OPERATORS.CASE_SENSITIVITY_OPERATOR.KEY;
	};

	/**
	 * Gets the key for the element "check" function operator.
	 *
	 * @return {string} The operator key.
	 */
	const getCheckOperatorKey = () => {
		return OPERATORS.ELEMENT_CHECK_FN.KEY;
	};

	/**
	 * Gets the key for the "fn" operator.
	 *
	 * @return {string} The operator key.
	 */
	const getFnOperatorKey = () => {
		return OPERATORS.FN_OPERATOR.KEY;
	};

	/**
	 * Gets the key for the "value" operator.
	 *
	 * @return {string} The operator key.
	 */
	const getValueOperatorKey = () => {
		return OPERATORS.VALUE_OPERATOR.KEY;
	};

	/**
	 * Gets the key for the "require" operator.
	 *
	 * @return {string} The operator key.
	 */
	const getRequireOperatorKey = () => {
		return OPERATORS.REQUIRE_OPERATOR.KEY;
	};

	/**
	 * Gets the default value for the "require" operator.
	 *
	 * @return {boolean} The default value.
	 */
	const getRequireOperatorDefault = () => {
		return OPERATORS.REQUIRE_OPERATOR.DEFAULT;
	};

	/**
	 * Gets the default value for the "value" operator.
	 *
	 * @return {boolean} The default value.
	 */
	const getValueOperatorDefault = () => {
		return OPERATORS.VALUE_OPERATOR.DEFAULT;
	};

	/**
	 * Gets the default value for the "case" sensitivity operator.
	 *
	 * @return {boolean} The default value.
	 */
	const getCaseOperatorDefault = () => {
		return OPERATORS.CASE_SENSITIVITY_OPERATOR.DEFAULT;
	};

	/**
	 * Gets the default value for the element "check" function operator.
	 *
	 * @return {string} The default value.
	 */
	const getCheckOperatorDefault = () => {
		return OPERATORS.ELEMENT_CHECK_FN.DEFAULT;
	};

	/**
	 * Gets the list of available element "check" operators.
	 *
	 * @return {string[]} The list of available operators.
	 */
	const getAvailableCheckOperators = () => {
		return OPERATORS.ELEMENT_CHECK_FN.AVAILABLE;
	};

	/**
	 * Gets the key for the "type" operator.
	 *
	 * @return {string} The operator key.
	 */
	const getTypeOperatorKey = () => {
		return OPERATORS.TYPE_OPERATOR.KEY;
	};

	/**
	 * Gets the default value for the "type" operator.
	 *
	 * @return {string} The default value.
	 */
	const getTypeOperatorDefault = () => {
		return OPERATORS.TYPE_OPERATOR.DEFAULT;
	};

	/**
	 * Gets the key for the "inert" operator.
	 *
	 * @return {string} The operator key.
	 */
	const getInertOperatorKey = () => {
		return OPERATORS.INERT_OPERATOR.KEY;
	};

	/**
	 * Gets the default value for the "inert" operator.
	 *
	 * @return {boolean} The default value.
	 */
	const getInertOperatorDefault = () => {
		return OPERATORS.INERT_OPERATOR.DEFAULT;
	};

	/**
	 * Gets the key for the "strict" operator.
	 *
	 * @return {string} The operator key.
	 */
	const getStrictOperatorKey = () => {
		return OPERATORS.STRICT_OPERATOR.KEY;
	};

	/**
	 * Gets the default value for the "strict" operator.
	 *
	 * @return {boolean} The default value.
	 */
	const getStrictOperatorDefault = () => {
		return OPERATORS.STRICT_OPERATOR.DEFAULT;
	};

	/**
	 * Gets the key for the "compare" operator.
	 *
	 * @return {string} The operator key.
	 */
	const getCompareOperatorKey = () => {
		return OPERATORS.COMPARE_OPERATOR.KEY;
	};

	/**
	 * Gets the default value for the "compare" operator.
	 *
	 * @return {string} The default value.
	 */
	const getCompareOperatorDefault = () => {
		return OPERATORS.COMPARE_OPERATOR.DEFAULT;
	};

	/**
	 * Gets the function name from a condition object.
	 *
	 * @param {Object} condition The condition object.
	 * @return {string} The function name.
	 */
	const getConditionFn = ( condition ) => {
		return condition[ getFnOperatorKey() ];
	};

	/**
	 * Gets the "require" value from a condition object.
	 *
	 * @param {Object} condition The condition object.
	 * @return {boolean} The require value.
	 */
	const getConditionRequire = ( condition ) => {
		return condition[ getRequireOperatorKey() ];
	};

	const setConditionRequire = ( condition, value ) => {
		condition[ getRequireOperatorKey() ] = value;
	};

	const setConditionFn = ( condition, value ) => {
		condition[ getFnOperatorKey() ] = value;
	};

	const getConditionSelector = ( condition ) => {
		return condition[ getSelectorOperatorKey() ];
	};

	const getConditionCase = ( condition ) => {
		return condition[ getCaseOperatorKey() ];
	};

	const getConditionCheck = ( condition ) => {
		return condition[ getCheckOperatorKey() ];
	};

	const setConditionCheck = ( condition, value ) => {
		condition[ getCheckOperatorKey() ] = value;
	};

	const setConditionCase = ( condition, value ) => {
		condition[ getCaseOperatorKey() ] = value;
	};

	const getConditionValue = ( condition ) => {
		return condition[ getValueOperatorKey() ];
	};

	const setConditionValue = ( condition, value ) => {
		condition[ getValueOperatorKey() ] = value;
	};

	const getConditionType = ( condition ) => {
		return condition[ getTypeOperatorKey() ];
	};

	const setConditionType = ( condition, value ) => {
		condition[ getTypeOperatorKey() ] = value;
	};

	const getConditionInert = ( condition ) => {
		return condition[ getInertOperatorKey() ];
	};

	const setConditionInert = ( condition, value ) => {
		condition[ getInertOperatorKey() ] = value;
	};

	const getConditionCompare = ( condition ) => {
		const key = condition[ getCompareOperatorKey() ];

		return Object.keys( OPERATORS.COMPARE_OPERATOR.AVAILABLE ).find(
			( index ) =>
				OPERATORS.COMPARE_OPERATOR.AVAILABLE[ index ].includes( key )
		);
	};

	const setConditionCompare = ( condition, value ) => {
		condition[ getCompareOperatorKey() ] = value;
	};

	const getConditionStrict = ( condition ) => {
		return condition[ getStrictOperatorKey() ];
	};

	const setConditionStrict = ( condition, value ) => {
		condition[ getStrictOperatorKey() ] = value;
	};

	/**
	 * Gets the `type` attribute of an input element in uppercase.
	 *
	 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} $selector The input element.
	 * @return {string} The uppercase type of the input (e.g., 'TEXT', 'CHECKBOX').
	 */
	const getInputType = ( $selector ) => {
		return $selector.type.toUpperCase();
	};

	const isNumberValueInputType = ( $selector ) => {
		return [ 'RANGE', 'NUMBER' ].includes( getInputType( $selector ) );
	};

	/**
	 * Analyzes a NodeList of form elements to extract their values, counts, and other metadata,
	 * correctly handling grouped inputs like radio buttons and checkboxes.
	 *
	 * @param {*}      $selectors The NodeList of elements to analyze.
	 * @param {string} selectors  The original CSS selector string used to find the elements.
	 * @return {{inputs: string[], values: (string|string[])[], count: number, empty: boolean, notEmpty: boolean, map: object[]}}
	 * An object containing aggregated data about the selectors' state.
	 */
	const analyzeSelectors = ( $selectors, selectors ) => {
		const inputs = [];
		const values = [];
		let count = 0;
		const exists = [];
		const sls = selectors.split( ',' );
		const map = [];

		const radioGroup = new Set();
		const checkboxGroup = new Set();

		$selectors.forEach( ( $selector ) => {
			const type = getInputType( $selector );

			const name = $selector.name;

			const group = sls.find( ( selector ) => {
				return $selector.matches( selector );
			} );

			const specialTypes = [ 'SELECT-MULTIPLE', 'CHECKBOX', 'RADIO' ];

			// MultiSelect.
			if ( type === 'SELECT-MULTIPLE' ) {
				const selectValues = Array.from( $selector.selectedOptions )
					.filter( ( option ) => option.value.length > 0 )
					.map( ( option ) => option.value );
				values.push( ...selectValues );
				inputs.push( `INPUT:${ type }` );
				exists.push( selectValues.length > 0 );
				count += selectValues.length;
				map.push( {
					input: selectValues,
					length: selectValues.length,
					multiple: true,
					type,
					selector: $selector,
				} );
			}

			// Checkbox.
			if ( type === 'CHECKBOX' && ! checkboxGroup.has( group ) ) {
				inputs.push( `INPUT:${ type }` );

				const checkboxes = Array.from( $selectors )
					.filter(
						( c ) =>
							c.matches( group ) &&
							getInputType( c ) === 'CHECKBOX'
					)
					.filter( ( c ) => c.checked && c.value.length > 0 )
					.map( ( c ) => c.value );

				values.push( ...checkboxes );
				exists.push( checkboxes.length > 0 );
				count += checkboxes.length;
				map.push( {
					input: checkboxes,
					length: checkboxes.length,
					multiple: true,
					type,
					selector: $selector,
				} );

				checkboxGroup.add( group );
			}

			// Radio.
			if ( type === 'RADIO' && ! radioGroup.has( name ) ) {
				inputs.push( `INPUT:${ type }` );
				// Find all radios in the same group within the nodeList
				const radio = Array.from( $selectors )
					.filter(
						( r ) =>
							r.name === name && getInputType( r ) === 'RADIO'
					)
					.find( ( r ) => r.checked && r.value.length > 0 );

				const value = radio ? radio.value : '';

				values.push( value );
				exists.push( value.length > 0 );
				count += value.length;

				map.push( {
					input: value.length > 0 ? [ value ] : [],
					length: value.length,
					multiple: false,
					type,
					selector: $selector,
				} );

				radioGroup.add( name );
			}

			// Others.
			if ( ! specialTypes.includes( type ) ) {
				inputs.push( `INPUT:${ type }` );
				const value = $selector.value.length > 0 ? $selector.value : '';
				values.push( value );
				exists.push( value.length > 0 );
				count += value.length;
				map.push( {
					input: value.length > 0 ? [ value ] : [],
					length: value.length,
					multiple: false,
					type,
					selector: $selector,
				} );
			}
		} );

		return {
			inputs,
			values,
			count,
			empty: ! exists.every( ( val ) => val ),
			notEmpty: exists.every( ( val ) => val ),
			map,
		};
	};

	/**
	 * Checks if a string is a valid regular expression literal (e.g., /pattern/flags).
	 *
	 * @param {*} value The value to check.
	 * @return {boolean} `true` if the string is a valid RegExp literal, otherwise `false`.
	 */
	const isValidRegExp = ( value ) => {
		return (
			typeof value === 'string' &&
			new RegExp( '/(.+)/([gimuy]*)' ).test( value )
		);
	};

	/**
	 * Extracts the pattern and flags from a RegExp literal string.
	 *
	 * @param {string} value The RegExp literal string (e.g., '/hello/i').
	 * @return {{pattern: string, flags: string, _: string}} An object with the pattern and flags.
	 */
	const getRegExpParams = ( value ) => {
		const [ _, pattern, flags ] = value.match( /^\/(.+)\/([gimuy]*)$/ );
		return { pattern, flags, _ };
	};

	/**
	 * Checks if a string exists at least once in an array, with an option for case-insensitive matching.
	 *
	 * @param {string[]} where             The array of strings to search within.
	 * @param {string}   what              The string to search for.
	 * @param {boolean}  [sensitive=false] If true, the search is case-sensitive. If false, it's case-insensitive.
	 * @param {boolean}  [isWord=false]    If true, the regexp pattern will be word wrapper.
	 * @return {boolean} True if the string is found at least once, otherwise false.
	 */
	const inArrayAny = ( where, what, sensitive = false, isWord = false ) => {
		if ( sensitive ) {
			return isWord
				? where.toString().includes( what )
				: where.includes( what );
		}

		const w = RegExp.escape( what );

		const r = isWord
			? new RegExp( `\\b${ w }\\b`, 'ui' )
			: new RegExp( `^${ w }$`, 'ui' );

		return where.some( ( value ) => r.test( value ) );
	};

	/**
	 * Checks if elements in an array match a given string, with different logic based on case sensitivity.
	 *
	 * @param {string[]} where             The array of strings to check.
	 * @param {string}   what              The string to match against the elements.
	 * @param {boolean}  [sensitive=false] Toggles the matching behavior.
	 * @param {boolean}  [isWord=false]    regexp word.
	 * @return {boolean} The result of the check.
	 */
	const inArrayAll = ( where, what, sensitive = false, isWord = false ) => {
		if ( sensitive ) {
			return isWord
				? where.toString().includes( what )
				: where.includes( what );
		}

		const w = RegExp.escape( what );

		const r = isWord
			? new RegExp( `\\b${ w }\\b`, 'ui' )
			: new RegExp( `^${ w }$`, 'ui' );

		return where.every( ( value ) => r.test( value ) );
	};

	/**
	 * Checks if every element from a source array exists within a target array.
	 *
	 * @param {string[]} where             The source array. Every element from this array will be checked for its presence in the `what` array.
	 * @param {string[]} what              The target array to search within.
	 * @param {boolean}  [sensitive=false] If true, the comparison is case-sensitive. If false, it's case-insensitive.
	 * @param {boolean}  [isWord=false]    If true, the comparison is case-sensitive. If false, it's case-insensitive.
	 * @return {boolean} Returns `true` if all elements of the `where` array are found in the `what` array, otherwise `false`.
	 */
	const arrayInArrayAll = (
		where,
		what,
		sensitive = false,
		isWord = false
	) => {
		if ( ! Array.isArray( where ) || ! Array.isArray( what ) ) {
			return false;
		}

		if ( sensitive ) {
			return isWord
				? what.every( ( value ) => where.includes( value ) )
				: where.every( ( value ) => what.includes( value ) );
		}

		if ( isWord ) {
			return what.every( ( value ) => {
				const w = RegExp.escape( value );
				const r = new RegExp( `\\b${ w }\\b`, 'ui' );

				return where.some( ( v ) => r.test( v ) );
			} );
		}

		return where.every( ( value ) => {
			const w = RegExp.escape( value );
			const r = new RegExp( `^${ w }$`, 'ui' );

			return what.some( ( v ) => r.test( v ) );
		} );
	};

	/**
	 * Checks if at least one element from a source array exists within a target array.
	 *
	 * @param {string[]} where             The source array. The function checks if any of its elements are in the `what` array.
	 * @param {string[]} what              The target array to search within.
	 * @param {boolean}  [sensitive=false] If true, the comparison is case-sensitive. If false, it's case-insensitive.
	 * @param {boolean}  [isWord=false]    If true, the comparison is case-sensitive. If false, it's case-insensitive.
	 * @return {boolean} Returns `true` if any element from `where` is found in `what`, otherwise `false`.
	 */
	const arrayInArrayAny = (
		where,
		what,
		sensitive = false,
		isWord = false
	) => {
		if ( ! Array.isArray( where ) || ! Array.isArray( what ) ) {
			return false;
		}

		if ( sensitive ) {
			return isWord
				? what.some( ( value ) => where.includes( value ) )
				: where.some( ( value ) => what.includes( value ) );
		}

		if ( isWord ) {
			return what.some( ( value ) => {
				const w = RegExp.escape( value );
				const r = new RegExp( `\\b${ w }\\b`, 'ui' );

				return where.some( ( v ) => r.test( v ) );
			} );
		}

		return where.some( ( value ) => {
			const w = RegExp.escape( value );
			const r = new RegExp( `^${ w }$`, 'ui' );

			return what.some( ( v ) => r.test( v ) );
		} );
	};

	/**
	 * Validates if a `selected` array meets the criteria of a `condition` array
	 * based on `strict` and `required` flags.
	 *
	 * @param {string[]} selected  The array of selected items.
	 * @param {string[]} condition The array of condition items.
	 * @param {boolean}  strict    If true, isRequired should be false. `selected` and `condition` must have the same length and elements.
	 * @param {boolean}  required  If true (and `strict` is false), every item in `condition` must be in `selected`.
	 * @param {boolean}  sensitive If true.
	 * @param {boolean}  word      If true.
	 * @return {boolean} Returns true if the validation passes, otherwise false.
	 */

	const validateArrayInArray = (
		selected,
		condition,
		strict,
		required,
		sensitive,
		word
	) => {
		// Case 1: strict = true
		// `selected` and `condition` must have the same length
		// Every item in `condition` must be present in `selected`.

		if ( strict ) {
			return (
				selected.length === condition.length &&
				arrayInArrayAll( condition, selected, sensitive, word )
			);
		}

		// Case 2: strict = false, required = true
		// Every item in `condition` must be present in `selected`.
		if ( required ) {
			return arrayInArrayAll( condition, selected, sensitive, word );
		}

		// Case 3: strict = false, required = false
		// At least one item from `condition` must be present in `selected`.
		return arrayInArrayAny( condition, selected, sensitive, word );
	};

	/**
	 * Validates if a `selected` array meets the criteria of a `condition` array
	 * based on `strict` and `required` flags.
	 *
	 * @param {string[]} selected       The array of selected items.
	 * @param {number}   selectedLength The length of selected items. not array length.
	 * @param {string}   condition      The array of condition items.
	 * @param {boolean}  strict         If true, isRequired should be false. `selected` and `condition` must have the same length and elements.
	 * @param {boolean}  sensitive      If true.
	 * @param {boolean}  word           If true.
	 * @return {boolean} Returns true if the validation passes, otherwise false.
	 */
	const validateStringInArray = (
		selected,
		selectedLength,
		condition,
		strict,
		sensitive,
		word
	) => {
		// Case 1: strict = true
		// `selected` length should be 1
		// `condition` must be present in `selected`.

		if ( strict ) {
			return (
				selectedLength === 1 &&
				inArrayAll( selected, condition, sensitive, word )
			);
		}

		// Case 2: strict = false, required = false
		// At least one item from `condition` must be present in `selected`.
		return inArrayAny( selected, condition, sensitive, word );
	};

	/**
	 * @namespace COMPARE_FUNCTIONS
	 * @description A collection of functions to evaluate different types of conditions.
	 * Each function determines whether `this.showField` should be true or false.
	 */
	const COMPARE_FUNCTIONS = {
		/**
		 * Checks if the target input(s) have a non-empty value.
		 *
		 * @param {Object} condition The condition configuration object.
		 */
		EXISTS: ( condition ) => {
			this.showField = getConditionInert( condition );

			const selectors = getConditionSelector( condition );
			const $selectors = document.querySelectorAll( selectors );

			const { notEmpty } = analyzeSelectors( $selectors, selectors );

			if ( notEmpty ) {
				this.showField = ! getConditionInert( condition );
			}
		},

		/**
		 * Compares the target input's value against a specific string.
		 * For multi-value inputs, it can check if any or all selected values match.
		 *
		 * @param {Object} condition The condition configuration object.
		 */
		STRING: ( condition ) => {
			this.showField = getConditionInert( condition );

			const conditionValue = getConditionValue( condition ); // String
			const isStrict = getConditionStrict( condition ); // for CHECKBOX and SELECT-MULTIPLE values check.
			const isCaseSensitive = getConditionCase( condition );

			const selectors = getConditionSelector( condition );
			const $selectors = document.querySelectorAll( selectors );

			const { notEmpty, map } = analyzeSelectors( $selectors, selectors );

			const inWordCheck = getConditionCompare( condition ) === 'INCLUDES';

			if ( notEmpty ) {
				const available = map.every(
					( { input, multiple, length } ) => {
						return multiple
							? validateStringInArray(
									input,
									length,
									conditionValue,
									isStrict,
									isCaseSensitive,
									inWordCheck
							  )
							: inArrayAny(
									input,
									conditionValue,
									isCaseSensitive,
									inWordCheck
							  );
					}
				);

				if ( available ) {
					this.showField = ! getConditionInert( condition );
				}
			}
		},

		/**
		 * Compares the length or count of the target input's value against a number.
		 * Supports operators: EQ, GT, GTEQ, LT, LTEQ.
		 *
		 * @param {Object} condition The condition configuration object.
		 */
		NUMBER: ( condition ) => {
			this.showField = getConditionInert( condition );
			const conditionValue = Number( getConditionValue( condition ) );
			const compare = getConditionCompare( condition );
			const selectors = getConditionSelector( condition );
			const $selectors = document.querySelectorAll( selectors );

			const { notEmpty, map } = analyzeSelectors( $selectors, selectors );

			if ( notEmpty ) {
				const available = map.every( ( { length } ) => {
					if ( compare === 'EQ' && length === conditionValue ) {
						return true;
					}

					if ( compare === 'GT' && length > conditionValue ) {
						return true;
					}

					if ( compare === 'GTEQ' && length >= conditionValue ) {
						return true;
					}

					if ( compare === 'LT' && length < conditionValue ) {
						return true;
					}

					return compare === 'LTEQ' && length <= conditionValue;
				} );

				if ( available ) {
					this.showField = ! getConditionInert( condition );
				}
			}
		},

		/**
		 * Checks if the target input's value(s) are present in an array of strings.
		 * Supports strict, required, and any-match modes.
		 *
		 * @param {Object} condition The condition configuration object.
		 */
		'STRING-ARRAY': ( condition ) => {
			this.showField = getConditionInert( condition );

			const conditionValue = getConditionValue( condition );
			const isStrict = getConditionStrict( condition ); // for CHECKBOX and MULTI SELECT values check.
			const isRequire = getConditionRequire( condition ); // for NON-STRICT CHECKBOX and MULTI SELECT values check with Array Values.
			const isCaseSensitive = getConditionCase( condition );
			const selectors = getConditionSelector( condition );
			const $selectors = document.querySelectorAll( selectors );
			const inWordCheck = getConditionCompare( condition ) === 'INCLUDES';

			const { notEmpty, map } = analyzeSelectors( $selectors, selectors );

			if ( notEmpty ) {
				const available = map.every( ( { input, multiple } ) => {
					return multiple
						? validateArrayInArray(
								input,
								conditionValue,
								isStrict,
								isRequire,
								isCaseSensitive,
								inWordCheck
						  )
						: arrayInArrayAny(
								input,
								conditionValue,
								isCaseSensitive,
								inWordCheck
						  );
				} );

				if ( available ) {
					this.showField = ! getConditionInert( condition );
				}
			}
		},

		/**
		 * Checks if the target input's value length/count is present in an array of numbers.
		 *
		 * @param {Object} condition The condition configuration object.
		 */
		'NUMBER-ARRAY': ( condition ) => {
			this.showField = getConditionInert( condition );

			const conditionValues = getConditionValue( condition );

			const selectors = getConditionSelector( condition );
			const $selectors = document.querySelectorAll( selectors );

			const { notEmpty, map } = analyzeSelectors( $selectors, selectors );

			if ( notEmpty ) {
				const available = map.every( ( { length } ) => {
					return conditionValues.includes( length );
				} );

				if ( available ) {
					this.showField = ! getConditionInert( condition );
				}
			}
		},

		/**
		 * Checks if the target input's value length/count falls within a [min, max] range.
		 *
		 * @param {Object} condition The condition configuration object.
		 */
		MINMAX: ( condition ) => {
			this.showField = getConditionInert( condition );

			const conditionValues = getConditionValue( condition );
			const [ min = 0, max = Number.MAX_SAFE_INTEGER ] = conditionValues;

			const selectors = getConditionSelector( condition );
			const $selectors = document.querySelectorAll( selectors );

			const { notEmpty, map } = analyzeSelectors( $selectors, selectors );

			if ( notEmpty ) {
				const available = map.every( ( { length } ) => {
					return min <= length && max >= length;
				} );

				if ( available ) {
					this.showField = ! getConditionInert( condition );
				}
			}
		},

		/**
		 * Checks if the numeric value of a 'number' or 'range' input falls within a [start, end] range.
		 *
		 * @param {Object} condition The condition configuration object.
		 */
		RANGE: ( condition ) => {
			this.showField = getConditionInert( condition );

			const conditionValues = getConditionValue( condition );
			const selectors = getConditionSelector( condition );
			const $selectors = document.querySelectorAll( selectors );

			const [ start = 0, end = Number.MAX_SAFE_INTEGER ] =
				conditionValues;

			const { notEmpty, map } = analyzeSelectors( $selectors, selectors );

			if ( notEmpty ) {
				const available = map.every( ( { input, selector } ) => {
					return (
						isNumberValueInputType( selector ) &&
						start <= Number( input.at( 0 ) ) &&
						end >= Number( input.at( 0 ) )
					);
				} );

				if ( available ) {
					this.showField = ! getConditionInert( condition );
				}
			}
		},

		/**
		 * Checks if the target input's value matches a regular expression.
		 *
		 * @param {Object} condition The condition configuration object.
		 */
		REGEXP: ( condition ) => {
			this.showField = getConditionInert( condition );

			const conditionValue = getConditionValue( condition );

			const selectors = getConditionSelector( condition );
			const $selectors = document.querySelectorAll( selectors );

			const { notEmpty, map } = analyzeSelectors( $selectors, selectors );

			const regexp = getRegExpParams( conditionValue );

			const isStrict = getConditionStrict( condition ); // for CHECKBOX and MULTI SELECT values check.

			if ( notEmpty ) {
				const available = map.every( ( { input, multiple } ) => {
					if ( multiple ) {
						return isStrict
							? input.every( ( value ) =>
									new RegExp(
										regexp.pattern,
										regexp.flags
									).test( value )
							  )
							: input.some( ( value ) =>
									new RegExp(
										regexp.pattern,
										regexp.flags
									).test( value )
							  );
					}

					return input.every( ( value ) =>
						new RegExp( regexp.pattern, regexp.flags ).test( value )
					);
				} );

				if ( available ) {
					this.showField = ! getConditionInert( condition );
				}
			}
		},

		/**
		 * Checks if the target element(s) are visible in the DOM.
		 * `strict: true` requires all elements to be visible.
		 * `strict: false` requires at least one element to be visible.
		 *
		 * @param {Object} condition The condition configuration object.
		 */
		VISIBLE: ( condition ) => {
			this.showField = getConditionInert( condition );

			const elements = getConditionValue( condition );
			const isStrict = getConditionStrict( condition ); // for Visible All Element or Visible any element.

			const $elements = document.querySelectorAll( elements );

			const visibility = [];

			$elements.forEach( ( $element ) => {
				visibility.push( $element.checkVisibility() );
			} );

			if ( isStrict && visibility.every( ( value ) => value ) ) {
				this.showField = ! getConditionInert( condition );
			}

			if ( ! isStrict && visibility.some( ( value ) => value ) ) {
				this.showField = ! getConditionInert( condition );
			}
		},

		/**
		 * Delegates the check to another comparison function, using the value of another element as the condition's value.
		 *
		 * @param {Object} condition The condition configuration object.
		 */
		ELEMENT: ( condition ) => {
			const COMPARE_FUNCTION = getConditionCheck( condition );

			const availableCheckOperators =
				getAvailableCheckOperators( condition );

			if ( ! availableCheckOperators.includes( COMPARE_FUNCTION ) ) {
				return;
			}

			const isVisibleCheck = [ 'VISIBLE' ].includes( COMPARE_FUNCTION );

			if ( isVisibleCheck ) {
				const c = {
					...condition,
				};

				COMPARE_FUNCTIONS[ `${ COMPARE_FUNCTION }` ]( c );

				return;
			}

			const elements = getConditionValue( condition );
			const $elements = document.querySelectorAll( elements );
			const { map } = analyzeSelectors( $elements, elements );

			// const selectors = getConditionSelector( condition );
			// const $selectors = document.querySelectorAll( selectors );
			// const { notEmpty } = analyzeSelectors( $selectors, selectors );

			const is_multi =
				map.some( ( { multiple } ) => multiple === true ) ||
				map.length > 1;

			const values = is_multi
				? map.reduce( ( prev, { input, length } ) => {
						if (
							[ 'RANGE', 'MINMAX' ].includes( COMPARE_FUNCTION )
						) {
							prev.push( ...input.map( ( i ) => Number( i ) ) );
						} else if ( COMPARE_FUNCTION === 'NUMBER' ) {
							prev.push( length );
						} else {
							prev.push( ...input );
						}

						return prev;
				  }, [] )
				: map.reduce( ( prev, { input, length } ) => {
						const v = input.at( 0 );

						if ( COMPARE_FUNCTION === 'NUMBER' ) {
							prev = length;
						} else {
							prev = v ? v : '';
						}

						return prev;
				  }, '' );

			const COMPARE_FUNCTION_EXT =
				[ 'STRING', 'NUMBER' ].includes( COMPARE_FUNCTION ) && is_multi
					? '-ARRAY'
					: '';

			const c = {
				...condition,
				[ getValueOperatorKey() ]: values,
			};

			COMPARE_FUNCTIONS[
				`${ COMPARE_FUNCTION }${ COMPARE_FUNCTION_EXT }`
			]( c );
		},
	};

	/**
	 * Toggles the `inert` attribute on the plugin's main element to control its visibility and interactivity.
	 *
	 * @param {boolean} [value=true] If `true`, adds the `inert` attribute (hides); otherwise, removes it (shows).
	 */
	const toggleInertAttribute = ( value = true ) => {
		if ( value === true ) {
			this.$element.setAttribute( 'inert', '' );
		} else {
			this.$element.removeAttribute( 'inert' );
		}
	};

	/**
	 * Executes the appropriate comparison function for a given condition and updates the element's state based on the result and the overall relation logic (AND, OR, etc.).
	 *
	 * @param {Object} condition  The condition object to check.
	 * @param {*}      $selectors The target elements related to the condition.
	 */
	const checkConditions = ( condition, $selectors ) => {
		const CF = getConditionFn( condition );

		if ( typeof COMPARE_FUNCTIONS[ CF ] === 'function' ) {
			COMPARE_FUNCTIONS[ CF ]( condition, $selectors );
		} else {
			throw new Error( 'Compare function "' + CF + '" not available.' );
		}

		this.matched.set( condition.selector, this.showField );

		if ( this.relation === 'AND' ) {
			if ( [ ...this.matched.values() ].every( ( t ) => t === true ) ) {
				toggleInertAttribute( false );
			} else {
				toggleInertAttribute( true );
			}
		}

		if ( this.relation === 'OR' ) {
			if ( [ ...this.matched.values() ].some( ( t ) => t === true ) ) {
				toggleInertAttribute( false );
			} else {
				toggleInertAttribute( true );
			}
		}
	};

	/**
	 * Resets the plugin to its initial state, hides the element, clears conditions, and removes event listeners.
	 */
	const reset = () => {
		toggleInertAttribute( true );

		this.showField = false;

		this.conditions = [];

		this.matched = new Map();

		this.controller.abort();
	};

	/**
	 * Checks if the `value` property of a condition is an array.
	 *
	 * @param {Object} condition The condition object.
	 * @return {boolean} `true` if the value is an array, otherwise `false`.
	 */
	const isArrayValue = ( condition ) =>
		typeof condition[ getValueOperatorKey() ] === 'object' &&
		Array.isArray( condition[ getValueOperatorKey() ] );

	/**
	 * Populates a condition object with default values and determines the correct comparison function (`fn`) based on the value's type.
	 * This sanitizes and prepares the condition object for evaluation.
	 *
	 * @param {Object} condition The raw condition object from settings.
	 * @return {Object} The normalized condition object.
	 */
	const normalizeCondition = ( condition ) => {
		// Remove Predefined FN, we will add fn based on type.
		delete condition[ getFnOperatorKey() ];

		// Set default compare = EQ.
		if ( typeof getConditionCompare( condition ) === 'undefined' ) {
			setConditionCompare( condition, getCompareOperatorDefault() );
		}

		// Check from ELEMENT Type.
		if ( typeof getConditionCheck( condition ) === 'undefined' ) {
			setConditionCheck( condition, getCheckOperatorDefault() );
		}

		// Set default strict = false, will use for array values.
		if ( typeof getConditionStrict( condition ) === 'undefined' ) {
			setConditionStrict( condition, getStrictOperatorDefault() );
		}

		if ( typeof getConditionRequire( condition ) === 'undefined' ) {
			setConditionRequire( condition, getRequireOperatorDefault() );
		}

		// Set require false if strict is true.
		if ( getConditionStrict( condition ) === true ) {
			setConditionRequire( condition, false );
		}

		// Set default case = false
		if ( typeof getConditionCase( condition ) === 'undefined' ) {
			setConditionCase( condition, getCaseOperatorDefault() );
		}

		// Set default inert = false
		if ( typeof getConditionInert( condition ) === 'undefined' ) {
			setConditionInert( condition, getInertOperatorDefault() );
		}

		// Set default type = BOOLEAN
		if ( typeof getConditionType( condition ) === 'undefined' ) {
			setConditionType( condition, getTypeOperatorDefault() );
		}

		// Set default value = false
		if ( typeof getConditionValue( condition ) === 'undefined' ) {
			setConditionValue( condition, getValueOperatorDefault() );
		}

		// Decision based on type.

		// If "value" type boolean.
		if ( typeof getConditionValue( condition ) === 'boolean' ) {
			setConditionType( condition, 'BOOLEAN' );

			if ( getConditionValue( condition ) === false ) {
				setConditionInert( condition, true );
			}

			setConditionFn(
				condition,
				getFnNameByType( getConditionType( condition ) )
			);
		}

		// If "value" type string.
		if ( typeof getConditionValue( condition ) === 'string' ) {
			// Check for ELEMENT type.

			if ( ! [ 'ELEMENT' ].includes( getConditionType( condition ) ) ) {
				setConditionType( condition, 'STRING' );
			}

			setConditionFn(
				condition,
				getFnNameByType( getConditionType( condition ) )
			);
		}

		// If "value" type number.
		if ( typeof getConditionValue( condition ) === 'number' ) {
			setConditionType( condition, 'NUMBER' );
			setConditionFn(
				condition,
				getFnNameByType( getConditionType( condition ) )
			);
		}

		// If "value" type array.
		if ( isArrayValue( condition ) ) {
			const IS_NUMBER_ARRAY = getConditionValue( condition ).every(
				( v ) => typeof v === 'number'
			);

			if ( IS_NUMBER_ARRAY ) {
				// Check for MINMAX and RANGE type.
				if (
					! [ 'MINMAX', 'RANGE' ].includes(
						getConditionType( condition )
					)
				) {
					setConditionType( condition, 'NUMBER-ARRAY' );
				}

				setConditionFn(
					condition,
					getFnNameByType( getConditionType( condition ) )
				);
			} else {
				setConditionType( condition, 'STRING-ARRAY' );
				setConditionFn(
					condition,
					getFnNameByType( getConditionType( condition ) )
				);
			}
		}

		// If "value" type RegExp.
		if ( isValidRegExp( getConditionValue( condition ) ) ) {
			setConditionType( condition, 'REGEXP' );
			setConditionFn(
				condition,
				getFnNameByType( getConditionType( condition ) )
			);
		}

		return condition;
	};

	/**
	 * Parses the settings object and creates a normalized list of conditions to be evaluated.
	 */
	const prepareConditions = () => {
		for ( const key in this.settings ) {
			if ( ! isNaN( key ) ) {
				const condition = this.settings[ key ];
				this.conditions.push( normalizeCondition( condition ) );
			}
		}

		if ( this.conditions.length < 1 ) {
			const condition = this.settings;

			this.conditions.push( normalizeCondition( condition ) );
		}
	};

	/**
	 * Returns the array of normalized conditions for the plugin instance.
	 *
	 * @return {Object[]} The array of condition objects.
	 */
	const getConditions = () => {
		return this.conditions;
	};

	/**
	 * Creates and returns the public API object for the plugin instance.
	 *
	 * @return {{reset: function(): void}} An object with public methods.
	 */
	const expose = () => ( {
		reset,
	} );

	/**
	 * Returns a handler function for the form's reset event.
	 * This ensures conditions are re-evaluated after a form reset.
	 *
	 * @param {Object} condition  The condition object.
	 * @param {*}      $selectors The target elements for the condition.
	 * @return {function(): void} The event handler.
	 */
	const onFormReset = ( condition, $selectors ) => {
		return () => {
			setTimeout( () => {
				checkConditions( condition, $selectors );
			}, 1 );
		};
	};

	/**
	 * Sets up the initial state and attaches event listeners for all conditions.
	 * This is the final step in the setup process.
	 */
	const initial = () => {
		const availableConditions = getConditions();

		availableConditions.forEach( ( condition ) => {
			this.matched.set( condition.selector, false );
		} );

		availableConditions.forEach( ( condition ) => {
			// Elements.
			if ( getConditionType( condition ) === 'ELEMENT' ) {
				const elements = getConditionValue( condition );
				const $elements = document.querySelectorAll( elements );

				$elements.forEach( ( $element ) => {
					// Event
					OPERATORS.EVENTS.forEach( ( eventType ) => {
						$element.addEventListener(
							eventType,
							() => {
								checkConditions( condition, $elements );
							},
							{ signal: this.signal, passive: true }
						);
					} );
					// First load.
					checkConditions( condition, $elements );
				} );
			}

			// Selectors.
			const selectors = getConditionSelector( condition );
			const $selectors = document.querySelectorAll( selectors );

			$selectors.forEach( ( $selector ) => {
				OPERATORS.EVENTS.forEach( ( eventType ) => {
					$selector.addEventListener(
						eventType,
						() => {
							checkConditions( condition, $selectors );
						},
						{ signal: this.signal, passive: true }
					);
				} );

				checkConditions( condition, $selectors );
			} );

			// Form Reset.
			this.$parent.addEventListener(
				'reset',
				onFormReset( condition, $selectors ),
				{
					signal: this.signal,
					passive: true,
				}
			);
		} );
	};

	/**
	 * The main initialization function that orchestrates the entire setup of the plugin instance.
	 * It sets properties, prepares conditions, and kicks off the initial evaluation.
	 *
	 * @return {Object} The exposed public API for the instance.
	 */
	const init = () => {
		this.$element = element;
		this.settings = {
			...DEFAULTS,
			...options,
			...getOptionsFromAttribute( this.$element, ATTRIBUTE ),
			...PRIVATE,
		};

		this.relation = this.settings.relation;

		this.showField = false;

		this.conditions = [];

		this.$parent = this.$element.closest( 'form' );

		this.matched = new Map();

		this.controller = new AbortController();
		this.signal = this.controller.signal;

		prepareConditions();

		initial();

		return expose();
	};

	return init();
}
