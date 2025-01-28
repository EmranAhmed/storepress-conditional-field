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
			AVAILABLE: {
				EMPTY: [ 'EMPTY', 'NOT EXISTS' ],
				'NOT EMPTY': [ 'NOT EMPTY', 'EXISTS' ],
				EQUAL: [ 'EQUAL', '=', 'EQ' ],
				'NOT EQUAL': [ 'NOT EQUAL', '!=', 'NOEQ' ],
				'GREATER THAN': [ 'GREATER THAN', '>', 'GT' ],
				'LESS THAN': [ 'LESS THAN', '<', 'LT' ],
				'GREATER THAN OR EQUAL': [
					'GREATER THAN OR EQUAL',
					'>=',
					'GTEQ',
				],
				'LESS THAN OR EQUAL': [ 'LESS THAN OR EQUAL', '<=', 'LTEQ' ],
				LIKE: [ 'LIKE' ],
				'NOT LIKE': [ 'NOT LIKE' ],
				BETWEEN: [ 'BETWEEN' ],
				'NOT BETWEEN': [ 'NOT BETWEEN' ],
				IN: [ 'IN' ],
				'NOT IN': [ 'NOT IN' ],
			},
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

	const getCompareKey = ( key ) => {
		return Object.keys( OPERATORS.COMPARE_OPERATOR.AVAILABLE ).find(
			( index ) =>
				OPERATORS.COMPARE_OPERATOR.AVAILABLE[ index ].includes( key )
		);
	};

	const isValidCompareKey = ( key ) => {
		const k = getCompareKey( key );
		return k || false;
	};

	const getConditionKey = ( condition ) => {
		const compareValue = getConditionValue( condition );

		if ( typeof compareValue === 'boolean' ) {
			return compareValue ? 'NOT EMPTY' : 'EMPTY';
		}

		if ( typeof compareValue === 'string' ) {
			return 'EQUAL';
		}

		if ( typeof compareValue === 'number' ) {
			return 'GREATER THAN OR EQUAL'; // >=
		}

		if ( compareValue === null ) {
			return 'NOT EMPTY';
		}

		if (
			typeof compareValue === 'object' &&
			Array.isArray( compareValue )
		) {
			return 'IN';
		}

		const k = condition[ OPERATORS.COMPARE_OPERATOR.KEY ];
		return getCompareKey( k );
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

			const numericCheckOp = [
				'GREATER THAN',
				'LESS THAN',
				'GREATER THAN OR EQUAL',
				'LESS THAN OR EQUAL',
			];

			if (
				typeof conditionValue === 'string' &&
				numericCheckOp.includes( getConditionKey( condition ) )
			) {
				return 'NUMBER';
			}
		}

		return conditionType;
	};

	const checkExists = ( condition, currentValue, $selector, $selectors ) => {
		const compareKey = getConditionKey( condition );
		const inputType = getInputType( $selector );
		const compareValue = getConditionValue( condition );
		const compareValueType = getConditionValueType( condition );

		const isValid = [ 'NOT EMPTY' ].includes( compareKey );

		if ( isValid && [ null, true ].includes( compareValue ) ) {
			this.showField = false;
			$selectors.forEach( ( $sl ) => {
				if (
					getInputType( $sl ) === 'CHECKBOX' ||
					getInputType( $sl ) === 'RADIO'
				) {
					if ( $sl.checked ) {
						this.showField = true;
					}
				} else if ( $sl.value.length > 0 ) {
					this.showField = true;
				}
			} );
		}
	};

	const checkNotExists = (
		condition,
		currentValue,
		$selector,
		$selectors
	) => {
		///
		const compareKey = getConditionKey( condition );
		const inputType = getInputType( $selector );
		const compareValue = getConditionValue( condition );
		const compareValueType = getConditionValueType( condition );

		const isValid = [ 'EMPTY' ].includes( compareKey );

		if ( isValid && [ false ].includes( compareValue ) ) {
			this.showField = true;
			$selectors.forEach( ( $sl ) => {
				if (
					getInputType( $sl ) === 'CHECKBOX' ||
					getInputType( $sl ) === 'RADIO'
				) {
					if ( $sl.checked ) {
						this.showField = false;
					}
				} else if ( $sl.value.length > 0 ) {
					this.showField = false;
				}
			} );
		}
	};

	const checkEqual = ( condition, currentValue, $selector, $selectors ) => {
		const compareKey = getConditionKey( condition );
		const inputType = getInputType( $selector );
		const compareValue = getConditionValue( condition );

		const isValid = [ 'EQUAL' ].includes( compareKey );

		if ( isValid ) {
			this.showField = false;
			$selectors.forEach( ( $sl ) => {
				if (
					getInputType( $sl ) === 'CHECKBOX' ||
					getInputType( $sl ) === 'RADIO'
				) {
					if ( $sl.checked && $sl.value === compareValue ) {
						this.showField = true;
					}
				} else if ( $sl.value === compareValue ) {
					this.showField = true;
				}
			} );
		}
	};

	const checkNotEqual = (
		condition,
		currentValue,
		$selector,
		$selectors
	) => {
		const compareKey = getConditionKey( condition );
		const inputType = getInputType( $selector );
		const compareValue = getConditionValue( condition );

		const isValid = [ 'NOT EQUAL' ].includes( compareKey );

		if ( isValid ) {
			this.showField = true;
			$selectors.forEach( ( $sl ) => {
				if (
					getInputType( $sl ) === 'CHECKBOX' ||
					getInputType( $sl ) === 'RADIO'
				) {
					if ( $sl.checked && $sl.value === compareValue ) {
						this.showField = false;
					}
				} else if ( $sl.value === compareValue ) {
					this.showField = false;
				}
			} );
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

	const checkGreaterThanEqual = (
		condition,
		currentValue,
		$selector,
		$selectors
	) => {
		const compareKey = getConditionKey( condition );
		const inputType = getInputType( $selector );
		const compareValue = getConditionValue( condition );

		const isValid = [ 'GREATER THAN OR EQUAL' ].includes( compareKey );

		if ( isValid ) {
			this.showField = false;
			const values = [];
			let isCheck = false;
			$selectors.forEach( ( $sl ) => {
				if (
					getInputType( $sl ) === 'CHECKBOX' ||
					getInputType( $sl ) === 'RADIO'
				) {
					if ( $sl.checked ) {
						isCheck = true;
						values.push( $sl.value );
					}
				} else if ( $sl.value.length >= compareValue ) {
					this.showField = true;
				}
			} );

			// We check checkbox or radio checked length
			if ( isCheck && values.length >= compareValue ) {
				this.showField = true;
			}
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

	const checkIn = ( condition, currentValue, $selector, $selectors ) => {
		const compareKey = getConditionKey( condition );
		const inputType = getInputType( $selector );
		const compareValue = getConditionValue( condition );

		const isValid = [ 'IN' ].includes( compareKey );

		if ( isValid ) {
			this.showField = false;
			$selectors.forEach( ( $sl ) => {
				if (
					getInputType( $sl ) === 'CHECKBOX' ||
					getInputType( $sl ) === 'RADIO'
				) {
					if ( $sl.checked ) {
						this.showField = compareValue.includes( $sl.value );
					}
				} else if ( $sl.value.length > 0 ) {
					this.showField = compareValue.includes( $sl.value );
				}
			} );
		}
	};

	const checkNotIn = ( condition, currentValue, $selector, $selectors ) => {
		const compareKey = getConditionKey( condition );
		const inputType = getInputType( $selector );
		const compareValue = getConditionValue( condition );

		const isValid = [ 'NOT IN' ].includes( compareKey );

		if ( isValid ) {
			this.showField = true;
			$selectors.forEach( ( $sl ) => {
				if (
					getInputType( $sl ) === 'CHECKBOX' ||
					getInputType( $sl ) === 'RADIO'
				) {
					if ( $sl.checked ) {
						this.showField = ! compareValue.includes( $sl.value );
					}
				} else if ( $sl.value.length > 0 ) {
					this.showField = ! compareValue.includes( $sl.value );
				}
			} );
		}
	};

	const checkConditions = (
		condition,
		currentValue,
		$selector,
		$selectors
	) => {
		// const compare = getConditionKey( condition );

		const compareKey = getConditionKey( condition );

		console.log( compareKey );

		if ( isValidCompareKey( compareKey ) ) {
			checkExists( condition, currentValue, $selector, $selectors );

			checkNotExists( condition, currentValue, $selector, $selectors );

			checkEqual( condition, currentValue, $selector, $selectors );

			checkNotEqual( condition, currentValue, $selector, $selectors );

			checkIn( condition, currentValue, $selector, $selectors );

			checkNotIn( condition, currentValue, $selector, $selectors );

			checkGreaterThanEqual(
				condition,
				currentValue,
				$selector,
				$selectors
			);
		}
		/*


		checkNotEqual( condition, currentValue, $selector );

		checkGreaterThan( condition, currentValue, $selector );

		checkGreaterThanEqual( condition, currentValue, $selector );

		checkLessThan( condition, currentValue, $selector );

		checkLessThanEqual( condition, currentValue, $selector );

		checkIn( condition, currentValue, $selector );

		checkNotIn( condition, currentValue, $selector );

		 */

		this.matched.set( condition.selector, this.showField );

		if ( this.relation === 'AND' ) {
			if ( [ ...this.matched.values() ].every( ( t ) => t === true ) ) {
				this.$element.removeAttribute( 'inert' );
			} else {
				this.$element.setAttribute( 'inert', '' );
			}
		}

		if ( this.relation === 'OR' ) {
			if ( [ ...this.matched.values() ].some( ( t ) => t === true ) ) {
				this.$element.removeAttribute( 'inert' );
			} else {
				this.$element.setAttribute( 'inert', '' );
			}
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
			this.matched.set( condition.selector, false );
		} );

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

		this.matched = new Map();

		this.$wrappers = getWrappers();

		prepareConditions();

		initial();

		addClasses();

		addEvents();

		return expose();
	};

	return init();
}
