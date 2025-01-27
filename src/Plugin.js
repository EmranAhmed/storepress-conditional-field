/**
 * External dependencies
 */
import { getOptionsFromAttribute, triggerEvent } from '@storepress/utils';

export function Plugin( element, options ) {
	// Default Settings
	const DEFAULTS = {};

	const PRIVATE = {};

	// Collecting settings from html attribute
	const ATTRIBUTE = 'storepress-conditional-field'; // data-storepress-conditional-field

	const OPERATORS = {
		COMPARE_OPERATOR: {
			KEY: 'compare',
			DEFAULT: 'NOT EMPTY',
			AVAILABLE: [
				'=',
				'!=',
				'>',
				'>=',
				'<',
				'<=',
				'LIKE',
				'NOT LIKE',
				'IN',
				'NOT IN',
				'BETWEEN',
				'NOT BETWEEN',
				'EXISTS',
				'NOT EXISTS',
				'EMPTY', // alias of NOT EXISTS
				'NOT EMPTY', // alias of EXISTS
			],
		},

		TYPE_OPERATOR: {
			KEY: 'type',
			DEFAULT: 'STRING',
			AVAILABLE: [ 'STRING', 'CHAR', 'NUMBER', 'BOOLEAN', 'ELEMENT' ],
		},

		RELATION_OPERATOR: {
			DEFAULT: 'AND',
			KEY: 'relation',
			AVAILABLE: [ 'AND', 'OR' ],
		},

		SELECTOR_OPERATOR: {
			KEY: 'selector',
		},

		VALUE_OPERATOR: {
			KEY: 'value',
		},

		PARENT_OPERATOR: [ 'parent', 'wrapper', 'context' ],
	};

	const toBool = ( value ) => {
		return typeof value === 'boolean'
			? value
			: [ 'true', 'TRUE', '1', 'yes' ].includes( value );
	};

	const hasWrapper = () => {
		return OPERATORS.PARENT_OPERATOR.some( ( key ) => {
			const $selector = this.settings[ key ];

			return document.querySelectorAll( $selector ).length > 0;
		} );
	};

	const getWrappers = () => {
		if ( hasWrapper() ) {
			const wrapperKey = OPERATORS.PARENT_OPERATOR.filter(
				( $selector_key ) => {
					const $selector = this.settings[ $selector_key ];

					return document.querySelectorAll( $selector ).length > 0;
				}
			).at( 0 );

			const $selector = this.settings[ wrapperKey ];

			return document.querySelectorAll( $selector );
		}

		return document.querySelectorAll( 'body' );
	};

	const getConditionSelector = ( condition ) => {
		return condition[ OPERATORS.SELECTOR_OPERATOR.KEY ];
	};

	const getConditionValue = ( condition ) => {
		return typeof condition[ OPERATORS.VALUE_OPERATOR.KEY ] === 'undefined'
			? true
			: condition[ OPERATORS.VALUE_OPERATOR.KEY ];
	};

	const getConditionValueType = ( condition ) => {
		return typeof getConditionValue( condition );
	};

	const getInputType = ( $selector ) => {
		return $selector.type.toUpperCase();
	};

	const getInputValue = ( $selector ) => {
		if ( getInputType( $selector ) === 'CHECKBOX' ) {
			return $selector.checked;
		}

		return $selector.value;
	};

	const getConditionKey = ( condition ) => {
		const compareValue = getConditionValue( condition );

		if ( typeof compareValue === 'boolean' ) {
			return compareValue ? 'EXISTS' : 'NOT EXISTS';
		}

		if ( typeof compareValue === 'string' ) {
			return '=';
		}

		if ( typeof compareValue === 'number' ) {
			return '>=';
		}

		if ( compareValue === null ) {
			return 'EXISTS';
		}

		if (
			typeof compareValue === 'object' &&
			Array.isArray( compareValue )
		) {
			return 'IN';
		}

		return condition[ OPERATORS.COMPARE_OPERATOR.KEY ];
	};

	const getConditionType = ( condition ) => {
		const conditionType = condition[ OPERATORS.TYPE_OPERATOR.KEY ];

		// Change Condition Type Based on Condition Value.
		if ( conditionType === 'STRING' ) {
			const conditionValue = getConditionValue( condition );

			if ( typeof conditionValue === 'boolean' ) {
				return 'BOOLEAN';
			}

			if ( typeof conditionValue === 'number' ) {
				return 'NUMBER';
			}

			if (
				typeof conditionValue === 'string' &&
				[ '>', '>=', '<', '<=' ].includes(
					getConditionKey( condition )
				)
			) {
				return 'NUMBER';
			}
		}

		return conditionType;
	};

	const isValidCompareKey = ( key ) => {
		return OPERATORS.COMPARE_OPERATOR.AVAILABLE.includes( key );
	};

	const checkExists = ( condition, currentValue, $selector, $selectors ) => {
		const compareKey = getConditionKey( condition );
		const inputType = getInputType( $selector );
		const compareValue = getConditionValue( condition );
		const compareValueType = getConditionValueType( condition );

		console.log( compareValue, currentValue, $selectors.length );

		// if $selectors.length > 1

		const isValid =
			isValidCompareKey( compareKey ) &&
			[ 'NOT EMPTY', 'EXISTS' ].includes( compareKey );

		if ( isValid ) {
			switch ( inputType ) {
				case 'CHECKBOX':
				case 'RADIO':
					if ( [ null, true ].includes( compareValue ) ) {
						this.showField = $selector.checked;
					}
					break;

				default:
					this.showField = currentValue.length > 0;
			}
		}
	};

	const checkNotExists = ( condition, currentValue, $selector ) => {
		///
		const compareKey = getConditionKey( condition );
		const inputType = getInputType( $selector );
		const compareValue = getConditionValue( condition );
		const compareValueType = getConditionValueType( condition );

		const isValid =
			isValidCompareKey( compareKey ) &&
			[ 'EMPTY', 'NOT EXISTS' ].includes( compareKey );

		if ( isValid ) {
			switch ( inputType ) {
				case 'CHECKBOX':
				case 'RADIO':
					if ( [ false ].includes( compareValue ) ) {
						this.showField = ! $selector.checked;
					}
					break;

				default:
					this.showField = currentValue.length === 0;
			}
		}
	};

	const checkEqual = ( condition, currentValue, $selector ) => {
		const compareKey = getConditionKey( condition );
		const inputType = getInputType( $selector );
		const compareValue = getConditionValue( condition );

		const isValid =
			isValidCompareKey( compareKey ) &&
			[ '=', '==' ].includes( compareKey );

		if ( isValid ) {
			switch ( inputType ) {
				case 'CHECKBOX':
				case 'RADIO':
					if ( compareValue === currentValue ) {
						this.showField = $selector.checked;
					}
					break;

				default:
					this.showField = compareValue === currentValue;
			}
		}
	};

	const checkNotEqual = ( condition, currentValue ) => {
		const compare = getConditionKey( condition );
		const value = getConditionValue( condition );
		const type = getConditionType( condition );

		if ( [ '!=', '!==' ].includes( compare ) ) {
			if ( type === 'STRING' ) {
				this.showField = currentValue !== value;
			}

			if ( type === 'BOOLEAN' ) {
				this.showField =
					toBool( value ) === false && currentValue.length === 0;
			}
		}
	};

	const checkGreaterThan = ( condition, currentValue ) => {
		const compare = getConditionKey( condition );
		const value = getConditionValue( condition );
		const type = getConditionType( condition );

		if ( [ '>' ].includes( compare ) ) {
			//  Number(currentValue)
			//  Number(value)
			// console.log( compare );
			// console.log( value );
			// console.log( type );

			if ( type === 'NUMBER' ) {
				this.showField = Number( currentValue ) > Number( value );
			}

			if ( type === 'CHAR' ) {
				this.showField = currentValue.length > Number( value );
			}
		}
	};

	const checkGreaterThanEqual = ( condition, currentValue ) => {
		const compare = getConditionKey( condition );
		const value = getConditionValue( condition );
		const type = getConditionType( condition );

		if ( [ '>=' ].includes( compare ) ) {
			//  Number(currentValue)
			//  Number(value)

			this.showField = Number( currentValue ) >= Number( value );
		}
	};

	const checkLessThan = ( condition, currentValue ) => {
		const compare = getConditionKey( condition );
		const value = getConditionValue( condition );
		const type = getConditionType( condition );

		if ( [ '<' ].includes( compare ) ) {
			if ( type === 'NUMBER' ) {
				this.showField = Number( currentValue ) < Number( value );
			}

			if ( type === 'CHAR' ) {
				this.showField = currentValue.length < Number( value );
			}
		}
	};

	const checkLessThanEqual = ( condition, currentValue ) => {
		const compare = getConditionKey( condition );
		const value = getConditionValue( condition );
		const type = getConditionType( condition );

		if ( [ '<=' ].includes( compare ) ) {
			if ( type === 'NUMBER' ) {
				this.showField = Number( currentValue ) <= Number( value );
			}

			if ( type === 'CHAR' ) {
				this.showField = currentValue.length <= Number( value );
			}
		}
	};

	const checkIn = ( condition, currentValue ) => {
		const compare = getConditionKey( condition );
		const value = getConditionValue( condition );
		const type = getConditionType( condition );

		if ( [ 'IN' ].includes( compare ) ) {
			if ( type === 'STRING' ) {
				this.showField = value.includes( currentValue );
			}
			if ( type === 'NUMBER' ) {
				this.showField = value.includes( Number( currentValue ) );
			}
			if ( type === 'CHAR' ) {
				const toNumber = value.reduce( ( acc, v ) => {
					acc.push( Number( v ) );
					return acc;
				}, [] );
				this.showField = toNumber.includes( currentValue.length );
			}
		}
	};

	const checkNotIn = ( condition, currentValue ) => {
		const compare = getConditionKey( condition );
		const value = getConditionValue( condition );
		const type = getConditionType( condition );

		if ( [ 'NOT IN' ].includes( compare ) ) {
			if ( type === 'STRING' ) {
				this.showField = ! value.includes( currentValue );
			}
			if ( type === 'NUMBER' ) {
				this.showField = ! value.includes( Number( currentValue ) );
			}
		}
	};

	const checkConditions = (
		condition,
		currentValue,
		$selector,
		$selectors
	) => {
		// const compare = getConditionKey( condition );

		checkExists( condition, currentValue, $selector, $selectors );

		checkNotExists( condition, currentValue, $selector, $selectors );

		checkEqual( condition, currentValue, $selector, $selectors );

		/*


		checkNotEqual( condition, currentValue, $selector );

		checkGreaterThan( condition, currentValue, $selector );

		checkGreaterThanEqual( condition, currentValue, $selector );

		checkLessThan( condition, currentValue, $selector );

		checkLessThanEqual( condition, currentValue, $selector );

		checkIn( condition, currentValue, $selector );

		checkNotIn( condition, currentValue, $selector );

		 */

		if ( this.showField ) {
			this.$element.removeAttribute( 'inert' );
		} else {
			this.$element.setAttribute( 'inert', '' );
		}
	};

	const addClasses = () => {};

	const removeClasses = () => {};

	const addEvents = () => {};

	const removeEvents = () => {};

	const reset = () => {
		removeClasses();
		removeEvents();
	};

	const prepareCondition = ( condition ) => {
		if ( typeof condition[ OPERATORS.TYPE_OPERATOR.KEY ] === 'undefined' ) {
			condition[ OPERATORS.TYPE_OPERATOR.KEY ] =
				OPERATORS.TYPE_OPERATOR.DEFAULT;
		}

		if (
			typeof condition[ OPERATORS.COMPARE_OPERATOR.KEY ] === 'undefined'
		) {
			condition[ OPERATORS.COMPARE_OPERATOR.KEY ] =
				OPERATORS.COMPARE_OPERATOR.DEFAULT;
		}

		if (
			typeof condition[ OPERATORS.VALUE_OPERATOR.KEY ] === 'undefined'
		) {
			condition[ OPERATORS.VALUE_OPERATOR.KEY ] = null;
		}
		return condition;
	};

	const prepareConditions = () => {
		for ( const key in this.settings ) {
			if ( ! isNaN( key ) ) {
				const condition = this.settings[ key ];
				this.conditions.push( prepareCondition( condition ) );
			}
		}

		if ( this.conditions.length < 1 ) {
			const condition = this.settings;

			this.conditions.push( prepareCondition( condition ) );
		}
	};

	const getConditions = () => {
		return this.conditions;
	};

	const initial = () => {
		const availableConditions = getConditions();
		availableConditions.forEach( ( condition ) => {
			const $selectors = document.querySelectorAll(
				getConditionSelector( condition )
			);

			$selectors.forEach( ( $selector ) => {
				[ 'input' ].forEach( ( eventType ) => {
					$selector.addEventListener( eventType, ( event ) => {
						checkConditions(
							condition,
							event.target.value,
							$selector,
							$selectors
						);
					} );
				} );

				checkConditions(
					condition,
					$selector.value,
					$selector,
					$selectors
				);
			} );
		} );

		triggerEvent( this.$element, 'afterInit', {} );
	};

	// Expose to public.
	const expose = () => ( {
		removeEvents,
		reset,
	} );

	// Do what you need and return expose fn.
	const init = () => {
		this.$element = element;
		this.settings = {
			...DEFAULTS,
			...options,
			...getOptionsFromAttribute( this.$element, ATTRIBUTE ),
			...PRIVATE,
		};

		this.relation =
			this.settings.relation || OPERATORS.RELATION_OPERATOR.DEFAULT;

		this.showField = false;

		this.conditions = [];

		this.$wrappers = getWrappers();

		prepareConditions();

		initial();

		addClasses();

		addEvents();

		return expose();
	};

	return init();
}
