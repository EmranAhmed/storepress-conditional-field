/**
 * External dependencies
 */
import { getOptionsFromAttribute } from '@storepress/utils';

export function Plugin( element, options ) {
	const PRIVATE = {};

	// Collecting settings from html attribute
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
			DEFAULT: 'STRING-ARRAY',
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

	const getFnNameByType = ( type ) => {
		return OPERATORS.FUNCTIONS_FOR_TYPE[ type ];
	};

	const getSelectorOperatorKey = () => {
		return OPERATORS.SELECTOR_OPERATOR.KEY;
	};

	const getCaseOperatorKey = () => {
		return OPERATORS.CASE_SENSITIVITY_OPERATOR.KEY;
	};

	const getCheckOperatorKey = () => {
		return OPERATORS.ELEMENT_CHECK_FN.KEY;
	};

	const getFnOperatorKey = () => {
		return OPERATORS.FN_OPERATOR.KEY;
	};

	const getValueOperatorKey = () => {
		return OPERATORS.VALUE_OPERATOR.KEY;
	};

	const getRequireOperatorKey = () => {
		return OPERATORS.REQUIRE_OPERATOR.KEY;
	};

	const getRequireOperatorDefault = () => {
		return OPERATORS.REQUIRE_OPERATOR.DEFAULT;
	};

	const getValueOperatorDefault = () => {
		return OPERATORS.VALUE_OPERATOR.DEFAULT;
	};

	const getCaseOperatorDefault = () => {
		return OPERATORS.CASE_SENSITIVITY_OPERATOR.DEFAULT;
	};

	const getCheckOperatorDefault = () => {
		return OPERATORS.ELEMENT_CHECK_FN.DEFAULT;
	};

	const getAvailableCheckOperators = () => {
		return OPERATORS.ELEMENT_CHECK_FN.AVAILABLE;
	};

	const getTypeOperatorKey = () => {
		return OPERATORS.TYPE_OPERATOR.KEY;
	};

	const getTypeOperatorDefault = () => {
		return OPERATORS.TYPE_OPERATOR.DEFAULT;
	};

	const getInertOperatorKey = () => {
		return OPERATORS.INERT_OPERATOR.KEY;
	};

	const getInertOperatorDefault = () => {
		return OPERATORS.INERT_OPERATOR.DEFAULT;
	};

	const getStrictOperatorKey = () => {
		return OPERATORS.STRICT_OPERATOR.KEY;
	};

	const getStrictOperatorDefault = () => {
		return OPERATORS.STRICT_OPERATOR.DEFAULT;
	};

	const getCompareOperatorKey = () => {
		return OPERATORS.COMPARE_OPERATOR.KEY;
	};

	const getCompareOperatorDefault = () => {
		return OPERATORS.COMPARE_OPERATOR.DEFAULT;
	};

	// Get condition data from html attribute.
	const getConditionFn = ( condition ) => {
		return condition[ getFnOperatorKey() ];
	};

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

	const setConditionSelector = ( condition, value ) => {
		condition[ getSelectorOperatorKey() ] = value;
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

	// Get Input data.
	const getInputType = ( $selector ) => {
		return $selector.type.toUpperCase();
	};

	const isMultiValueInputType = ( $selector ) => {
		return [ 'CHECKBOX', 'SELECT-MULTIPLE' ].includes(
			getInputType( $selector )
		);
	};

	const isNumberValueInputType = ( $selector ) => {
		return [ 'RANGE', 'NUMBER' ].includes( getInputType( $selector ) );
	};

	const getElementValues = ( $selectors ) => {
		const values = [];
		const lengths = [];
		$selectors.forEach( ( $selector ) => {
			// isNumberValueInputType
			const isArrayValue = isMultiValueInputType( $selector );
			const isNumberValue = isNumberValueInputType( $selector );

			if (
				[ 'CHECKBOX', 'RADIO' ].includes( getInputType( $selector ) )
			) {
				if ( $selector.checked && $selector.value.length > 0 ) {
					values.push( $selector.value );
					lengths.push( $selector.value.length );
				}
			}

			if ( [ 'SELECT-MULTIPLE' ].includes( getInputType( $selector ) ) ) {
				for ( const option of $selector.options ) {
					if ( option.selected && option.value.length > 0 ) {
						values.push( option.value );
						lengths.push( option.value.length );
					}
				}
			}

			if (
				! isArrayValue &&
				! isNumberValue &&
				$selector.value.length > 0
			) {
				values.push( $selector.value );
				lengths.push( $selector.value.length );
			}

			if (
				! isArrayValue &&
				isNumberValue &&
				$selector.value.length > 0
			) {
				values.push( $selector.value );
				// lengths.push($selector.value.length);
				lengths.push( Number( $selector.value ) );
			}
		} );

		return [ values, lengths ];
	};

	const getInputValue = ( $selector, $selectors ) => {
		if ( [ 'CHECKBOX' ].includes( getInputType( $selector ) ) ) {
			const selectedValues = [];
			$selectors.forEach( ( $checkbox ) => {
				if ( [ 'CHECKBOX' ].includes( getInputType( $checkbox ) ) ) {
					if ( $checkbox.checked && $checkbox.value.length > 0 ) {
						selectedValues.push( $checkbox.value );
					}
				}
			} );
			return selectedValues;
		}

		if ( [ 'RADIO' ].includes( getInputType( $selector ) ) ) {
			return $selector.checked ? $selector.value : '';
		}

		if ( [ 'SELECT-MULTIPLE' ].includes( getInputType( $selector ) ) ) {
			const selectedValues = [];
			for ( const option of $selector.options ) {
				if ( option.selected && option.value.length > 0 ) {
					selectedValues.push( option.value );
				}
			}
			return selectedValues;
		}

		return $selector.value;
	};

	const analyzeSelectorsX = ( condition ) => {
		// const elements = document.querySelectorAll( selector );

		const selectors = getConditionSelector( condition ).split( ',' );

		const inputs = [];
		const values = [];
		const exists = [];

		selectors.forEach( ( selector ) => {
			const $sls = document.querySelectorAll( selector );

			const radioGroup = new Set();
			const checkboxGroup = new Set();

			// Non checkbox and radio
			$sls.forEach( ( $el ) => {
				const type = getInputType( $el );

				if ( [ 'CHECKBOX', 'RADIO' ].includes( type ) ) {
					return false;
				}

				if ( type === 'SELECT-MULTIPLE' ) {
					const selectValues = Array.from( $el.selectedOptions )
						.filter( ( opt ) => opt.length > 0 )
						.map( ( opt ) => opt.value );
					values.push( selectValues );
					inputs.push( `INPUT:${ type }` );
					exists.push( selectValues.length > 0 );
				} else {
					inputs.push( `INPUT:${ type }` );
					values.push( $el.value.length > 0 ? $el.value : '' );
					exists.push( $el.value.length > 0 );
				}
			} );

			// Only Checkbox
			$sls.forEach( ( $el ) => {
				const type = getInputType( $el );

				if ( ! [ 'CHECKBOX' ].includes( type ) ) {
					return false;
				}

				if ( ! checkboxGroup.has( selector ) ) {
					inputs.push( `INPUT:${ type }` );

					const checkboxes = Array.from( $sls )
						.filter( ( c ) => getInputType( c ) === 'CHECKBOX' )
						.filter( ( c ) => c.checked && c.value.length > 0 )
						.map( ( c ) => c.value );

					values.push( checkboxes );
					exists.push( checkboxes.length > 0 );

					checkboxGroup.add( selector );
				}
			} );

			// Only Radio
			$sls.forEach( ( $el ) => {
				const type = getInputType( $el );

				if ( ! [ 'RADIO' ].includes( type ) ) {
					return false;
				}

				const name = $el.name;

				if ( ! radioGroup.has( name ) ) {
					inputs.push( `INPUT:${ type }` );
					// Find all radios in the same group within the nodeList
					const radio = Array.from( $sls )
						.filter(
							( r ) =>
								r.name === name && getInputType( r ) === 'RADIO'
						)
						.find( ( r ) => r.checked && r.value.length > 0 );

					const value = radio ? radio.value : '';

					values.push( value );
					exists.push( value.length > 0 );

					radioGroup.add( name );
				}
			} );
		} );

		return {
			inputs,
			values,
			empty: ! exists.every( ( val ) => val ),
		};
	};

	const analyzeSelectors = ( $selectors, _selectors ) => {
		// const elements = document.querySelectorAll( selector );

		const inputs = [];
		const values = [];
		const exists = [];
		const selectors = _selectors.split( ',' );
		const map = [];

		const radioGroup = new Set();
		const checkboxGroup = new Set();

		$selectors.forEach( ( $selector ) => {
			const type = getInputType( $selector );

			const name = $selector.name;

			const group = selectors.find( ( selector ) => {
				return $selector.matches( selector );
			} );

			const specialTypes = [ 'SELECT-MULTIPLE', 'CHECKBOX', 'RADIO' ];

			// MultiSelect.
			if ( type === 'SELECT-MULTIPLE' ) {
				const selectValues = Array.from( $selector.selectedOptions )
					.filter( ( opt ) => opt.length > 0 )
					.map( ( opt ) => opt.value );
				values.push( selectValues );
				inputs.push( `INPUT:${ type }` );
				exists.push( selectValues.length > 0 );
				map.push( {
					input: selectValues,
					length: selectValues.length,
					multiple: true,
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

				values.push( checkboxes );
				exists.push( checkboxes.length > 0 );

				map.push( {
					input: checkboxes,
					length: checkboxes.length,
					multiple: true,
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

				map.push( {
					input: value.length > 0 ? [ value ] : [],
					length: value.length,
					multiple: false,
				} );

				radioGroup.add( name );
			}

			// Others.
			if ( ! specialTypes.includes( type ) ) {
				inputs.push( `INPUT:${ type }` );
				const value = $selector.value.length > 0 ? $selector.value : '';
				values.push( value );
				exists.push( value.length > 0 );
				map.push( {
					input: value.length > 0 ? [ value ] : [],
					length: value.length,
					multiple: false,
				} );
			}
		} );

		return {
			inputs,
			values,
			empty: ! exists.every( ( val ) => val ),
			notEmpty: exists.every( ( val ) => val ),
			map,
		};
	};

	const getInputsValue = ( $selectors, condition ) => {
		const values = [];
		const map = new Map();
		const conditionSelectors =
			getConditionSelector( condition ).split( ',' );
		//const selectors = conditionSelector.split(',');

		let index = 0;
		const checkInputs = [];
		const otherInputs = [];
		const v = [];
		const TYPES = [ 'SELECT-MULTIPLE', 'CHECKBOX', 'RADIO' ];
		conditionSelectors.forEach( ( selector ) => {
			//v[index] = [];

			document.querySelectorAll( selector ).forEach( ( s ) => {
				if ( [ 'CHECKBOX' ].includes( getInputType( s ) ) ) {
					checkInputs[ index ] = selector;
					if ( ! v[ index ] ) {
						//	v[index] = [];
					}
					const val = s.value.trim();

					v.push( [ val ] );
					if ( s.checked && val.length > 0 ) {
						//v[index].push(val);
					} else {
						//v[index].push();
					}
				}

				if ( [ 'RADIO' ].includes( getInputType( s ) ) ) {
					const val = s.value.trim();
					otherInputs.push( selector );
					if ( s.checked && val.length > 0 ) {
						v.push( [ val ] );
					} else {
						v.push();
					}
				}

				if ( [ 'SELECT-MULTIPLE' ].includes( getInputType( s ) ) ) {
					otherInputs.push( selector );
					const mv = [];
					for ( const $option of s.options ) {
						const val = $option.value.trim();
						if ( $option.selected && val.length > 0 ) {
							mv.push( [ val ] );
						}
					}

					v.push( mv );
				}

				if ( ! TYPES.includes( getInputType( s ) ) ) {
					otherInputs.push( selector );

					const val = s.value.trim();
					v.push( [ val ] );
					if ( val.length > 0 ) {
						//v.push(val);
					} else {
						//v.push();
					}
				}
			} );

			index++;
		} );

		const selectors = otherInputs.concat( checkInputs.filter( Boolean ) );

		let increment = 0;
		$selectors.forEach( ( $selector ) => {
			// const isMulti = isMultiValueInputType($selector);

			if ( [ 'CHECKBOX' ].includes( getInputType( $selector ) ) ) {
				const currentValue = $selector.value.trim();
				if ( $selector.checked && currentValue.length > 0 ) {
					values.push( currentValue );

					const selector = conditionSelectors.find( ( _selector ) => {
						return $selector.matches( _selector );
					} );

					//const ext = `${selector}:${increment}`;
					const ext = `${ selector }`;

					if ( ! map.has( ext ) ) {
						map.set( ext, {
							multiple: false,
							input: [],
							length: 0,
						} );
					}

					map.get( ext ).input.push( currentValue );
					map.get( ext ).length = map.get( ext ).input.length;
					map.get( ext ).multiple = map.get( ext ).length > 1;
				}
			}

			if ( [ 'RADIO' ].includes( getInputType( $selector ) ) ) {
				const currentValue = $selector.value.trim();
				if ( $selector.checked && currentValue.length > 0 ) {
					values.push( currentValue );

					const selector = conditionSelectors.find( ( _selector ) => {
						return $selector.matches( _selector );
					} );

					const ext = `${ selector }:${ increment }`;

					if ( ! map.has( ext ) ) {
						map.set( ext, {
							multiple: false,
							input: [],
							length: 0,
						} );
					}

					map.get( ext ).input.push( currentValue );
					map.get( ext ).length = map.get( ext ).input.length;
					map.get( ext ).multiple = map.get( ext ).length > 1;
				}
			}

			if ( [ 'SELECT-MULTIPLE' ].includes( getInputType( $selector ) ) ) {
				for ( const $option of $selector.options ) {
					const currentValue = $option.value.trim();
					if ( $option.selected && currentValue.length > 0 ) {
						values.push( currentValue );

						//

						const selector = conditionSelectors.find(
							( _selector ) => {
								return $selector.matches( _selector );
							}
						);

						const ext = `${ selector }:${ increment }`;

						if ( ! map.has( ext ) ) {
							map.set( ext, {
								multiple: false,
								input: [],
								length: 0,
							} );
						}
						map.get( ext ).input.push( currentValue );
						map.get( ext ).length = map.get( ext ).input.length;
						map.get( ext ).multiple = map.get( ext ).length > 1;
					}
				}
			}

			if (
				! [ 'SELECT-MULTIPLE', 'CHECKBOX', 'RADIO' ].includes(
					getInputType( $selector )
				)
			) {
				const currentValue = $selector.value.trim();
				if ( currentValue.length > 0 ) {
					values.push( currentValue );

					//
					const selector = conditionSelectors.find( ( _selector ) => {
						return $selector.matches( _selector );
					} );

					const ext = `${ selector }:${ increment }`;

					if ( ! map.has( ext ) ) {
						map.set( ext, {
							multiple: false,
							input: [],
							length: 0,
						} );
					}
					map.get( ext ).input.push( currentValue );
					map.get( ext ).length = map.get( ext ).input.length;
					map.get( ext ).multiple = map.get( ext ).length > 1;
				}
			}

			increment++;
		} );

		const inputs = Array.from( map, ( [ value ] ) => value );

		return [
			inputs,
			map.size === selectors.length,
			map.size,
			selectors.length,
			map,
			values,
			'-----',
			selectors,
			v,
		];
	};

	const isValidRegExp = ( value ) => {
		return (
			typeof value === 'string' &&
			new RegExp( '/(.+)/([gimuy]*)' ).test( value )
		);
	};

	const getRegExpParams = ( value ) => {
		const [ _, pattern, flags ] = value.match( /^\/(.+)\/([gimuy]*)$/ );
		return { pattern, flags, _ };
	};

	const arrayCompareInSensitiveStrict = ( conditionValues, inputValues ) => {
		const values = [ ...conditionValues ].sort();

		const inputs = [ ...inputValues ].sort();

		const isSame = inputs.length > 0 && values.length === inputs.length;

		const match = values.every( ( value ) => {
			return inputs.some( ( v ) =>
				new RegExp( `^${ value }$`, 'ui' ).test( v )
			);
		} );

		return isSame && match;
	};

	const arrayCompareInSensitiveNonStrict = (
		conditionValues,
		inputValues
	) => {
		const values = [ ...conditionValues ].sort();

		const inputs = [ ...inputValues ].sort();

		const isSame = inputs.length > 0;

		const match = values.every( ( value ) => {
			return inputs.some( ( v ) =>
				new RegExp( `^${ value }$`, 'ui' ).test( v )
			);
		} );

		return isSame && match;
	};

	const arrayCompareInSensitiveNonStrictSoft = (
		conditionValues,
		inputValues
	) => {
		const values = [ ...conditionValues ].sort();

		const inputs = [ ...inputValues ].sort();

		const isSame = inputs.length > 0;

		const match = values.some( ( value ) => {
			return inputs.some( ( v ) =>
				new RegExp( `^${ value }$`, 'ui' ).test( v )
			);
		} );

		return isSame && match;
	};

	const arrayCompareSensitiveStrict = ( conditionValues, inputValues ) => {
		const values = [ ...conditionValues ].sort();

		const inputs = [ ...inputValues ].sort();

		const isSame = inputs.length > 0 && values.length === inputs.length;

		const match = values.every( ( value ) => inputs.includes( value ) );

		return isSame && match;
	};

	const arrayCompareSensitiveNonStrict = ( conditionValues, inputValues ) => {
		const values = [ ...conditionValues ].sort();

		const inputs = [ ...inputValues ].sort();

		const isSame = inputs.length > 0;

		const match = values.every( ( value ) => inputs.includes( value ) );

		return isSame && match;
	};

	const arrayCompareSensitiveNonStrictSoft = (
		conditionValues,
		inputValues
	) => {
		const values = [ ...conditionValues ].sort();

		const inputs = [ ...inputValues ].sort();

		const isSame = inputs.length > 0;

		const match = values.some( ( value ) => inputs.includes( value ) );

		return isSame && match;
	};

	const valueCompareSensitive = ( conditionValues, inputValue ) => {
		return inputValue.length > 0 && conditionValues.includes( inputValue );
	};

	const valueCompareInSensitive = ( conditionValues, inputValue ) => {
		return (
			inputValue.length > 0 &&
			conditionValues.some( ( value ) =>
				new RegExp( `^${ value }$`, 'ui' ).test( inputValue )
			)
		);
	};

	/**
	 * Checks if a string exists at least once in an array, with an option for case-insensitive matching.
	 *
	 * @param {string[]} where             The array of strings to search within.
	 * @param {string}   what              The string to search for.
	 * @param {boolean}  [sensitive=false] If true, the search is case-sensitive. If false, it's case-insensitive.
	 * @return {boolean} True if the string is found at least once, otherwise false.
	 */
	const inArrayAny = ( where, what, sensitive = false ) => {
		const c = RegExp.escape( what );
		const r = new RegExp( `^${ c }$`, 'ui' );
		return sensitive
			? where.includes( what )
			: where.some( ( value ) => r.test( value ) );
	};

	/**
	 * Checks if elements in an array match a given string, with different logic based on case sensitivity.
	 *
	 * @param {string[]} where             The array of strings to check.
	 * @param {string}   what              The string to match against the elements.
	 * @param {boolean}  [sensitive=false] Toggles the matching behavior.
	 * @return {boolean} The result of the check.
	 */
	const inArrayAll = ( where, what, sensitive = false ) => {
		const c = RegExp.escape( what );
		const r = new RegExp( `^${ c }$`, 'ui' );
		return sensitive
			? where.includes( what )
			: where.every( ( value ) => r.test( value ) );
	};

	/**
	 * Checks if every element from a source array exists within a target array.
	 *
	 * @param {string[]} where             The source array. Every element from this array will be checked for its presence in the `what` array.
	 * @param {string[]} what              The target array to search within.
	 * @param {boolean}  [sensitive=false] If true, the comparison is case-sensitive. If false, it's case-insensitive.
	 * @return {boolean} Returns `true` if all elements of the `where` array are found in the `what` array, otherwise `false`.
	 */
	const arrayInArrayAll = ( where, what, sensitive = false ) => {
		if ( ! Array.isArray( where ) || ! Array.isArray( what ) ) {
			return false;
		}

		if ( sensitive ) {
			return where.every( ( value ) => what.includes( value ) );
		}
		return where.every( ( value ) => {
			const c = RegExp.escape( value );
			const r = new RegExp( `^${ c }$`, 'ui' );
			return what.some( ( v ) => r.test( v ) );
		} );
	};

	/**
	 * Checks if at least one element from a source array exists within a target array.
	 *
	 * @param {string[]} where             The source array. The function checks if any of its elements are in the `what` array.
	 * @param {string[]} what              The target array to search within.
	 * @param {boolean}  [sensitive=false] If true, the comparison is case-sensitive. If false, it's case-insensitive.
	 * @return {boolean} Returns `true` if any element from `where` is found in `what`, otherwise `false`.
	 */
	const arrayInArrayAny = ( where, what, sensitive = false ) => {
		if ( ! Array.isArray( where ) || ! Array.isArray( what ) ) {
			return false;
		}

		if ( sensitive ) {
			return where.some( ( value ) => what.includes( value ) );
		}
		return where.some( ( value ) => {
			const c = RegExp.escape( value );
			const r = new RegExp( `^${ c }$`, 'ui' );
			return what.some( ( v ) => r.test( v ) );
		} );
	};

	const COMPARE_FUNCTIONS = {
		EXISTS: ( condition, $selector, $selectors, caller, _selectors ) => {
			this.showField = getConditionInert( condition );

			const { notEmpty } = analyzeSelectors( $selectors, _selectors );

			if ( notEmpty ) {
				this.showField = ! getConditionInert( condition );
			}
		},

		STRING: ( condition, $selector, $selectors ) => {
			this.showField = getConditionInert( condition );

			const conditionValue = getConditionValue( condition );
			const isStrict = getConditionStrict( condition ); // for CHECKBOX and SELECT-MULTIPLE values check.
			const isCaseSensitive = getConditionCase( condition );
			const _selectors = getConditionSelector( condition );
			const { notEmpty, map } = analyzeSelectors(
				$selectors,
				_selectors
			);

			if ( notEmpty ) {
				const available = map.every(
					( { input, multiple, length } ) => {
						if ( isStrict && multiple ) {
							if ( length > 1 ) {
								return false;
							}

							return inArrayAll(
								input,
								conditionValue,
								isCaseSensitive
							);
						}

						return inArrayAny(
							input,
							conditionValue,
							isCaseSensitive
						);
					}
				);

				if ( available ) {
					this.showField = ! getConditionInert( condition );
				}
			}
		},

		NUMBER: ( condition, $selector, $selectors ) => {
			const conditionValue = Number( getConditionValue( condition ) );

			const compare = getConditionCompare( condition );
			const _selectors = getConditionSelector( condition );

			this.showField = getConditionInert( condition );

			const { notEmpty, map } = analyzeSelectors(
				$selectors,
				_selectors
			);

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

					if ( compare === 'LTEQ' && length <= conditionValue ) {
						return true;
					}

					return false;
				} );

				if ( available ) {
					this.showField = ! getConditionInert( condition );
				}
			}
		},

		'STRING-ARRAY': ( condition, $selector, $selectors ) => {
			this.showField = getConditionInert( condition );

			const conditionValue = getConditionValue( condition );
			const isStrict = getConditionStrict( condition ); // for CHECKBOX and MULTI SELECT values check.
			const isRequire = getConditionRequire( condition ); // for NON-STRICT CHECKBOX and MULTI SELECT values check with Array Values.
			const isCaseSensitive = getConditionCase( condition );
			const _selectors = getConditionSelector( condition );

			const { notEmpty, map } = analyzeSelectors(
				$selectors,
				_selectors
			);

			console.log( conditionValue, map );

			if ( notEmpty ) {
				const available = map.every( ( { input, multiple } ) => {
					console.log( input, multiple );

					return isStrict
						? arrayInArrayAll(
								conditionValue,
								input,
								isCaseSensitive
						  )
						: arrayInArrayAny(
								input,
								conditionValue,
								isCaseSensitive
						  );
				} );

				if ( available ) {
					this.showField = ! getConditionInert( condition );
				}
			}
		},

		'NUMBER-ARRAY': ( condition, $selector, $selectors ) => {
			this.showField = getConditionInert( condition );

			const conditionValues = getConditionValue( condition );

			const inputValue = getInputValue( $selector, $selectors );

			if ( conditionValues.includes( inputValue.length ) ) {
				this.showField = ! getConditionInert( condition );
			}
		},

		MINMAX: ( condition, $selector, $selectors ) => {
			this.showField = getConditionInert( condition );

			const conditionValues = getConditionValue( condition );
			const [ min = 0, max = Number.MAX_SAFE_INTEGER ] = conditionValues;

			const inputValue = getInputValue( $selector, $selectors );

			if ( min <= inputValue.length && max >= inputValue.length ) {
				this.showField = ! getConditionInert( condition );
			}
		},

		// Only for NUMBER and RANGE Type.
		RANGE: ( condition, $selector, $selectors ) => {
			this.showField = getConditionInert( condition );

			const conditionValues = getConditionValue( condition );

			const [ start = 0, end = Number.MAX_SAFE_INTEGER ] =
				conditionValues;

			const inputValue = Number( getInputValue( $selector, $selectors ) );

			if (
				! isNaN( inputValue ) &&
				start <= inputValue &&
				end >= inputValue
			) {
				this.showField = ! getConditionInert( condition );
			}
		},

		REGEXP: ( condition, $selector, $selectors ) => {
			this.showField = getConditionInert( condition );

			const conditionValue = getConditionValue( condition );

			const isMultiValues = isMultiValueInputType( $selector );

			const isStrict = getConditionStrict( condition ); // for CHECKBOX and MULTI SELECT values check.

			const inputValue = getInputValue( $selector, $selectors );

			const regexp = getRegExpParams( conditionValue );

			if ( isMultiValues && ! isStrict ) {
				if (
					inputValue.some( ( value ) =>
						new RegExp( regexp.pattern, regexp.flags ).test( value )
					)
				) {
					this.showField = ! getConditionInert( condition );
				}
			}

			if ( isMultiValues && isStrict ) {
				if (
					inputValue.every( ( value ) =>
						new RegExp( regexp.pattern, regexp.flags ).test( value )
					)
				) {
					this.showField = ! getConditionInert( condition );
				}
			}

			if ( ! isMultiValues ) {
				if (
					new RegExp( regexp.pattern, regexp.flags ).test(
						inputValue
					)
				) {
					this.showField = ! getConditionInert( condition );
				}
			}
		},

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

		ELEMENT: ( condition, $selector, $selectors, caller ) => {
			const selectors = getConditionSelector( condition );
			const elements = getConditionValue( condition );

			// const inputValue = getInputValue($selector, $selectors);

			const COMPARE_FUNCTION = getConditionCheck( condition );
			const COMPARE_FUNCTION_EXT = [ 'NUMBER', 'STRING' ].includes(
				COMPARE_FUNCTION
			)
				? '-ARRAY'
				: '';

			const isElementCaller = [
				'ELEMENT_INPUT',
				'ELEMENT_INIT',
			].includes( caller );
			const target = isElementCaller ? selectors : elements;
			const [ compareValues, compareLengths ] = getElementValues(
				document.querySelectorAll( target )
			);

			const lengthCheck = [
				'NUMBER',
				'NUMBER-ARRAY',
				'RANGE',
				'MINMAX',
			].includes( COMPARE_FUNCTION );

			const isVisibleCheck = [ 'VISIBLE' ].includes( COMPARE_FUNCTION );

			const c = {
				...condition,
				[ getValueOperatorKey() ]: lengthCheck
					? compareLengths
					: compareValues,
			};

			if ( isVisibleCheck ) {
				c[ `${ getValueOperatorKey() }` ] = elements;
			}

			COMPARE_FUNCTIONS[
				`${ COMPARE_FUNCTION }${ COMPARE_FUNCTION_EXT }`
			]( c, $selector, $selectors );

			console.log(
				c,
				`${ COMPARE_FUNCTION }${ COMPARE_FUNCTION_EXT }`,
				caller
			);
		},
	};

	const toggleInertAttribute = ( value = true ) => {
		if ( value === true ) {
			this.$element.setAttribute( 'inert', '' );
		} else {
			this.$element.removeAttribute( 'inert' );
		}
	};

	// Check
	const checkConditions = ( condition, $selector, $selectors, caller ) => {
		const CF = getConditionFn( condition );

		if ( typeof COMPARE_FUNCTIONS[ CF ] === 'function' ) {
			COMPARE_FUNCTIONS[ CF ]( condition, $selector, $selectors, caller );
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

		if ( this.relation === 'XOR' ) {
			if (
				[ ...this.matched.values() ].filter( ( t ) => t === true )
					.length === 1
			) {
				toggleInertAttribute( false );
			} else {
				toggleInertAttribute( true );
			}
		}

		if ( this.relation === 'NOT' ) {
			if ( ! [ ...this.matched.values() ].every( ( t ) => t === true ) ) {
				toggleInertAttribute( false );
			} else {
				toggleInertAttribute( true );
			}
		}
	};

	const reset = () => {
		toggleInertAttribute( true );

		this.showField = false;

		this.conditions = [];

		this.matched = new Map();

		this.controller.abort();
	};

	const isArrayValue = ( condition ) =>
		typeof condition[ getValueOperatorKey() ] === 'object' &&
		Array.isArray( condition[ getValueOperatorKey() ] );

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

		// ELEMENT TYPE.
		/*if (['ELEMENT'].includes(getConditionType(condition))) {
			setConditionType(condition, 'ELEMENT');
		}*/

		return condition;
	};

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

	const getConditions = () => {
		return this.conditions;
	};

	// Expose to public.
	const expose = () => ( {
		reset,
	} );

	const initial = () => {
		const availableConditions = getConditions();

		availableConditions.forEach( ( condition ) => {
			this.matched.set( condition.selector, false );
		} );

		availableConditions.forEach( ( condition ) => {
			const selectors = getConditionSelector( condition );
			const $selectors = document.querySelectorAll( selectors );

			if ( getConditionType( condition ) === 'ELEMENT' ) {
				const elements = getConditionValue( condition );
				const $elements = document.querySelectorAll( elements );

				$elements.forEach( ( $selector ) => {
					OPERATORS.EVENTS.forEach( ( eventType ) => {
						$selector.addEventListener(
							eventType,
							( event ) => {
								checkConditions(
									condition,
									event.target,
									$elements,
									'ELEMENT_INPUT'
								);
							},
							{ signal: this.signal, passive: true }
						);
					} );

					checkConditions(
						condition,
						$selector,
						$selectors,
						'ELEMENT_INIT'
					);
				} );
			}

			$selectors.forEach( ( $selector ) => {
				OPERATORS.EVENTS.forEach( ( eventType ) => {
					$selector.addEventListener(
						eventType,
						( event ) => {
							checkConditions(
								condition,
								event.target,
								$selectors,
								'SELECTOR_INPUT'
							);
						},
						{ signal: this.signal, passive: true }
					);
				} );

				checkConditions(
					condition,
					$selector,
					$selectors,
					'SELECTOR_INIT'
				);
			} );
		} );
	};

	// Do what you need and return expose fn.
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
