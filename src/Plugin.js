/**
 * External dependencies
 */
import { getOptionsFromAttribute } from '@storepress/utils';

export function Plugin(element, options) {
	const PRIVATE = {};

	// Collecting settings from html attribute
	const ATTRIBUTE = 'storepress-conditional-field'; // data-storepress-conditional-field

	const OPERATORS = {
		COMPARE_OPERATOR: {
			KEY: 'compare',
			DEFAULT: 'NOT EMPTY',
			AVAILABLE: {
				EMPTY: ['EMPTY', 'NOT EXISTS'],
				'NOT EMPTY': ['NOT EMPTY', 'EXISTS'],
				EQUAL: ['EQUAL', '=', 'EQ'],
				'NOT EQUAL': ['NOT EQUAL', '!=', 'NOEQ'],
				'GREATER THAN': ['GREATER THAN', '>', 'GT'],
				'LESS THAN': ['LESS THAN', '<', 'LT'],
				'GREATER THAN OR EQUAL': [
					'GREATER THAN OR EQUAL',
					'>=',
					'GTEQ',
				],
				'LESS THAN OR EQUAL': ['LESS THAN OR EQUAL', '<=', 'LTEQ'],
				LIKE: ['LIKE'],
				'NOT LIKE': ['NOT LIKE'],
				BETWEEN: ['BETWEEN'],
				'NOT BETWEEN': ['NOT BETWEEN'],
				IN: ['IN'],
				'NOT IN': ['NOT IN'],
			},
		},

		TYPE_OPERATOR: {
			KEY: 'type',
			DEFAULT: 'STRING',
			AVAILABLE: ['STRING', 'CHAR', 'NUMBER', 'BOOLEAN', 'ELEMENT'],
		},

		RELATION_OPERATOR: {
			DEFAULT: 'AND',
			KEY: 'relation',
			AVAILABLE: ['AND', 'OR'],
		},

		SELECTOR_OPERATOR: {
			KEY: 'selector',
		},

		VALUE_OPERATOR: {
			KEY: 'value',
			DEFAULT: true,
		},

		EVENTS: ['input'],
	};

	// Default Settings
	const DEFAULTS = {
		relation: OPERATORS.RELATION_OPERATOR.DEFAULT,
	};

	const getConditionSelector = (condition) => {
		return condition[OPERATORS.SELECTOR_OPERATOR.KEY];
	};

	const getConditionValue = (condition) => {
		return condition[OPERATORS.VALUE_OPERATOR.KEY];
	};

	const getInputType = ($selector) => {
		return $selector.type.toUpperCase();
	};

	const getInputValue = ($selector) => {
		if (
			getInputType($selector) === 'CHECKBOX' ||
			getInputType($selector) === 'RADIO'
		) {
			return $selector.checked ? $selector.value : false;
		}

		return $selector.value.length > 0 ? $selector.value : false;
	};

	const getCompareKey = (key) => {
		return Object.keys(OPERATORS.COMPARE_OPERATOR.AVAILABLE).find((index) =>
			OPERATORS.COMPARE_OPERATOR.AVAILABLE[index].includes(key)
		);
	};

	const isValidCompareKey = (key) => {
		const k = getCompareKey(key);
		return k || false;
	};

	const getConditionKey = (condition) => {
		const key = condition[OPERATORS.COMPARE_OPERATOR.KEY];
		return getCompareKey(key);
	};

	const getConditionType = (condition) => {
		return condition[OPERATORS.TYPE_OPERATOR.KEY];
	};

	const checkExists = (condition, $selector, $selectors) => {
		const compareKey = getConditionKey(condition);

		const isValid = ['NOT EMPTY'].includes(compareKey);

		if (isValid) {
			this.showField = false;
			$selectors.forEach(($sl) => {
				const v = getInputValue($sl);

				if (v && v.length > 0) {
					this.showField = true;
				}
			});
		}
	};

	const checkNotExists = (condition, $selector, $selectors) => {
		const compareKey = getConditionKey(condition);

		const isValid = ['EMPTY'].includes(compareKey);

		if (isValid) {
			this.showField = true;
			$selectors.forEach(($sl) => {
				const v = getInputValue($sl);

				if (v && v.length > 0) {
					this.showField = false;
				}
			});
		}
	};

	const checkEqual = (condition, $selector, $selectors) => {
		const compareKey = getConditionKey(condition);
		const compareValue = getConditionValue(condition);
		const conditionType = getConditionType(condition);

		const isValid = ['EQUAL'].includes(compareKey);
		const compareValues = [];

		if (isValid) {
			this.showField = false;

			if (conditionType === 'ELEMENT') {
				const $valueSelectors = document.querySelectorAll(compareValue);

				$valueSelectors.forEach(($sl) => {
					const v = getInputValue($sl);

					if (v) {
						compareValues.push(v);
					}
				});
			}

			$selectors.forEach(($sl) => {
				const tempValues =
					conditionType === 'ELEMENT'
						? compareValues
						: [compareValue];

				const v = getInputValue($sl);

				if (v && tempValues.includes(v)) {
					this.showField = true;
				}
			});
		}
	};

	const checkNotEqual = (condition, $selector, $selectors) => {
		const compareKey = getConditionKey(condition);
		const compareValue = getConditionValue(condition);
		const conditionType = getConditionType(condition);

		const isValid = ['NOT EQUAL'].includes(compareKey);
		const compareValues = [];

		if (isValid) {
			this.showField = true;

			if (conditionType === 'ELEMENT') {
				const $valueSelectors = document.querySelectorAll(compareValue);

				$valueSelectors.forEach(($sl) => {
					const v = getInputValue($sl);

					if (v) {
						compareValues.push(v);
					}
				});
			}

			$selectors.forEach(($sl) => {
				const tempValues =
					conditionType === 'ELEMENT'
						? compareValues
						: [compareValue];

				const v = getInputValue($sl);

				if (v && tempValues.includes(v)) {
					this.showField = false;
				}
			});
		}
	};

	const checkGreaterThanEqual = (condition, $selector, $selectors) => {
		const compareKey = getConditionKey(condition);

		const compareValue = getConditionValue(condition);

		const isValid = ['GREATER THAN OR EQUAL'].includes(compareKey);

		if (isValid) {
			this.showField = false;
			const values = [];
			let isCheck = false;
			$selectors.forEach(($sl) => {
				const v = getInputValue($sl);

				if ($sl.checked && v) {
					isCheck = true;
					values.push(v);
				}

				if (v && v.length >= compareValue) {
					this.showField = true;
				}
			});

			// We check checkbox or radio checked length
			if (isCheck && values.length >= compareValue) {
				this.showField = true;
			}
		}
	};

	const checkLessThanEqual = (condition, $selector, $selectors) => {
		const compareKey = getConditionKey(condition);

		const compareValue = getConditionValue(condition);

		const isValid = ['LESS THAN OR EQUAL'].includes(compareKey);

		if (isValid) {
			this.showField = false;
			const values = [];
			let isCheck = false;
			$selectors.forEach(($sl) => {
				const v = getInputValue($sl);

				if ($sl.checked && v) {
					isCheck = true;
					values.push(v);
				}

				if (v && v.length <= compareValue) {
					this.showField = true;
				}
			});

			// We check checkbox or radio checked length
			if (isCheck && values.length <= compareValue) {
				this.showField = true;
			}
		}
	};

	const checkLessThan = (condition, $selector, $selectors) => {
		const compareKey = getConditionKey(condition);

		const compareValue = getConditionValue(condition);

		const isValid = ['LESS THAN'].includes(compareKey);

		if (isValid) {
			this.showField = false;
			const values = [];
			let isCheck = false;
			$selectors.forEach(($sl) => {
				const v = getInputValue($sl);

				if ($sl.checked && v) {
					isCheck = true;
					values.push(v);
				}

				if (v && v.length < compareValue) {
					this.showField = true;
				}
			});

			// We check checkbox or radio checked length
			if (isCheck && values.length < compareValue) {
				this.showField = true;
			}
		}
	};

	const checkGreaterThan = (condition, $selector, $selectors) => {
		const compareKey = getConditionKey(condition);

		const compareValue = getConditionValue(condition);

		const isValid = ['GREATER THAN'].includes(compareKey);

		if (isValid) {
			this.showField = false;
			const values = [];
			let isCheck = false;
			$selectors.forEach(($sl) => {
				const v = getInputValue($sl);

				if ($sl.checked && v) {
					isCheck = true;
					values.push(v);
				}

				if (v && v.length > compareValue) {
					this.showField = true;
				}
			});

			// We check checkbox or radio checked length
			if (isCheck && values.length > compareValue) {
				this.showField = true;
			}
		}
	};

	const checkBetween = (condition, $selector, $selectors) => {
		const compareKey = getConditionKey(condition);
		const compareValue = getConditionValue(condition);

		const isValid = ['BETWEEN'].includes(compareKey);

		if (isValid) {
			this.showField = false;
			const values = [];
			let isCheck = false;
			$selectors.forEach(($sl) => {
				const v = getInputValue($sl);

				if ($sl.checked && v) {
					isCheck = true;
					values.push(v);
				}

				if (v && compareValue.includes(v.length)) {
					this.showField = true;
				}
			});

			// We check checkbox or radio checked length
			if (isCheck && compareValue.includes(values.length)) {
				this.showField = true;
			}
		}
	};

	const checkNotBetween = (condition, $selector, $selectors) => {
		const compareKey = getConditionKey(condition);
		const compareValue = getConditionValue(condition);

		const isValid = ['NOT BETWEEN'].includes(compareKey);

		if (isValid) {
			this.showField = true;
			const values = [];
			let isCheck = false;
			$selectors.forEach(($sl) => {
				const v = getInputValue($sl);

				if ($sl.checked) {
					isCheck = true;
					values.push(v);
				}
				if (v && compareValue.includes(v.length)) {
					this.showField = false;
				}
			});

			// We check checkbox or radio checked length
			if (isCheck && compareValue.includes(values.length)) {
				this.showField = false;
			}
		}
	};

	const checkIn = (condition, $selector, $selectors) => {
		const compareKey = getConditionKey(condition);

		const compareValue = getConditionValue(condition);

		const isValid = ['IN'].includes(compareKey);

		if (isValid) {
			this.showField = false;
			$selectors.forEach(($sl) => {
				const v = getInputValue($sl);

				if (v && compareValue.includes(v)) {
					this.showField = true;
				}
			});
		}
	};

	const checkNotIn = (condition, $selector, $selectors) => {
		const compareKey = getConditionKey(condition);

		const compareValue = getConditionValue(condition);

		const isValid = ['NOT IN'].includes(compareKey);

		if (isValid) {
			this.showField = true;
			$selectors.forEach(($sl) => {
				const v = getInputValue($sl);
				if (v && !compareValue.includes(v)) {
					this.showField = true;
				}
			});
		}
	};

	const toggleInertAttribute = (value = true) => {
		if (value === true) {
			this.$element.setAttribute('inert', '');
		} else {
			this.$element.removeAttribute('inert');
		}
	};

	const checkConditions = (condition, $selector, $selectors) => {
		const compareKey = getConditionKey(condition);

		// console.log(compareKey);

		if (isValidCompareKey(compareKey)) {
			checkExists(condition, $selector, $selectors);

			checkNotExists(condition, $selector, $selectors);

			checkEqual(condition, $selector, $selectors);

			checkNotEqual(condition, $selector, $selectors);

			checkIn(condition, $selector, $selectors);

			checkNotIn(condition, $selector, $selectors);

			checkGreaterThanEqual(condition, $selector, $selectors);

			checkGreaterThan(condition, $selector, $selectors);

			checkLessThanEqual(condition, $selector, $selectors);

			checkLessThan(condition, $selector, $selectors);

			checkBetween(condition, $selector, $selectors);

			checkNotBetween(condition, $selector, $selectors);
		}

		this.matched.set(condition.selector, this.showField);

		if (this.relation === 'AND') {
			if ([...this.matched.values()].every((t) => t === true)) {
				toggleInertAttribute(false);
			} else {
				toggleInertAttribute(true);
			}
		}

		if (this.relation === 'OR') {
			if ([...this.matched.values()].some((t) => t === true)) {
				toggleInertAttribute(false);
			} else {
				toggleInertAttribute(true);
			}
		}
	};

	const reset = () => {
		toggleInertAttribute(true);

		this.controller.abort();
	};

	const prepareCondition = (condition) => {
		// Set default value true
		if (typeof condition[OPERATORS.VALUE_OPERATOR.KEY] === 'undefined') {
			condition[OPERATORS.VALUE_OPERATOR.KEY] =
				OPERATORS.VALUE_OPERATOR.DEFAULT;
		}

		// Value type boolean.
		if (typeof condition[OPERATORS.VALUE_OPERATOR.KEY] === 'boolean') {
			condition[OPERATORS.COMPARE_OPERATOR.KEY] = condition[
				OPERATORS.VALUE_OPERATOR.KEY
			]
				? getCompareKey('NOT EMPTY')
				: getCompareKey('EMPTY');
		}

		// Value type string.
		if (typeof condition[OPERATORS.VALUE_OPERATOR.KEY] === 'string') {
			condition[OPERATORS.COMPARE_OPERATOR.KEY] = getCompareKey('EQUAL');
		}

		// Value type number.
		if (typeof condition[OPERATORS.VALUE_OPERATOR.KEY] === 'number') {
			condition[OPERATORS.COMPARE_OPERATOR.KEY] = getCompareKey(
				'GREATER THAN OR EQUAL'
			);
			condition[OPERATORS.TYPE_OPERATOR.KEY] = 'CHAR';
		}

		// Value type array.
		if (
			typeof condition[OPERATORS.VALUE_OPERATOR.KEY] === 'object' &&
			Array.isArray(condition[OPERATORS.VALUE_OPERATOR.KEY])
		) {
			const isAllNumber = condition[OPERATORS.VALUE_OPERATOR.KEY].every(
				(t) => typeof t === 'number'
			);

			if (isAllNumber) {
				condition[OPERATORS.COMPARE_OPERATOR.KEY] =
					getCompareKey('BETWEEN');
				condition[OPERATORS.TYPE_OPERATOR.KEY] = 'CHAR';
			} else {
				condition[OPERATORS.COMPARE_OPERATOR.KEY] = getCompareKey('IN');
			}
		}

		// Set Defaults
		if (typeof condition[OPERATORS.COMPARE_OPERATOR.KEY] === 'undefined') {
			condition[OPERATORS.COMPARE_OPERATOR.KEY] =
				OPERATORS.COMPARE_OPERATOR.DEFAULT;
		}

		// Set Defaults
		if (typeof condition[OPERATORS.TYPE_OPERATOR.KEY] === 'undefined') {
			condition[OPERATORS.TYPE_OPERATOR.KEY] =
				OPERATORS.TYPE_OPERATOR.DEFAULT;
		}

		return condition;
	};

	const prepareConditions = () => {
		for (const key in this.settings) {
			if (!isNaN(key)) {
				const condition = this.settings[key];
				this.conditions.push(prepareCondition(condition));
			}
		}

		if (this.conditions.length < 1) {
			const condition = this.settings;

			this.conditions.push(prepareCondition(condition));
		}
	};

	const getConditions = () => {
		return this.conditions;
	};

	const initial = () => {
		const availableConditions = getConditions();

		availableConditions.forEach((condition) => {
			this.matched.set(condition.selector, false);
		});

		availableConditions.forEach((condition) => {
			const $selectors = document.querySelectorAll(
				getConditionSelector(condition)
			);

			if (condition[OPERATORS.TYPE_OPERATOR.KEY] === 'ELEMENT') {
				const $elements = document.querySelectorAll(
					condition[OPERATORS.VALUE_OPERATOR.KEY]
				);

				$elements.forEach(($selector) => {
					OPERATORS.EVENTS.forEach((eventType) => {
						$selector.addEventListener(
							eventType,
							(event) => {
								checkConditions(
									condition,
									event.target,
									$selectors
								);
							},
							{ signal: this.signal, passive: true }
						);
					});

					checkConditions(condition, $selector, $selectors);
				});
			}

			$selectors.forEach(($selector) => {
				OPERATORS.EVENTS.forEach((eventType) => {
					$selector.addEventListener(
						eventType,
						(event) => {
							checkConditions(
								condition,
								event.target,
								$selectors
							);
						},
						{ signal: this.signal, passive: true }
					);
				});

				checkConditions(condition, $selector, $selectors);
			});
		});
	};

	// Expose to public.
	const expose = () => ({
		reset,
	});

	// Do what you need and return expose fn.
	const init = () => {
		this.$element = element;
		this.settings = {
			...DEFAULTS,
			...options,
			...getOptionsFromAttribute(this.$element, ATTRIBUTE),
			...PRIVATE,
		};

		this.relation = this.settings.relation;

		this.showField = false;

		this.conditions = [];

		this.matched = new Map();

		this.controller = new AbortController();
		this.signal = this.controller.signal;

		prepareConditions();

		initial();

		return expose();
	};

	return init();
}
