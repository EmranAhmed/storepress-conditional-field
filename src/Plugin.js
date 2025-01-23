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
			AVAILABLE: [ 'STRING', 'CHAR', 'NUMBER', 'ELEMENT' ],
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

	const initial = () => {
		triggerEvent( this.$element, 'afterInit', {} );
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

	const getSelector = ( condition ) => {
		return condition[ OPERATORS.SELECTOR_OPERATOR.KEY ];
	};

	const getInputValue = ( condition ) => {
		return document.querySelector( getSelector( condition ) ).value;
	};

	const getValue = ( condition ) => {
		return condition[ OPERATORS.VALUE_OPERATOR.KEY ];
	};

	const getCompare = ( condition ) => {
		return condition[ OPERATORS.COMPARE_OPERATOR.KEY ];
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
		if ( ! condition[ OPERATORS.TYPE_OPERATOR.KEY ] ) {
			condition[ OPERATORS.TYPE_OPERATOR.KEY ] =
				OPERATORS.TYPE_OPERATOR.DEFAULT;
		}

		if ( ! condition[ OPERATORS.COMPARE_OPERATOR.KEY ] ) {
			condition[ OPERATORS.COMPARE_OPERATOR.KEY ] =
				OPERATORS.COMPARE_OPERATOR.DEFAULT;
		}

		if ( ! condition[ OPERATORS.VALUE_OPERATOR.KEY ] ) {
			condition[ OPERATORS.VALUE_OPERATOR.KEY ] = '';
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

		this.conditions = [];

		this.$wrappers = getWrappers();

		prepareConditions();

		getConditions().forEach( ( condition ) => {
			const compare = getCompare( condition );
			const inputValue = getInputValue( condition );
			const selector = getSelector( condition );

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const value = getValue( condition );

			document
				.querySelector( selector )
				.addEventListener( 'input', ( event ) => {
					const currentValue = event.target.value;
					// @todo: Check have on available list.
					if ( [ 'NOT EMPTY', 'EXISTS' ].includes( compare ) ) {
						if ( currentValue !== '' ) {
							this.$element.classList.add( 'visible' );
						} else {
							this.$element.classList.remove( 'visible' );
						}
					}
				} );

			// @todo: Check have on available list.
			if ( [ 'NOT EMPTY', 'EXISTS' ].includes( compare ) ) {
				if ( inputValue !== '' ) {
					this.$element.classList.add( 'visible' );
				} else {
					this.$element.classList.remove( 'visible' );
				}
			}
		} );

		initial();

		addClasses();

		addEvents();

		return expose();
	};

	return init();
}
