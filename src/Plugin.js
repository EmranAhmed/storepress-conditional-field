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
			DEFAULT: 'EQ',
			AVAILABLE: {
				// ONLY IF VALUE TYPE NUMBER, CHECK BY LENGTH.
				EQ: ['EQUAL', '=', 'EQ'],
				GT: ['GREATER THAN', '>', 'GT'],
				LT: ['LESS THAN', '<', 'LT'],
				GTEQ: ['GREATER THAN OR EQUAL', '>=', 'GTEQ'],
				LTEQ: ['LESS THAN OR EQUAL', '<=', 'LTEQ'],
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
			AVAILABLE: ['AND', 'OR', 'NOT', 'XOR'],
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
		// strict: boolean. Will apply for only SELECT-MULTIPLE and CHECKBOX values.
		// Like: "A" == ['A'] will TRUE.
		// Like: "B" == ['b'] will TRUE.
		// Like: "A" == ['a','b'] will FALSE.
		// Like: "B" == ['A','B'] will FALSE.

		// Like: ["A", "B"] == ['A','B'] will TRUE.
		// Like: ["A", "B"] == ['a','b'] will TRUE.
		// Like: ["A", "B"] == ['b','a'] will TRUE.
		// Like: ["A", "B"] == ['a','b','c'] will FALSE.
		STRICT_OPERATOR: {
			KEY: 'strict',
			DEFAULT: false,
		},
		// Check Case Sensitivity.
		CASE_SENSITIVITY_OPERATOR: {
			KEY: 'case',
			DEFAULT: false,
		},

		// Only for TYPE ELEMENT
		ELEMENT_CHECK_FN: {
			KEY: 'check',
			DEFAULT: 'EXISTS',
			AVAILABLE: [
				'EXISTS',
				'STRING',
				'STRING-ARRAY',
				'NUMBER',
				'NUMBER-ARRAY',
				'RANGE',
				'MINMAX',
				'VISIBLE',
			],
		},

		// require: boolean. if strict = false Will apply for only SELECT-MULTIPLE and CHECKBOX values.
		// Only for STRING-ARRAY Type.
		// "require" operator will always false if strict = true.

		REQUIRE_OPERATOR: {
			KEY: 'require',
			DEFAULT: false,
		},

		FN_OPERATOR: {
			KEY: 'fn',
		},

		EVENTS: ['input'],
	};

	// Default Settings
	const DEFAULTS = {
		relation: OPERATORS.RELATION_OPERATOR.DEFAULT,
	};

	const getFnNameByType = (type) => {
		return OPERATORS.FUNCTIONS_FOR_TYPE[type];
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
	const getConditionFn = (condition) => {
		return condition[getFnOperatorKey()];
	};

	const getConditionRequire = (condition) => {
		return condition[getRequireOperatorKey()];
	};

	const setConditionRequire = (condition, value) => {
		condition[getRequireOperatorKey()] = value;
	};

	const setConditionFn = (condition, value) => {
		condition[getFnOperatorKey()] = value;
	};

	const getConditionSelector = (condition) => {
		return condition[getSelectorOperatorKey()];
	};

	const setConditionSelector = (condition, value) => {
		condition[getSelectorOperatorKey()] = value;
	};

	const getConditionCase = (condition) => {
		return condition[getCaseOperatorKey()];
	};

	const getConditionCheck = (condition) => {
		return condition[getCheckOperatorKey()];
	};

	const setConditionCheck = (condition, value) => {
		condition[getCheckOperatorKey()] = value;
	};

	const setConditionCase = (condition, value) => {
		condition[getCaseOperatorKey()] = value;
	};

	const getConditionValue = (condition) => {
		return condition[getValueOperatorKey()];
	};

	const setConditionValue = (condition, value) => {
		condition[getValueOperatorKey()] = value;
	};

	const getConditionType = (condition) => {
		return condition[getTypeOperatorKey()];
	};

	const setConditionType = (condition, value) => {
		condition[getTypeOperatorKey()] = value;
	};

	const getConditionInert = (condition) => {
		return condition[getInertOperatorKey()];
	};

	const setConditionInert = (condition, value) => {
		condition[getInertOperatorKey()] = value;
	};

	const getConditionCompare = (condition) => {
		const key = condition[getCompareOperatorKey()];

		return Object.keys(OPERATORS.COMPARE_OPERATOR.AVAILABLE).find((index) =>
			OPERATORS.COMPARE_OPERATOR.AVAILABLE[index].includes(key)
		);
	};

	const setConditionCompare = (condition, value) => {
		condition[getCompareOperatorKey()] = value;
	};

	const getConditionStrict = (condition) => {
		return condition[getStrictOperatorKey()];
	};

	const setConditionStrict = (condition, value) => {
		condition[getStrictOperatorKey()] = value;
	};

	// Get Input data.
	const getInputType = ($selector) => {
		return $selector.type.toUpperCase();
	};

	const isMultiValueInputType = ($selector) => {
		return ['CHECKBOX', 'SELECT-MULTIPLE'].includes(
			getInputType($selector)
		);
	};

	const isNumberValueInputType = ($selector) => {
		return ['RANGE', 'NUMBER'].includes(getInputType($selector));
	};

	const _getInputValues = ($selectors) => {
		const selectedValues = [];
		const groupInputs = ['CHECKBOX', 'RADIO', 'SELECT-MULTIPLE'];
		$selectors.forEach(($selector) => {
			if (['CHECKBOX', 'RADIO'].includes(getInputType($selector))) {
				if ($selector.checked) {
					selectedValues.push($selector.value);
				}
			}

			if (['SELECT-MULTIPLE'].includes(getInputType($selector))) {
				for (const option of $selector.options) {
					if (option.selected && option.value.length > 0) {
						selectedValues.push(option.value);
					}
				}
			}

			if (!groupInputs.includes(getInputType($selector))) {
				if ($selector.value.length > 0) {
					selectedValues.push($selector.value);
				}
			}
		});
		return selectedValues;
	};

	const getElementValues = ($selectors) => {
		const values = [];
		$selectors.forEach(($selector) => {
			if (['CHECKBOX'].includes(getInputType($selector))) {
				if ($selector.checked && $selector.value.length > 0) {
					values.push($selector.value);
				}
			}

			if (['SELECT-MULTIPLE'].includes(getInputType($selector))) {
				for (const option of $selector.options) {
					if (option.selected && option.value.length > 0) {
						values.push(option.value);
					}
				}
			}

			if (
				!isMultiValueInputType($selector) &&
				$selector.value.length > 0
			) {
				values.push($selector.value);
			}
		});
		return values;
	};

	const getInputValue = ($selector, $selectors) => {
		if (['CHECKBOX'].includes(getInputType($selector))) {
			const selectedValues = [];
			$selectors.forEach(($checkbox) => {
				if (['CHECKBOX'].includes(getInputType($checkbox))) {
					if ($checkbox.checked && $checkbox.value.length > 0) {
						selectedValues.push($checkbox.value);
					}
				}
			});
			return selectedValues;
		}

		if (['RADIO'].includes(getInputType($selector))) {
			return $selector.checked ? $selector.value : '';
		}

		if (['SELECT-MULTIPLE'].includes(getInputType($selector))) {
			const selectedValues = [];
			for (const option of $selector.options) {
				if (option.selected && option.value.length > 0) {
					selectedValues.push(option.value);
				}
			}
			return selectedValues;
		}

		return $selector.value;
	};

	const isValidRegExp = (value) => {
		return (
			typeof value === 'string' &&
			new RegExp('\/(.+)\/([gimuy]*)').test(value)
		);
	};

	const getRegExpParams = (value) => {
		const [_, pattern, flags] = value.match(/^\/(.+)\/([gimuy]*)$/);
		return { pattern, flags, _ };
	};

	const arrayCompareInSensitiveStrict = (conditionValues, inputValues) => {
		const values = [...conditionValues].sort();

		const inputs = [...inputValues].sort();

		const isSame = inputs.length > 0 && values.length === inputs.length;

		const match = values.every((value) => {
			return inputs.some((v) => new RegExp(`^${value}$`, 'ui').test(v));
		});

		return isSame && match;
	};

	const arrayCompareInSensitiveNonStrict = (conditionValues, inputValues) => {
		const values = [...conditionValues].sort();

		const inputs = [...inputValues].sort();

		const isSame = inputs.length > 0;

		const match = values.every((value) => {
			return inputs.some((v) => new RegExp(`^${value}$`, 'ui').test(v));
		});

		return isSame && match;
	};

	const arrayCompareInSensitiveNonStrictSoft = (
		conditionValues,
		inputValues
	) => {
		const values = [...conditionValues].sort();

		const inputs = [...inputValues].sort();

		const isSame = inputs.length > 0;

		const match = values.some((value) => {
			return inputs.some((v) => new RegExp(`^${value}$`, 'ui').test(v));
		});

		return isSame && match;
	};

	const arrayCompareSensitiveStrict = (conditionValues, inputValues) => {
		const values = [...conditionValues].sort();

		const inputs = [...inputValues].sort();

		const isSame = inputs.length > 0 && values.length === inputs.length;

		const match = values.every((value) => inputs.includes(value));

		return isSame && match;
	};

	const arrayCompareSensitiveNonStrict = (conditionValues, inputValues) => {
		const values = [...conditionValues].sort();

		const inputs = [...inputValues].sort();

		const isSame = inputs.length > 0;

		const match = values.every((value) => inputs.includes(value));

		return isSame && match;
	};

	const arrayCompareSensitiveNonStrictSoft = (
		conditionValues,
		inputValues
	) => {
		const values = [...conditionValues].sort();

		const inputs = [...inputValues].sort();

		const isSame = inputs.length > 0;

		const match = values.some((value) => inputs.includes(value));

		return isSame && match;
	};

	const valueCompareSensitive = (conditionValues, inputValue) => {
		return inputValue.length > 0 && conditionValues.includes(inputValue);
	};

	const valueCompareInSensitive = (conditionValues, inputValue) => {
		return (
			inputValue.length > 0 &&
			conditionValues.some((value) =>
				new RegExp(`^${value}$`, 'ui').test(inputValue)
			)
		);
	};

	const COMPARE_FUNCTIONS = {
		EXISTS: (condition, $selector, $selectors) => {
			this.showField = getConditionInert(condition);

			const inputValue = getInputValue($selector, $selectors);

			if (inputValue.length > 0) {
				this.showField = !getConditionInert(condition);
			}
		},

		STRING: (condition, $selector, $selectors) => {
			this.showField = getConditionInert(condition);

			const conditionValue = getConditionValue(condition);
			const conditionValues = [conditionValue].sort((a, b) => a - b);
			const isStrict = getConditionStrict(condition); // for CHECKBOX and MULTI SELECT values check.
			const isCaseSensitive = getConditionCase(condition);

			const isMultiValues = isMultiValueInputType($selector); //  Should check strict too.

			const inputValue = getInputValue($selector, $selectors);

			const isInputTypeNumber = isNumberValueInputType($selector);

			// Multiple Input Value With Case Sensitive Check.
			if (isMultiValues && isCaseSensitive) {
				// Case Sensitive NON-Strict.
				if (
					!isStrict &&
					arrayCompareSensitiveNonStrict(conditionValues, inputValue)
				) {
					this.showField = !getConditionInert(condition);
				}

				// Case Sensitive Strict.
				if (
					isStrict &&
					arrayCompareSensitiveStrict(conditionValues, inputValue)
				) {
					this.showField = !getConditionInert(condition);
				}
			}

			// Multiple Input Value With Case In Sensitive Check.
			if (isMultiValues && !isCaseSensitive) {
				// Case In Sensitive NON-Strict.
				if (
					!isStrict &&
					arrayCompareInSensitiveNonStrict(
						conditionValues,
						inputValue
					)
				) {
					this.showField = !getConditionInert(condition);
				}

				// Case In Sensitive Strict.
				if (
					isStrict &&
					arrayCompareInSensitiveStrict(conditionValues, inputValue)
				) {
					this.showField = !getConditionInert(condition);
				}
			}

			// Single Input Value With Case Sensitive Check.
			if (!isMultiValues && isCaseSensitive) {
				if (conditionValues.includes(inputValue)) {
					this.showField = !getConditionInert(condition);
				}
			}

			// Single Input Value With Case In Sensitive Check.
			if (!isMultiValues && !isCaseSensitive) {
				if (
					isInputTypeNumber &&
					valueCompareSensitive(conditionValues, inputValue)
				) {
					this.showField = !getConditionInert(condition);
				}

				if (
					!isInputTypeNumber &&
					valueCompareInSensitive(conditionValues, inputValue)
				) {
					this.showField = !getConditionInert(condition);
				}
			}
		},

		NUMBER: (condition, $selector, $selectors) => {
			const conditionValue = Number(getConditionValue(condition));

			const compare = getConditionCompare(condition);

			this.showField = getConditionInert(condition);

			const inputValue = getInputValue($selector, $selectors);

			if (compare === 'EQ' && inputValue.length === conditionValue) {
				this.showField = !getConditionInert(condition);
			}

			if (compare === 'GT' && inputValue.length > conditionValue) {
				this.showField = !getConditionInert(condition);
			}

			if (compare === 'GTEQ' && inputValue.length >= conditionValue) {
				this.showField = !getConditionInert(condition);
			}

			if (compare === 'LT' && inputValue.length < conditionValue) {
				this.showField = !getConditionInert(condition);
			}

			if (compare === 'LTEQ' && inputValue.length <= conditionValue) {
				this.showField = !getConditionInert(condition);
			}
		},

		'STRING-ARRAY': (condition, $selector, $selectors) => {
			this.showField = getConditionInert(condition);

			const conditionValues = getConditionValue(condition);
			// const conditionValues = [...conditionValue];
			const isStrict = getConditionStrict(condition); // for CHECKBOX and MULTI SELECT values check.
			const isRequire = getConditionRequire(condition); // for NON-STRICT CHECKBOX and MULTI SELECT values check with Array Values.
			const isCaseSensitive = getConditionCase(condition);

			const isMultiValues = isMultiValueInputType($selector); //  Should check strict too.

			const inputValue = getInputValue($selector, $selectors);

			const isInputTypeNumber = isNumberValueInputType($selector);

			// Multiple Input Value With Case Sensitive Check.
			if (isMultiValues && isCaseSensitive) {
				// Case Sensitive NON-Strict.

				if (
					!isStrict &&
					isRequire &&
					arrayCompareSensitiveNonStrict(conditionValues, inputValue)
				) {
					this.showField = !getConditionInert(condition);
				}

				if (
					!isStrict &&
					!isRequire &&
					arrayCompareSensitiveNonStrictSoft(
						conditionValues,
						inputValue
					)
				) {
					this.showField = !getConditionInert(condition);
				}
				// Case Sensitive Strict.
				if (
					isStrict &&
					arrayCompareSensitiveStrict(conditionValues, inputValue)
				) {
					this.showField = !getConditionInert(condition);
				}
			}

			// Multiple Input Value With Case In Sensitive Check.
			if (isMultiValues && !isCaseSensitive) {
				// Case In Sensitive NON-Strict.
				// getConditionRequire(condition);
				if (
					!isStrict &&
					!isRequire &&
					arrayCompareInSensitiveNonStrictSoft(
						conditionValues,
						inputValue
					)
				) {
					this.showField = !getConditionInert(condition);
				}
				if (
					!isStrict &&
					isRequire &&
					arrayCompareInSensitiveNonStrict(
						conditionValues,
						inputValue
					)
				) {
					this.showField = !getConditionInert(condition);
				}

				// Case In Sensitive Strict.
				if (
					isStrict &&
					arrayCompareInSensitiveStrict(conditionValues, inputValue)
				) {
					this.showField = !getConditionInert(condition);
				}
			}

			// Single Input Value With Case Sensitive Check.
			if (!isMultiValues && isCaseSensitive) {
				if (valueCompareSensitive(conditionValues, inputValue)) {
					this.showField = !getConditionInert(condition);
				}
			}

			// Single Input Value With Case In Sensitive Check.
			if (!isMultiValues && !isCaseSensitive) {
				if (
					isInputTypeNumber &&
					valueCompareSensitive(conditionValues, inputValue)
				) {
					this.showField = !getConditionInert(condition);
				}

				if (
					!isInputTypeNumber &&
					valueCompareInSensitive(conditionValues, inputValue)
				) {
					this.showField = !getConditionInert(condition);
				}
			}
		},

		'NUMBER-ARRAY': (condition, $selector, $selectors) => {
			this.showField = getConditionInert(condition);

			const conditionValues = getConditionValue(condition);

			const inputValue = getInputValue($selector, $selectors);

			if (conditionValues.includes(inputValue.length)) {
				this.showField = !getConditionInert(condition);
			}
		},

		MINMAX: (condition, $selector, $selectors) => {
			this.showField = getConditionInert(condition);

			const conditionValues = getConditionValue(condition);
			const [min = 0, max = Number.MAX_SAFE_INTEGER] = conditionValues;

			const inputValue = getInputValue($selector, $selectors);

			if (min <= inputValue.length && max >= inputValue.length) {
				this.showField = !getConditionInert(condition);
			}
		},

		// Only for NUMBER and RANGE Type.
		RANGE: (condition, $selector, $selectors) => {
			this.showField = getConditionInert(condition);

			const conditionValues = getConditionValue(condition);

			const [start = 0, end = Number.MAX_SAFE_INTEGER] = conditionValues;

			const inputValue = Number(getInputValue($selector, $selectors));

			if (
				!isNaN(inputValue) &&
				start <= inputValue &&
				end >= inputValue
			) {
				this.showField = !getConditionInert(condition);
			}
		},

		REGEXP: (condition, $selector, $selectors) => {
			this.showField = getConditionInert(condition);

			const conditionValue = getConditionValue(condition);

			const isMultiValues = isMultiValueInputType($selector);

			const isStrict = getConditionStrict(condition); // for CHECKBOX and MULTI SELECT values check.

			const inputValue = getInputValue($selector, $selectors);

			const regexp = getRegExpParams(conditionValue);

			if (isMultiValues && !isStrict) {
				if (
					inputValue.some((value) =>
						new RegExp(regexp.pattern, regexp.flags).test(value)
					)
				) {
					this.showField = !getConditionInert(condition);
				}
			}

			if (isMultiValues && isStrict) {
				if (
					inputValue.every((value) =>
						new RegExp(regexp.pattern, regexp.flags).test(value)
					)
				) {
					this.showField = !getConditionInert(condition);
				}
			}

			if (!isMultiValues) {
				if (new RegExp(regexp.pattern, regexp.flags).test(inputValue)) {
					this.showField = !getConditionInert(condition);
				}
			}
		},

		ELEMENT: (condition, $selector, $selectors, caller) => {
			const selector = getConditionSelector(condition);
			const element = getConditionValue(condition);

			const $elements = document.querySelectorAll(element);

			const inputValue = getInputValue($selector, $selectors);
			const COMPARE_FUNCTION = getConditionCheck(condition);
			const isElementCaller = ['ELEMENT_INPUT', 'ELEMENT_INIT'].includes(
				caller
			);
			const target = isElementCaller ? selector : element;
			const compareValues = getElementValues(
				document.querySelectorAll(target)
			);

			// ELEMENT SELECTOR.
			if (isElementCaller) {
				const c = { ...condition, value: compareValues };

				console.log(c, $selector);
				COMPARE_FUNCTIONS[COMPARE_FUNCTION](c, $selector, $selectors);
			} else {
				// MAIN SELECTOR.
				const c = { ...condition, value: compareValues };
				if (COMPARE_FUNCTION === 'EXISTS') {
					return;
				}

				console.log(c, $selector);

				COMPARE_FUNCTIONS[COMPARE_FUNCTION](c, $selector, $selectors);
			}

			/*$elements.forEach(($element) => {
				const elementValue = getInputValue($element, $elements);

				if (COMPARE_FUNCTION === 'EXISTS' && elementValue.length > 0) {
					this.showField = !getConditionInert(condition);
				}

				if (COMPARE_FUNCTION === 'STRING' && elementValue.length > 0) {
					this.showField = !getConditionInert(condition);
				}
			});*/

			// setConditionValue(condition, elementValues);

			// this.showField = getConditionInert(condition);
		},
	};

	const toggleInertAttribute = (value = true) => {
		if (value === true) {
			this.$element.setAttribute('inert', '');
		} else {
			this.$element.removeAttribute('inert');
		}
	};

	// Check
	const checkConditions = (condition, $selector, $selectors, caller) => {
		const COMPARE_FUNCTION = getConditionFn(condition);

		if (typeof COMPARE_FUNCTIONS[COMPARE_FUNCTION] === 'function') {
			COMPARE_FUNCTIONS[COMPARE_FUNCTION](
				condition,
				$selector,
				$selectors,
				caller
			);
		} else {
			throw new Error(
				'Compare function "' + COMPARE_FUNCTION + '" not available.'
			);
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

		if (this.relation === 'XOR') {
			if (
				[...this.matched.values()].filter((t) => t === true).length ===
				1
			) {
				toggleInertAttribute(false);
			} else {
				toggleInertAttribute(true);
			}
		}

		if (this.relation === 'NOT') {
			if (![...this.matched.values()].every((t) => t === true)) {
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

	const isArrayValue = (condition) =>
		typeof condition[getValueOperatorKey()] === 'object' &&
		Array.isArray(condition[getValueOperatorKey()]);

	const normalizeCondition = (condition) => {
		// Remove Predefined FN, we will add fn based on type.
		delete condition[getFnOperatorKey()];

		// Set default compare = EQ.
		if (typeof getConditionCompare(condition) === 'undefined') {
			setConditionCompare(condition, getCompareOperatorDefault());
		}

		// Check from ELEMENT Type.
		if (typeof getConditionCheck(condition) === 'undefined') {
			setConditionCheck(condition, getCheckOperatorDefault());
		}

		// Set default strict = false, will use for array values.
		if (typeof getConditionStrict(condition) === 'undefined') {
			setConditionStrict(condition, getStrictOperatorDefault());
		}

		if (typeof getConditionRequire(condition) === 'undefined') {
			setConditionRequire(condition, getRequireOperatorDefault());
		}

		// Set require false if strict is true.
		if (getConditionStrict(condition) === true) {
			setConditionRequire(condition, false);
		}

		// Set default case = false
		if (typeof getConditionCase(condition) === 'undefined') {
			setConditionCase(condition, getCaseOperatorDefault());
		}

		// Set default inert = false
		if (typeof getConditionInert(condition) === 'undefined') {
			setConditionInert(condition, getInertOperatorDefault());
		}

		// Set default type = BOOLEAN
		if (typeof getConditionType(condition) === 'undefined') {
			setConditionType(condition, getTypeOperatorDefault());
		}

		// Set default value = false
		if (typeof getConditionValue(condition) === 'undefined') {
			setConditionValue(condition, getValueOperatorDefault());
		}

		// Decision based on type.

		// If "value" type boolean.
		if (typeof getConditionValue(condition) === 'boolean') {
			setConditionType(condition, 'BOOLEAN');

			if (getConditionValue(condition) === false) {
				setConditionInert(condition, true);
			}

			setConditionFn(
				condition,
				getFnNameByType(getConditionType(condition))
			);
		}

		// If "value" type string.
		if (typeof getConditionValue(condition) === 'string') {
			// Check for ELEMENT type.

			if (!['ELEMENT'].includes(getConditionType(condition))) {
				setConditionType(condition, 'STRING');
			}

			setConditionFn(
				condition,
				getFnNameByType(getConditionType(condition))
			);
		}

		// If "value" type number.
		if (typeof getConditionValue(condition) === 'number') {
			setConditionType(condition, 'NUMBER');
			setConditionFn(
				condition,
				getFnNameByType(getConditionType(condition))
			);
		}

		// If "value" type array.
		if (isArrayValue(condition)) {
			const IS_NUMBER_ARRAY = getConditionValue(condition).every(
				(v) => typeof v === 'number'
			);

			if (IS_NUMBER_ARRAY) {
				// Check for MINMAX and RANGE type.
				if (
					!['MINMAX', 'RANGE'].includes(getConditionType(condition))
				) {
					setConditionType(condition, 'NUMBER-ARRAY');
				}

				setConditionFn(
					condition,
					getFnNameByType(getConditionType(condition))
				);
			} else {
				setConditionType(condition, 'STRING-ARRAY');
				setConditionFn(
					condition,
					getFnNameByType(getConditionType(condition))
				);
			}
		}

		// If "value" type RegExp.
		if (isValidRegExp(getConditionValue(condition))) {
			setConditionType(condition, 'REGEXP');
			setConditionFn(
				condition,
				getFnNameByType(getConditionType(condition))
			);
		}

		// ELEMENT TYPE.
		/*if (['ELEMENT'].includes(getConditionType(condition))) {
			setConditionType(condition, 'ELEMENT');
		}*/

		return condition;
	};

	const prepareConditions = () => {
		for (const key in this.settings) {
			if (!isNaN(key)) {
				const condition = this.settings[key];
				this.conditions.push(normalizeCondition(condition));
			}
		}

		if (this.conditions.length < 1) {
			const condition = this.settings;

			this.conditions.push(normalizeCondition(condition));
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

			if (getConditionType(condition) === 'ELEMENT') {
				const $elements = document.querySelectorAll(
					getConditionValue(condition)
				);

				$elements.forEach(($selector) => {
					OPERATORS.EVENTS.forEach((eventType) => {
						$selector.addEventListener(
							eventType,
							(event) => {
								checkConditions(
									condition,
									event.target,
									$elements,
									'ELEMENT_INPUT'
								);
							},
							{ signal: this.signal, passive: true }
						);
					});

					checkConditions(
						condition,
						$selector,
						$selectors,
						'ELEMENT_INIT'
					);
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
								$selectors,
								'SELECTOR_INPUT'
							);
						},
						{ signal: this.signal, passive: true }
					);
				});

				checkConditions(
					condition,
					$selector,
					$selectors,
					'SELECTOR_INIT'
				);
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
