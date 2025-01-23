const restrictedImports = [
	{
		name: 'lodash',
		importNames: [
			'camelCase',
			'capitalize',
			'castArray',
			'chunk',
			'clamp',
			'clone',
			'cloneDeep',
			'compact',
			'concat',
			'countBy',
			'debounce',
			'deburr',
			'defaults',
			'defaultTo',
			'delay',
			'difference',
			'differenceWith',
			'dropRight',
			'each',
			'escape',
			'escapeRegExp',
			'every',
			'extend',
			'filter',
			'find',
			'findIndex',
			'findKey',
			'findLast',
			'first',
			'flatMap',
			'flatten',
			'flattenDeep',
			'flow',
			'flowRight',
			'forEach',
			'fromPairs',
			'has',
			'identity',
			'includes',
			'invoke',
			'isArray',
			'isBoolean',
			'isEqual',
			'isFinite',
			'isFunction',
			'isMatch',
			'isNil',
			'isNumber',
			'isObject',
			'isObjectLike',
			'isPlainObject',
			'isString',
			'isUndefined',
			'keyBy',
			'keys',
			'last',
			'lowerCase',
			'map',
			'mapKeys',
			'maxBy',
			'memoize',
			'merge',
			'negate',
			'noop',
			'nth',
			'omit',
			'omitBy',
			'once',
			'orderby',
			'overEvery',
			'partial',
			'partialRight',
			'pick',
			'pickBy',
			'random',
			'reduce',
			'reject',
			'repeat',
			'reverse',
			'setWith',
			'size',
			'snakeCase',
			'some',
			'sortBy',
			'startCase',
			'startsWith',
			'stubFalse',
			'stubTrue',
			'sum',
			'sumBy',
			'take',
			'throttle',
			'times',
			'toString',
			'trim',
			'truncate',
			'unescape',
			'unionBy',
			'uniq',
			'uniqBy',
			'uniqueId',
			'uniqWith',
			'upperFirst',
			'values',
			'without',
			'words',
			'xor',
			'zip',
		],
		message:
			'This Lodash method is not recommended. Please use native functionality instead. If using `memoize`, please use `memize` instead.',
	},
	{
		name: 'classnames',
		message:
			"Please use `clsx` instead. It's a lighter and faster drop-in replacement for `classnames`.",
	},
];

module.exports = {
	root: true,
	extends: [
		'plugin:@woocommerce/eslint-plugin/recommended',
		'plugin:you-dont-need-lodash-underscore/compatible',
	],
	settings: {
		// List of modules that are externals in our webpack config.
		// This helps the `import/no-extraneous-dependencies` and
		//`import/no-unresolved` rules account for them.
		'import/core-modules': [
			'@woocommerce/blocks-registry',
			'@wordpress/is-shallow-equal',
			'@woocommerce/block-data',
			'@woocommerce/blocks-checkout',
			'@woocommerce/price-format',
			'@woocommerce/settings',
			'@woocommerce/shared-context',
			'@woocommerce/shared-hocs',
			'@woocommerce/data',
			'@wordpress/components',
			'@wordpress/i18n',
			'@wordpress/blocks',
			'@wordpress/a11y',
			'@wordpress/api-fetch',
			'@wordpress/block-editor',
			'@wordpress/compose',
			'@wordpress/data',
			'@wordpress/core-data',
			'@wordpress/editor',
			'@wordpress/escape-html',
			'@wordpress/hooks',
			'@wordpress/keycodes',
			'@wordpress/url',
			'@wordpress/element',
			'@woocommerce/blocks-test-utils',
			'@woocommerce/e2e-utils',
			'lodash',
			'jquery',
			'@storepress/utils',
			'@utils', // See: getWebPackAlias() from tools/webpack-helpers.js
		],
		'import/resolver': {
			node: {},
			webpack: {},
        },
	},
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	globals: {
		jQuery: 'readonly',
		wp: true,
		wpApiSettings: true,
		wcSettings: true,
		es6: true,
		StorePress: true,
	},
	rules: {
		'@woocommerce/dependency-group': 'off',
		'@wordpress/no-unsafe-wp-apis': 'warn',
		'react/react-in-jsx-scope': 'off',
		'no-restricted-imports': [
			'error',
			{
				paths: restrictedImports,
			},
		],
		'@wordpress/no-global-active-element': 'warn'
	},
};
