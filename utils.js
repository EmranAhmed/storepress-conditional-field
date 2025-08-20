'use strict';

const namespace = 'Utils';

/**
 * Converts a string to kebab-case (also known as dash-case or lisp-case).
 *
 * This function transforms strings from various naming conventions (camelCase,
 * PascalCase, snake_case, dot.case, or space separated) into kebab-case format
 * where words are lowercase and separated by hyphens.
 *
 * @param {string} string - The input string to convert to kebab-case
 * @returns {string} The converted string in kebab-case format
 *
 * @example
 * // Converting from camelCase
 * toKebabCase('firstName') // Returns: 'first-name'
 * toKebabCase('getUserById') // Returns: 'get-user-by-id'
 *
 * @example
 * // Converting from PascalCase
 * toKebabCase('UserProfile') // Returns: 'user-profile'
 * toKebabCase('XMLHttpRequest') // Returns: 'xmlhttp-request'
 *
 * @example
 * // Converting from snake_case
 * toKebabCase('user_name') // Returns: 'user-name'
 * toKebabCase('API_KEY_SECRET') // Returns: 'api-key-secret'
 *
 * @example
 * // Converting from space separated
 * toKebabCase('hello world') // Returns: 'hello-world'
 * toKebabCase('My Custom Component') // Returns: 'my-custom-component'
 *
 * @example
 * // Converting from dot.case
 * toKebabCase('config.database.url') // Returns: 'config-database-url'
 *
 * @example
 * // Handling edge cases
 * toKebabCase('already-kebab-case') // Returns: 'already-kebab-case'
 * toKebabCase('--leading-trailing--') // Returns: 'leading-trailing'
 * toKebabCase('iPhone13Pro') // Returns: 'i-phone13-pro'
 *
 * @since 0.8.0
 *
 */
export function toKebabCase( string ) {
	return (
		string
			// Find uppercase letters and insert hyphen before them, then lowercase the letter
			.replace( /([A-Z])/g, ( match, p1 ) => `-${ p1.toLowerCase() }` )
			// Replace any underscores, dots, or spaces with hyphens
			.replace( /[-._:~\s]/g, '-' )
			// Remove any leading or trailing hyphens that may have been created
			.replace( /^-+|-+$/g, '' )
			// Convert the entire string to lowercase
			.toLowerCase()
	);
}

/**
 * Converts a string to snake_case (also known as underscore_case).
 *
 * This function transforms strings from various naming conventions (camelCase,
 * PascalCase, kebab-case, dot.case, or space separated) into snake_case format
 * where words are lowercase and separated by underscores.
 *
 * @param {string} string - The input string to convert to snake_case
 * @returns {string} The converted string in snake_case format
 *
 * @example
 * // Converting from camelCase
 * toSnakeCase('firstName') // Returns: 'first_name'
 * toSnakeCase('getUserById') // Returns: 'get_user_by_id'
 * toSnakeCase('isActiveUser') // Returns: 'is_active_user'
 *
 * @example
 * // Converting from PascalCase
 * toSnakeCase('UserProfile') // Returns: 'user_profile'
 * toSnakeCase('XMLHttpRequest') // Returns: 'xmlhttp_request'
 * toSnakeCase('DatabaseConnection') // Returns: 'database_connection'
 *
 * @example
 * // Converting from kebab-case
 * toSnakeCase('user-name') // Returns: 'user_name'
 * toSnakeCase('api-key-secret') // Returns: 'api_key_secret'
 * toSnakeCase('custom-component') // Returns: 'custom_component'
 *
 * @example
 * // Converting from space separated
 * toSnakeCase('hello world') // Returns: 'hello_world'
 * toSnakeCase('My Custom Function') // Returns: 'my_custom_function'
 * toSnakeCase('User Profile Settings') // Returns: 'user_profile_settings'
 *
 * @example
 * // Converting from dot.case
 * toSnakeCase('config.database.url') // Returns: 'config_database_url'
 * toSnakeCase('app.settings.theme') // Returns: 'app_settings_theme'
 *
 * @example
 * // Handling edge cases
 * toSnakeCase('already_snake_case') // Returns: 'already_snake_case'
 * toSnakeCase('__leading_trailing__') // Returns: 'leading_trailing'
 * toSnakeCase('iPhone13Pro') // Returns: 'i_phone13_pro'
 * toSnakeCase('HTTPSConnection') // Returns: 'httpsconnection'
 *
 * @example
 * // Real-world usage in API transformation
 * const userData = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   emailAddress: 'john@example.com',
 *   phoneNumber: '+1234567890'
 * };
 *
 * // Transform object keys to snake_case for API
 * const apiData = Object.fromEntries(
 *   Object.entries(userData).map(([key, value]) => [toSnakeCase(key), value])
 * );
 * // Result: { first_name: 'John', last_name: 'Doe', email_address: 'john@example.com', phone_number: '+1234567890' }
 * @since 0.8.0
 *
 */
export function toSnakeCase( string ) {
	return (
		string
			// Find uppercase letters and insert underscore before them, then lowercase the letter
			.replace( /([A-Z])/g, ( match, p1 ) => `_${ p1.toLowerCase() }` )
			// Replace any hyphens, dots, or spaces with underscores
			.replace( /[-._:~\s]/g, '_' )
			// Remove any leading or trailing underscores that may have been created
			.replace( /^_+|_+$/g, '' )
			// Convert the entire string to lowercase
			.toLowerCase()
	);
}

/**
 * Converts a string to CONSTANT_CASE (also known as SCREAMING_SNAKE_CASE or UPPER_SNAKE_CASE).
 *
 * This function transforms strings from various naming conventions (camelCase,
 * PascalCase, kebab-case, snake_case, dot.case, or space separated) into CONSTANT_CASE
 * format where words are uppercase and separated by underscores. This is the standard
 * convention for constants, environment variables, and configuration keys.
 *
 * @param {string} string - The input string to convert to CONSTANT_CASE
 * @returns {string} The converted string in CONSTANT_CASE format
 *
 * @example
 * // Converting from camelCase
 * toConstantCase('apiKey') // Returns: 'API_KEY'
 * toConstantCase('maxRetryAttempts') // Returns: 'MAX_RETRY_ATTEMPTS'
 * toConstantCase('databaseUrl') // Returns: 'DATABASE_URL'
 *
 * @example
 * // Converting from PascalCase
 * toConstantCase('UserProfile') // Returns: 'USER_PROFILE'
 * toConstantCase('XMLHttpRequest') // Returns: 'XMLHTTP_REQUEST'
 * toConstantCase('DatabaseConnection') // Returns: 'DATABASE_CONNECTION'
 *
 * @example
 * // Converting from kebab-case
 * toConstantCase('api-key') // Returns: 'API_KEY'
 * toConstantCase('max-retry-attempts') // Returns: 'MAX_RETRY_ATTEMPTS'
 * toConstantCase('cache-timeout') // Returns: 'CACHE_TIMEOUT'
 *
 * @example
 * // Converting from snake_case
 * toConstantCase('user_name') // Returns: 'USER_NAME'
 * toConstantCase('jwt_secret') // Returns: 'JWT_SECRET'
 * toConstantCase('default_timeout') // Returns: 'DEFAULT_TIMEOUT'
 *
 * @example
 * // Converting from space separated
 * toConstantCase('hello world') // Returns: 'HELLO_WORLD'
 * toConstantCase('My Custom Config') // Returns: 'MY_CUSTOM_CONFIG'
 * toConstantCase('Database Connection String') // Returns: 'DATABASE_CONNECTION_STRING'
 *
 * @example
 * // Converting from dot.case
 * toConstantCase('config.database.url') // Returns: 'CONFIG_DATABASE_URL'
 * toConstantCase('app.settings.theme') // Returns: 'APP_SETTINGS_THEME'
 *
 * @example
 * // Handling edge cases and multiple separators
 * toConstantCase('ALREADY_CONSTANT_CASE') // Returns: 'ALREADY_CONSTANT_CASE'
 * toConstantCase('--leading--trailing--') // Returns: 'LEADING_TRAILING'
 * toConstantCase('iPhone13Pro') // Returns: 'I_PHONE13_PRO'
 * toConstantCase('multiple   spaces') // Returns: 'MULTIPLE_SPACES'
 * toConstantCase('mixed-case_input.test') // Returns: 'MIXED_CASE_INPUT_TEST'
 *
 * @example
 * // Real-world usage: Generate environment variable mappings
 * const configMappings = [
 *   'databaseUrl',
 *   'jwtSecret',
 *   'redisPort',
 *   'maxUploadSize',
 *   'enableLogging'
 * ];
 *
 * const envVars = configMappings.reduce((acc, key) => {
 *   acc[key] = process.env[toConstantCase(key)];
 *   return acc;
 * }, {});
 *
 * // Result:
 * // {
 * //   databaseUrl: process.env.DATABASE_URL,
 * //   jwtSecret: process.env.JWT_SECRET,
 * //   redisPort: process.env.REDIS_PORT,
 * //   maxUploadSize: process.env.MAX_UPLOAD_SIZE,
 * //   enableLogging: process.env.ENABLE_LOGGING
 * // }
 *
 * @example
 * // Code generation for constants file
 * const apiEndpoints = ['userProfile', 'orderHistory', 'paymentMethods'];
 *
 * console.log('export const API_ENDPOINTS = {');
 * apiEndpoints.forEach(endpoint => {
 *   const constant = toConstantCase(endpoint);
 *   console.log(`  ${constant}: '/${toKebabCase(endpoint)}',`);
 * });
 * console.log('};');
 *
 * // Output:
 * // export const API_ENDPOINTS = {
 * //   USER_PROFILE: '/user-profile',
 * //   ORDER_HISTORY: '/order-history',
 * //   PAYMENT_METHODS: '/payment-methods',
 * // };
 *
 * @since 0.8.0
 *
 */
export function toConstantCase( string ) {
	return (
		string
			// Insert underscores before uppercase letters (but not at start)
			.replace( /([a-z0-9])([A-Z])/g, '$1_$2' )
			// Replace any separator characters with underscore
			.replace( /[-._:~\s]+/g, '_' )
			// Remove leading/trailing underscores
			.replace( /^_+|_+$/g, '' )
			// Convert the entire string to uppercase
			.toUpperCase()
	);
}

/**
 * Converts a string to camelCase format by lowercasing the first letter and capitalizing
 * every letter that follows a space, hyphen, or underscore, then removing the separators.
 *
 * This function transforms strings from various naming conventions (kebab-case, snake_case,
 * PascalCase, space-separated, etc.) into camelCase format, which is the standard naming
 * convention for variables, properties, and method names in JavaScript.
 *
 * @param {string} string - The string to convert to camelCase
 * @returns {string} The converted string in camelCase format
 *
 * @example
 * // Basic conversions from different formats
 * console.log(toCamelCase('hello world')); // 'helloWorld'
 * console.log(toCamelCase('user-profile')); // 'userProfile'
 * console.log(toCamelCase('api_endpoint')); // 'apiEndpoint'
 * console.log(toCamelCase('my-custom-component')); // 'myCustomComponent'
 *
 * @example
 * // Converting from PascalCase to camelCase
 * console.log(toCamelCase('UserProfile')); // 'userProfile'
 * console.log(toCamelCase('APIEndpoint')); // 'aPIEndpoint'
 * console.log(toCamelCase('MyCustomComponent')); // 'myCustomComponent'
 *
 * @example
 * // Mixed separators and complex cases
 * console.log(toCamelCase('data-api_handler')); // 'dataApiHandler'
 * console.log(toCamelCase('multi word-string_test')); // 'multiWordStringTest'
 * console.log(toCamelCase('HTTP-Status_Code')); // 'hTTPStatusCode'
 * console.log(toCamelCase('already-camelCased')); // 'alreadyCamelCased'
 *
 * @example
 * // Edge cases and empty inputs
 * console.log(toCamelCase('')); // ''
 * console.log(toCamelCase('a')); // 'a'
 * console.log(toCamelCase('A')); // 'a'
 * console.log(toCamelCase('a-b')); // 'aB'
 * console.log(toCamelCase('---')); // ''
 *
 * @example
 * // Use case: HTML data attribute parsing
 * function parseDataAttributes(element) {
 *   const attributes = {};
 *
 *   Array.from(element.attributes).forEach(attr => {
 *     if (attr.name.startsWith('data-')) {
 *       // Convert data-user-name to userName
 *       const key = toCamelCase(attr.name.replace('data-', ''));
 *       attributes[key] = attr.value;
 *     }
 *   });
 *
 *   return attributes;
 * }
 *
 * // HTML: <div data-user-name="John" data-max-items="10" data-is-active="true">
 * const attrs = parseDataAttributes(element);
 * // Result: { userName: "John", maxItems: "10", isActive: "true" }
 *
 * @example
 * // Use case: CSS property name conversion
 * function setStyles(element, styleObject) {
 *   Object.entries(styleObject).forEach(([key, value]) => {
 *     // Convert kebab-case CSS properties to camelCase
 *     const camelKey = toCamelCase(key);
 *     element.style[camelKey] = value;
 *   });
 * }
 *
 * // Usage
 * setStyles(element, {
 *   'background-color': '#fff',
 *   'margin-top': '20px',
 *   'border-radius': '5px',
 *   'font-size': '14px'
 * });
 * // Sets: backgroundColor, marginTop, borderRadius, fontSize
 *
 * @example
 * // Use case: Configuration object normalization
 * function normalizeConfig(config) {
 *   const normalized = {};
 *
 *   Object.entries(config).forEach(([key, value]) => {
 *     const camelKey = toCamelCase(key);
 *
 *     if (typeof value === 'object' && value !== null) {
 *       normalized[camelKey] = normalizeConfig(value); // Recursive
 *     } else {
 *       normalized[camelKey] = value;
 *     }
 *   });
 *
 *   return normalized;
 * }
 *
 * // Input with mixed naming conventions
 * const config = {
 *   'user-name': 'John',
 *   'api_endpoint': '/api/users',
 *   'MaxRetries': 3,
 *   'cache_settings': {
 *     'time-to-live': 300,
 *     'max_size': 1000
 *   }
 * };
 *
 * const normalized = normalizeConfig(config);
 * // Result: {
 * //   userName: 'John',
 * //   apiEndpoint: '/api/users',
 * //   maxRetries: 3,
 * //   cacheSettings: {
 * //     timeToLive: 300,
 * //     maxSize: 1000
 * //   }
 * // }
 *
 * @example
 * // Use case: API response transformation
 * function transformApiResponse(response) {
 *   if (Array.isArray(response)) {
 *     return response.map(item => transformApiResponse(item));
 *   }
 *
 *   if (typeof response === 'object' && response !== null) {
 *     const transformed = {};
 *
 *     Object.entries(response).forEach(([key, value]) => {
 *       // Convert snake_case API keys to camelCase
 *       const camelKey = toCamelCase(key);
 *       transformed[camelKey] = transformApiResponse(value);
 *     });
 *
 *     return transformed;
 *   }
 *
 *   return response;
 * }
 *
 * // API response with snake_case
 * const apiResponse = {
 *   user_id: 123,
 *   first_name: 'John',
 *   last_name: 'Doe',
 *   account_settings: {
 *     email_notifications: true,
 *     privacy_level: 'public'
 *   },
 *   recent_orders: [
 *     { order_id: 1, created_at: '2023-01-01' }
 *   ]
 * };
 *
 * const jsResponse = transformApiResponse(apiResponse);
 * // Result: {
 * //   userId: 123,
 * //   firstName: 'John',
 * //   lastName: 'Doe',
 * //   accountSettings: {
 * //     emailNotifications: true,
 * //     privacyLevel: 'public'
 * //   },
 * //   recentOrders: [
 * //     { orderId: 1, createdAt: '2023-01-01' }
 * //   ]
 * // }
 *
 * @example
 * // Use case: Form field name mapping
 * function createFormHandler(fieldMappings) {
 *   return function(formData) {
 *     const processedData = {};
 *
 *     formData.forEach((value, key) => {
 *       // Convert form field names to camelCase property names
 *       const propName = toCamelCase(key);
 *
 *       // Apply field mapping if exists
 *       const mappedName = fieldMappings[propName] || propName;
 *       processedData[mappedName] = value;
 *     });
 *
 *     return processedData;
 *   };
 * }
 *
 * // Form with kebab-case field names
 * // <input name="first-name" value="John">
 * // <input name="email-address" value="john@example.com">
 * // <input name="phone-number" value="123-456-7890">
 *
 * const handler = createFormHandler({
 *   emailAddress: 'email',
 *   phoneNumber: 'phone'
 * });
 *
 * const result = handler(formData);
 * // Result: { firstName: 'John', email: 'john@example.com', phone: '123-456-7890' }
 *
 * @example
 * // Use case: Event name normalization for listeners
 * class EventEmitter {
 *   constructor() {
 *     this.listeners = {};
 *   }
 *
 *   on(eventName, callback) {
 *     // Normalize event names to camelCase
 *     const normalizedName = toCamelCase(eventName);
 *
 *     if (!this.listeners[normalizedName]) {
 *       this.listeners[normalizedName] = [];
 *     }
 *
 *     this.listeners[normalizedName].push(callback);
 *   }
 *
 *   emit(eventName, ...args) {
 *     const normalizedName = toCamelCase(eventName);
 *     const callbacks = this.listeners[normalizedName] || [];
 *
 *     callbacks.forEach(callback => callback(...args));
 *   }
 * }
 *
 * // Usage with different naming conventions
 * const emitter = new EventEmitter();
 *
 * emitter.on('user-login', (user) => console.log('Login:', user));
 * emitter.on('user_logout', () => console.log('Logout'));
 * emitter.on('DataLoaded', (data) => console.log('Data:', data));
 *
 * // All these trigger the same normalized event
 * emitter.emit('user-login', { id: 1 });
 * emitter.emit('userLogin', { id: 1 });
 * emitter.emit('UserLogin', { id: 1 });
 *
 * @example
 * // Use case: Environment variable processing
 * function loadEnvConfig(envPrefix = 'APP_') {
 *   const config = {};
 *
 *   Object.entries(process.env).forEach(([key, value]) => {
 *     if (key.startsWith(envPrefix)) {
 *       // Convert APP_DATABASE_URL to databaseUrl
 *       const configKey = toCamelCase(
 *         key.replace(envPrefix, '').toLowerCase().replace(/_/g, '-')
 *       );
 *
 *       config[configKey] = value;
 *     }
 *   });
 *
 *   return config;
 * }
 *
 * // Environment variables:
 * // APP_DATABASE_URL=postgresql://...
 * // APP_REDIS_HOST=localhost
 * // APP_MAX_CONNECTIONS=10
 *
 * const config = loadEnvConfig();
 * // Result: {
 * //   databaseUrl: 'postgresql://...',
 * //   redisHost: 'localhost',
 * //   maxConnections: '10'
 * // }
 *
 * @example
 * // Use case: GraphQL field name transformation
 * function transformGraphQLResponse(data, schema) {
 *   if (Array.isArray(data)) {
 *     return data.map(item => transformGraphQLResponse(item, schema));
 *   }
 *
 *   if (typeof data === 'object' && data !== null) {
 *     const transformed = {};
 *
 *     Object.entries(data).forEach(([key, value]) => {
 *       // Convert GraphQL field names to camelCase
 *       const jsKey = toCamelCase(key);
 *
 *       if (schema && schema[jsKey]) {
 *         transformed[jsKey] = transformGraphQLResponse(value, schema[jsKey]);
 *       } else {
 *         transformed[jsKey] = value;
 *       }
 *     });
 *
 *     return transformed;
 *   }
 *
 *   return data;
 * }
 *
 * // GraphQL response
 * const gqlResponse = {
 *   user_profile: {
 *     first_name: 'John',
 *     profile_image_url: 'https://...',
 *     social_links: [
 *       { platform_name: 'twitter', profile_url: 'https://...' }
 *     ]
 *   }
 * };
 *
 * const jsResponse = transformGraphQLResponse(gqlResponse);
 * // Result: {
 * //   userProfile: {
 * //     firstName: 'John',
 * //     profileImageUrl: 'https://...',
 * //     socialLinks: [
 * //       { platformName: 'twitter', profileUrl: 'https://...' }
 * //     ]
 * //   }
 * // }
 *
 * @see https://en.wikipedia.org/wiki/Camel_case Camel Case - Wikipedia
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace String.replace() - MDN
 * @see https://google.github.io/styleguide/jsguide.html#naming-camel-case Google JavaScript Style Guide - Camel Case
 *
 * @since 0.3.0
 */
export function toCamelCase( string ) {
	return (
		string
			// Match:
			// 1) uppercase letter at start ^([A-Z])
			// OR
			// 2) word char after separator [-._:~\s](\w)
			// If separator+char: uppercase the char | If start uppercase: lowercase it
			.replace( /^([a-z])|[-._:~\s](\w)/gi, ( match, p1, p2 ) => {
				if ( p2 ) return p2.toUpperCase(); // Found char after separator - make it uppercase
				return p1.toLowerCase(); // Found uppercase at start - make it lowercase
			} )
	);
}

/**
 * Converts a string to UpperCamelCase (PascalCase) format by capitalizing the first letter
 * and every letter that follows a dot, space, hyphen, or underscore, then removing the separators.
 *
 * This function transforms strings from various naming conventions (kebab-case, snake_case,
 * space-separated, dot.separated, etc.) into UpperCamelCase format, which is commonly used for class names,
 * constructor functions, and component names in JavaScript.
 *
 * @param {string} string - The string to convert to UpperCamelCase
 * @returns {string} The converted string in UpperCamelCase format
 *
 * @example
 * // Basic conversions from different formats
 * console.log(toUpperCamelCase('hello world')); // 'HelloWorld'
 * console.log(toUpperCamelCase('user-profile')); // 'UserProfile'
 * console.log(toUpperCamelCase('api_endpoint')); // 'ApiEndpoint'
 * console.log(toUpperCamelCase('my-custom-component')); // 'MyCustomComponent'
 * console.log(toUpperCamelCase('my.style')); // 'MyStyle'
 *
 * @example
 * // Mixed separators and edge cases
 * console.log(toUpperCamelCase('data-api_handler')); // 'DataApiHandler'
 * console.log(toUpperCamelCase('multi word-string_test')); // 'MultiWordStringTest'
 * console.log(toUpperCamelCase('single')); // 'Single'
 * console.log(toUpperCamelCase('already-Capitalized')); // 'AlreadyCapitalized'
 *
 * @example
 * // Empty and edge case inputs
 * console.log(toUpperCamelCase('')); // ''
 * console.log(toUpperCamelCase('a')); // 'A'
 * console.log(toUpperCamelCase('a-b')); // 'AB'
 * console.log(toUpperCamelCase('---')); // ''
 *
 * @example
 * // Use case: Class name generation from configuration
 * function createComponentClass(componentName, options = {}) {
 *   const className = toUpperCamelCase(componentName);
 *
 *   // Dynamic class creation
 *   const ComponentClass = class {
 *     constructor(element) {
 *       this.element = element;
 *       this.name = className;
 *       this.init(options);
 *     }
 *
 *     init(options) {
 *       console.log(`Initializing ${this.name} component`);
 *     }
 *   };
 *
 *   // Set the class name for debugging
 *   Object.defineProperty(ComponentClass, 'name', { value: className });
 *
 *   return ComponentClass;
 * }
 *
 * // Usage
 * const ModalComponent = createComponentClass('modal-dialog');
 * const TabsComponent = createComponentClass('navigation_tabs');
 * const SliderComponent = createComponentClass('image slider');
 *
 * @example
 * // Use case: CSS class name to constructor mapping
 * const componentRegistry = {};
 *
 * function registerComponent(cssClass, implementation) {
 *   const constructorName = toUpperCamelCase(cssClass);
 *   componentRegistry[constructorName] = implementation;
 * }
 *
 * function createComponent(cssClass, element) {
 *   const constructorName = toUpperCamelCase(cssClass);
 *   const ComponentClass = componentRegistry[constructorName];
 *
 *   if (ComponentClass) {
 *     return new ComponentClass(element);
 *   }
 *
 *   throw new Error(`Component ${constructorName} not found`);
 * }
 *
 * // Register components
 * registerComponent('dropdown-menu', DropdownMenuComponent);
 * registerComponent('date_picker', DatePickerComponent);
 *
 * // Create instances
 * const dropdown = createComponent('dropdown-menu', dropdownElement);
 * const datePicker = createComponent('date_picker', dateElement);
 *
 * @example
 * // Use case: API endpoint to service class mapping
 * function createServiceClass(endpointName) {
 *   const serviceName = toUpperCamelCase(endpointName) + 'Service';
 *
 *   return class {
 *     constructor(baseUrl) {
 *       this.baseUrl = baseUrl;
 *       this.endpoint = endpointName;
 *     }
 *
 *     async get(id) {
 *       const response = await fetch(`${this.baseUrl}/${this.endpoint}/${id}`);
 *       return response.json();
 *     }
 *
 *     toString() {
 *       return serviceName;
 *     }
 *   };
 * }
 *
 * // Generate service classes
 * const UserService = createServiceClass('user-profile');
 * const OrderService = createServiceClass('order_history');
 * const ProductService = createServiceClass('product catalog');
 *
 * @example
 * // Use case: Template name to component name conversion
 * function loadTemplate(templateName) {
 *   const componentName = toUpperCamelCase(templateName);
 *
 *   return {
 *     name: componentName,
 *     template: `templates/${templateName}.html`,
 *     component: `components/${componentName}.js`,
 *     styles: `styles/${templateName}.css`
 *   };
 * }
 *
 * // Usage
 * const modal = loadTemplate('modal-dialog');
 * // Result: {
 * //   name: 'ModalDialog',
 * //   template: 'templates/modal-dialog.html',
 * //   component: 'components/ModalDialog.js',
 * //   styles: 'styles/modal-dialog.css'
 * // }
 *
 * @example
 * // Use case: Form field name to validator class
 * const validators = {
 *   EmailValidator: class {  }, // email validation logic
 *   PasswordValidator: class { }, // password validation logic
 *   PhoneNumberValidator: class { } // phone validation logic
 * };
 *
 * function getValidator(fieldName) {
 *   const validatorName = toUpperCamelCase(fieldName) + 'Validator';
 *   return validators[validatorName] || null;
 * }
 *
 * // Usage
 * const emailValidator = getValidator('email-field');
 * const passwordValidator = getValidator('password_confirmation');
 * const phoneValidator = getValidator('phone number');
 *
 * @example
 * // Use case: Module name normalization for dynamic imports
 * async function loadModule(moduleName) {
 *   const normalizedName = toUpperCamelCase(moduleName);
 *
 *   try {
 *     const module = await import(`./modules/${normalizedName}.js`);
 *     return module.default || module;
 *   } catch (error) {
 *     console.error(`Failed to load module ${normalizedName}:`, error);
 *     return null;
 *   }
 * }
 *
 * // Load modules with consistent naming
 * const chartModule = await loadModule('chart-renderer');
 * const dataModule = await loadModule('data_processor');
 * const utilModule = await loadModule('utility helpers');
 *
 * @example
 * // Use case: Event handler method generation
 * class EventManager {
 *   constructor() {
 *     this.handlers = {};
 *   }
 *
 *   on(eventName, callback) {
 *     const methodName = 'handle' + toUpperCamelCase(eventName);
 *
 *     this[methodName] = callback;
 *     this.handlers[eventName] = methodName;
 *
 *     console.log(`Registered ${methodName} for ${eventName}`);
 *   }
 *
 *   trigger(eventName, ...args) {
 *     const methodName = this.handlers[eventName];
 *     if (methodName && this[methodName]) {
 *       this[methodName](...args);
 *     }
 *   }
 * }
 *
 * // Usage
 * const events = new EventManager();
 * events.on('user-login', (user) => console.log('User logged in:', user));
 * events.on('data_loaded', (data) => console.log('Data loaded:', data));
 *
 * // Creates methods: handleUserLogin, handleDataLoaded
 *
 * @see https://en.wikipedia.org/wiki/Camel_case Camel Case - Wikipedia
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace String.replace() - MDN
 *
 * @since 0.3.0
 */
export function toUpperCamelCase( string ) {
	if ( string.toLowerCase() === 'storepress' ) {
		return 'StorePress';
	}

	return (
		string
			// Match:
			// 1) lowercase letter at start ^([a-z])
			// OR
			// 2) word char after separator [-._:~\s](\w)
			// If separator+char: uppercase the char | If start lowercase: uppercase it
			.replace( /^([a-z])|[-._:~\s](\w)/gi, ( match, p1, p2 ) => {
				if ( p2 ) return p2.toUpperCase(); // Found char after separator - make it uppercase
				return p1.toUpperCase(); // Found lowercase at start - make it uppercase
			} )
	);
}

/**
 * Recursively merges multiple objects into a single object, with later sources
 * taking precedence over earlier ones. Only plain objects are deeply merged;
 * arrays, null values, and primitives are replaced entirely.
 *
 * The function performs a deep merge where:
 * - Plain objects are recursively merged
 * - Arrays completely replace previous arrays (no concatenation)
 * - Null values replace previous values
 * - Primitive values (string, number, boolean) replace previous values
 * - Later sources override earlier sources at each level
 *
 * @param {...Object} sources - One or more objects to merge
 * @returns {Object} A new object containing the merged properties from all sources
 *
 * @example
 * // Basic object merging
 * const obj1 = { a: 1, b: 2 };
 * const obj2 = { b: 3, c: 4 };
 * const result = deepMerge(obj1, obj2);
 * console.log(result); // { a: 1, b: 3, c: 4 }
 *
 * @example
 * // Deep merging nested objects
 * const defaults = {
 *   theme: {
 *     colors: { primary: 'blue', secondary: 'gray' },
 *     spacing: { margin: 10, padding: 5 }
 *   },
 *   features: { search: true }
 * };
 *
 * const customConfig = {
 *   theme: {
 *     colors: { primary: 'red' }, // Only primary changes, secondary preserved
 *     font: 'Arial'               // New property added
 *   },
 *   features: { search: false, filter: true }
 * };
 *
 * const merged = deepMerge(defaults, customConfig);
 * console.log(merged);
 * // Result: {
 * //   theme: {
 * //     colors: { primary: 'red', secondary: 'gray' },
 * //     spacing: { margin: 10, padding: 5 },
 * //     font: 'Arial'
 * //   },
 * //   features: { search: false, filter: true }
 * // }
 *
 * @example
 * // Arrays are replaced, not merged
 * const obj1 = {
 *   tags: ['javascript', 'node'],
 *   config: { debug: true }
 * };
 * const obj2 = {
 *   tags: ['react', 'typescript'],
 *   config: { verbose: false }
 * };
 *
 * const result = deepMerge(obj1, obj2);
 * console.log(result);
 * // Result: {
 * //   tags: ['react', 'typescript'], // Array replaced entirely
 * //   config: { debug: true, verbose: false } // Objects merged deeply
 * // }
 *
 * @example
 * // Multiple sources - later sources take precedence
 * const base = { a: 1, nested: { x: 10, y: 20 } };
 * const override1 = { b: 2, nested: { x: 15, z: 30 } };
 * const override2 = { c: 3, nested: { y: 25 } };
 *
 * const result = deepMerge(base, override1, override2);
 * console.log(result);
 * // Result: {
 * //   a: 1,                    // from base
 * //   b: 2,                    // from override1
 * //   c: 3,                    // from override2
 * //   nested: {
 * //     x: 15,                 // from override1 (overrides base)
 * //     y: 25,                 // from override2 (overrides base and override1)
 * //     z: 30                  // from override1
 * //   }
 * // }
 *
 * @example
 * // Null values and primitives replace objects
 * const obj1 = {
 *   settings: { theme: 'dark', lang: 'en' },
 *   data: { items: [1, 2, 3] }
 * };
 * const obj2 = {
 *   settings: null,        // Replaces entire settings object
 *   data: 'no data'        // Replaces entire data object
 * };
 *
 * const result = deepMerge(obj1, obj2);
 * console.log(result);
 * // Result: {
 * //   settings: null,
 * //   data: 'no data'
 * // }
 *
 * @example
 * // Common use case: Configuration with defaults
 * const defaultConfig = {
 *   api: {
 *     baseUrl: 'https://api.example.com',
 *     timeout: 5000,
 *     retries: 3
 *   },
 *   ui: {
 *     theme: 'light',
 *     animations: true,
 *     notifications: { enabled: true, position: 'top-right' }
 *   }
 * };
 *
 * const userConfig = {
 *   api: { timeout: 10000 },
 *   ui: {
 *     theme: 'dark',
 *     notifications: { position: 'bottom-left' }
 *   }
 * };
 *
 * const finalConfig = deepMerge(defaultConfig, userConfig);
 * console.log(finalConfig);
 * // Result: {
 * //   api: {
 * //     baseUrl: 'https://api.example.com', // from defaults
 * //     timeout: 10000,                     // from user config
 * //     retries: 3                          // from defaults
 * //   },
 * //   ui: {
 * //     theme: 'dark',                      // from user config
 * //     animations: true,                   // from defaults
 * //     notifications: {
 * //       enabled: true,                    // from defaults
 * //       position: 'bottom-left'           // from user config
 * //     }
 * //   }
 * // }
 *
 * @example
 * // Edge cases with different data types
 * const obj1 = {
 *   mixed: { value: 42 },
 *   list: [1, 2, 3],
 *   flag: true
 * };
 * const obj2 = {
 *   mixed: 'string',      // Object replaced with string
 *   list: null,           // Array replaced with null
 *   flag: { enabled: false } // Boolean replaced with object
 * };
 *
 * const result = deepMerge(obj1, obj2);
 * console.log(result);
 * // Result: {
 * //   mixed: 'string',
 * //   list: null,
 * //   flag: { enabled: false }
 * // }
 *
 * @example
 * // Empty objects and single parameter
 * console.log(deepMerge({})); // {}
 * console.log(deepMerge({ a: 1 })); // { a: 1 }
 * console.log(deepMerge({}, { b: 2 }, {})); // { b: 2 }
 * @since 0.6.0
 */
export function deepMerge( ...sources ) {
	const result = {};
	for ( const src of sources ) {
		for ( const key in src ) {
			if ( src.hasOwnProperty( key ) ) {
				const isObject =
					typeof src[ key ] === 'object' &&
					src[ key ] !== null &&
					! Array.isArray( src[ key ] ) &&
					typeof result[ key ] === 'object' &&
					result[ key ] !== null &&
					! Array.isArray( result[ key ] );

				if ( isObject ) {
					result[ key ] = deepMerge( result[ key ], src[ key ] );
				} else {
					result[ key ] = src[ key ];
				}
			}
		}
	}

	return result;
}

/**
 * Creates or retrieves a namespaced global WeakMap instance for safe data storage.
 *
 * This utility function provides a way to create and access globally shared WeakMap instances
 * with StorePress-specific namespacing. It ensures that WeakMaps are only created once and
 * reused across different parts of an application, preventing memory leaks and providing
 * consistent data storage for DOM elements or objects. The function uses a naming convention
 * that reduces the likelihood of naming conflicts with other libraries.
 *
 * @param {string} key - The namespace identifier used to create a unique WeakMap key
 * @returns {WeakMap} A global WeakMap instance with the specified namespace
 *
 * @example
 * // Basic usage - creating different WeakMaps for different purposes
 * const tooltipMap = getWeakMap('Tooltip');
 * const modalMap = getWeakMap('Modal');
 * const sliderMap = getWeakMap('Slider');
 *
 * // Store data associated with DOM elements
 * const button = document.getElementById('my-button');
 * tooltipMap.set(button, { text: 'Click me!', position: 'top' });
 *
 * // Retrieve data later
 * const tooltipData = tooltipMap.get(button);
 * console.log(tooltipData); // { text: 'Click me!', position: 'top' }
 *
 * @example
 * // Plugin instance management
 * const pluginInstances = getWeakMap('PluginInstances');
 *
 * class MyPlugin {
 *   constructor(element, options) {
 *     this.element = element;
 *     this.options = options;
 *
 *     // Store instance in global WeakMap
 *     pluginInstances.set(element, this);
 *   }
 *
 *   static getInstance(element) {
 *     return pluginInstances.get(element);
 *   }
 *
 *   destroy() {
 *     pluginInstances.delete(this.element);
 *   }
 * }
 *
 * // Usage
 * const element = document.querySelector('.my-element');
 * const plugin = new MyPlugin(element, { autoStart: true });
 *
 * // Later, retrieve the instance from anywhere in the code
 * const existingPlugin = MyPlugin.getInstance(element);
 * console.log(existingPlugin === plugin); // true
 *
 * @example
 * // Event listener management with cleanup tracking
 * const eventListeners = getWeakMap('EventListeners');
 *
 * function addTrackedEventListener(element, eventType, handler, options = {}) {
 *   // Get or create listener array for this element
 *   if (!eventListeners.has(element)) {
 *     eventListeners.set(element, []);
 *   }
 *
 *   const listeners = eventListeners.get(element);
 *
 *   // Add event listener
 *   element.addEventListener(eventType, handler, options);
 *
 *   // Track the listener for cleanup
 *   listeners.push({ eventType, handler, options });
 * }
 *
 * function removeAllEventListeners(element) {
 *   const listeners = eventListeners.get(element);
 *   if (listeners) {
 *     listeners.forEach(({ eventType, handler, options }) => {
 *       element.removeEventListener(eventType, handler, options);
 *     });
 *     eventListeners.delete(element);
 *   }
 * }
 *
 * // Usage
 * const button = document.getElementById('tracked-button');
 * addTrackedEventListener(button, 'click', () => console.log('Clicked!'));
 * addTrackedEventListener(button, 'mouseenter', () => console.log('Hovered!'));
 *
 * // Later, clean up all listeners
 * removeAllEventListeners(button);
 *
 * @example
 * // Component state management across modules
 * const componentStates = getWeakMap('ComponentStates');
 *
 * // Module A: Initialize component state
 * function initializeComponent(element, initialState) {
 *   componentStates.set(element, {
 *     ...initialState,
 *     initialized: true,
 *     lastUpdated: Date.now()
 *   });
 * }
 *
 * // Module B: Update component state
 * function updateComponentState(element, newState) {
 *   const currentState = componentStates.get(element) || {};
 *   componentStates.set(element, {
 *     ...currentState,
 *     ...newState,
 *     lastUpdated: Date.now()
 *   });
 * }
 *
 * // Module C: Read component state
 * function getComponentState(element) {
 *   return componentStates.get(element);
 * }
 *
 * // Usage across different modules
 * const carousel = document.querySelector('.carousel');
 * initializeComponent(carousel, { currentSlide: 0, autoplay: true });
 * updateComponentState(carousel, { currentSlide: 2 });
 *
 * const state = getComponentState(carousel);
 * console.log(state); // { currentSlide: 2, autoplay: true, initialized: true, lastUpdated: ... }
 *
 * @example
 * // Caching expensive computations per element
 * const computationCache = getWeakMap('ComputationCache');
 *
 * function getExpensiveData(element) {
 *   // Check if we already computed this for this element
 *   if (computationCache.has(element)) {
 *     console.log('Returning cached result');
 *     return computationCache.get(element);
 *   }
 *
 *   console.log('Computing expensive operation...');
 *   const result = performExpensiveComputation(element);
 *
 *   // Cache the result
 *   computationCache.set(element, result);
 *   return result;
 * }
 *
 * function performExpensiveComputation(element) {
 *   // Simulate expensive operation
 *   const rect = element.getBoundingClientRect();
 *   const style = window.getComputedStyle(element);
 *
 *   return {
 *     dimensions: { width: rect.width, height: rect.height },
 *     styles: {
 *       fontSize: style.fontSize,
 *       color: style.color,
 *       backgroundColor: style.backgroundColor
 *     },
 *     computedAt: Date.now()
 *   };
 * }
 *
 * // Usage
 * const element = document.querySelector('.complex-element');
 * const data1 = getExpensiveData(element); // Computes and caches
 * const data2 = getExpensiveData(element); // Returns cached result
 * console.log(data1 === data2); // true
 *
 * @example
 * // Different WeakMaps for different data types
 * const tooltipData = getWeakMap('TooltipData');
 * const validationErrors = getWeakMap('ValidationErrors');
 * const formStates = getWeakMap('FormStates');
 * const animationStates = getWeakMap('AnimationStates');
 *
 * function setupFormField(field) {
 *   // Initialize different types of data for the same element
 *   tooltipData.set(field, {
 *     text: field.dataset.tooltip,
 *     position: 'top'
 *   });
 *
 *   validationErrors.set(field, []);
 *
 *   formStates.set(field, {
 *     isDirty: false,
 *     isTouched: false,
 *     isValid: true
 *   });
 *
 *   animationStates.set(field, {
 *     isAnimating: false,
 *     lastAnimation: null
 *   });
 * }
 *
 * function validateField(field, value) {
 *   const errors = [];
 *
 *   if (!value.trim()) {
 *     errors.push('Field is required');
 *   }
 *
 *   if (field.type === 'email' && !value.includes('@')) {
 *     errors.push('Invalid email format');
 *   }
 *
 *   validationErrors.set(field, errors);
 *
 *   const formState = formStates.get(field);
 *   formStates.set(field, {
 *     ...formState,
 *     isValid: errors.length === 0,
 *     isDirty: true
 *   });
 *
 *   return errors.length === 0;
 * }
 *
 * @example
 * // Shared WeakMap between different plugins/libraries
 * // Library A
 * const sharedStorage = getWeakMap('SharedPluginData');
 *
 * class PluginA {
 *   constructor(element) {
 *     this.element = element;
 *
 *     // Check if other plugins have stored data for this element
 *     const existingData = sharedStorage.get(element) || {};
 *
 *     // Add our data to the shared storage
 *     sharedStorage.set(element, {
 *       ...existingData,
 *       pluginA: {
 *         initialized: true,
 *         version: '1.0.0',
 *         settings: { theme: 'dark' }
 *       }
 *     });
 *   }
 * }
 *
 * // Library B
 * class PluginB {
 *   constructor(element) {
 *     this.element = element;
 *
 *     const existingData = sharedStorage.get(element) || {};
 *
 *     // Check if PluginA is already initialized
 *     if (existingData.pluginA) {
 *       console.log('PluginA is already active on this element');
 *       // Adapt behavior based on other plugin presence
 *     }
 *
 *     sharedStorage.set(element, {
 *       ...existingData,
 *       pluginB: {
 *         initialized: true,
 *         dependsOn: existingData.pluginA ? ['pluginA'] : []
 *       }
 *     });
 *   }
 * }
 *
 * @example
 * // Performance monitoring and debugging
 * const performanceData = getWeakMap('PerformanceData');
 *
 * function trackElementPerformance(element, operation, executionTime) {
 *   if (!performanceData.has(element)) {
 *     performanceData.set(element, {
 *       operations: [],
 *       totalTime: 0,
 *       averageTime: 0
 *     });
 *   }
 *
 *   const data = performanceData.get(element);
 *   data.operations.push({
 *     operation,
 *     executionTime,
 *     timestamp: Date.now()
 *   });
 *
 *   data.totalTime += executionTime;
 *   data.averageTime = data.totalTime / data.operations.length;
 *
 *   performanceData.set(element, data);
 * }
 *
 * function getElementPerformanceReport(element) {
 *   const data = performanceData.get(element);
 *   if (!data) return null;
 *
 *   return {
 *     totalOperations: data.operations.length,
 *     totalTime: data.totalTime,
 *     averageTime: data.averageTime,
 *     slowestOperation: data.operations.reduce((slowest, current) =>
 *       current.executionTime > slowest.executionTime ? current : slowest
 *     ),
 *     recentOperations: data.operations.slice(-5)
 *   };
 * }
 *
 * // Usage with performance tracking
 * function performOperationWithTracking(element, operationName, operation) {
 *   const startTime = performance.now();
 *   const result = operation();
 *   const endTime = performance.now();
 *
 *   trackElementPerformance(element, operationName, endTime - startTime);
 *   return result;
 * }
 *
 * @example
 * // Memory leak prevention in SPA routing
 * const routeComponents = getWeakMap('RouteComponents');
 *
 * class SPARouter {
 *   static registerComponent(element, componentData) {
 *     routeComponents.set(element, {
 *       ...componentData,
 *       registeredAt: Date.now(),
 *       route: window.location.pathname
 *     });
 *   }
 *
 *   static cleanupRoute(routePath) {
 *     // Note: WeakMap doesn't have iteration, so we'd need additional tracking
 *     // This is a conceptual example of how you might use it
 *     console.log(`Cleaning up components for route: ${routePath}`);
 *     // Components will be automatically garbage collected when DOM elements are removed
 *   }
 *
 *   static getComponentData(element) {
 *     return routeComponents.get(element);
 *   }
 * }
 *
 * // When navigating to a new route
 * function handleRouteChange(newRoute) {
 *   // Remove old DOM elements (WeakMap entries automatically cleaned up)
 *   document.getElementById('app').innerHTML = '';
 *
 *   // Load new route content
 *   loadRouteContent(newRoute);
 *
 *   // Register new components
 *   document.querySelectorAll('.component').forEach(el => {
 *     SPARouter.registerComponent(el, {
 *       type: el.dataset.componentType,
 *       props: JSON.parse(el.dataset.props || '{}')
 *     });
 *   });
 * }
 *
 * @example
 * // Integration with existing StorePress utilities
 * import { createPluginInstance, getPluginInstance } from '@storepress/utils';
 *
 * // Use the same WeakMap pattern as other StorePress utilities
 * const customPluginMap = getWeakMap('CustomPlugin');
 *
 * class CustomPlugin {
 *   constructor(element, options) {
 *     this.element = element;
 *     this.options = options;
 *     this.init();
 *   }
 *
 *   init() {
 *     // Plugin initialization
 *     console.log('Custom plugin initialized');
 *   }
 *
 *   destroy() {
 *     // Cleanup logic
 *     customPluginMap.delete(this.element);
 *   }
 * }
 *
 * function createCustomPluginInstance(selectors, options) {
 *   return createPluginInstance(selectors, options, CustomPlugin);
 * }
 *
 * function getCustomPluginInstance(selectors) {
 *   return getPluginInstance(selectors);
 * }
 *
 * // Usage that integrates with StorePress ecosystem
 * const instances = createCustomPluginInstance('.custom-elements', {
 *   setting1: 'value1',
 *   setting2: 'value2'
 * });
 *
 * @example
 * // Namespace isolation for different versions or environments
 * const devTooltips = getWeakMap('TooltipDev');
 * const prodTooltips = getWeakMap('TooltipProd');
 * const testTooltips = getWeakMap('TooltipTest');
 *
 * function getEnvironmentTooltipMap() {
 *   const env = process.env.NODE_ENV || 'development';
 *
 *   switch (env) {
 *     case 'development':
 *       return devTooltips;
 *     case 'production':
 *       return prodTooltips;
 *     case 'test':
 *       return testTooltips;
 *     default:
 *       return devTooltips;
 *   }
 * }
 *
 * // Environment-specific tooltip behavior
 * function addTooltip(element, config) {
 *   const tooltipMap = getEnvironmentTooltipMap();
 *
 *   if (process.env.NODE_ENV === 'development') {
 *     // Add debugging info in development
 *     config.debug = true;
 *     config.createdAt = new Date().toISOString();
 *   }
 *
 *   tooltipMap.set(element, config);
 * }
 *
 * @throws {TypeError} Throws if the global WeakMap constructor is not available
 * @throws {ReferenceError} Throws if the window object is not available (Node.js environments)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap WeakMap - MDN
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management JavaScript Memory Management - MDN
 *
 * @since 0.7.0
 */
export function getWeakMap( key ) {
	const name = toUpperCamelCase( key );

	// Ensure nested structure exists
	window.StorePress = window.StorePress || {};
	window.StorePress.$weakMaps = window.StorePress.$weakMaps || {};

	// Create WeakMap if it doesn't exist
	if ( ! window.StorePress.$weakMaps[ name ] ) {
		window.StorePress.$weakMaps[ name ] = new WeakMap();
	}

	return window.StorePress.$weakMaps[ name ];
}

/**
 * Normalizes different selector input types into a single HTMLElement or null.
 *
 * This utility function provides a consistent way to handle element selection by accepting
 * either a CSS selector string or an existing HTMLElement. It's commonly used in library
 * functions where you want to provide flexibility in how users specify target elements.
 *
 * @param {string|HTMLElement|null|Document} [selector=null] - The element selector or element itself
 * @returns {HTMLElement|null|Document} The resolved HTMLElement, or null if not found/invalid
 *
 * @example
 * // Using CSS selector string
 * const element1 = getElement('#my-button');
 * console.log(element1); // <button id="my-button">...</button> or null
 *
 * const element2 = getElement('.sidebar');
 * console.log(element2); // First element with class 'sidebar' or null
 *
 * @example
 * // Passing an existing HTMLElement (returns the same element)
 * const existingElement = document.getElementById('header');
 * const element = getElement(existingElement);
 * console.log(element === existingElement); // true
 *
 * @example
 * // Handling null/undefined input
 * const element1 = getElement(null);
 * console.log(element1); // null
 *
 * const element2 = getElement();
 * console.log(element2); // null (default parameter)
 *
 * @example
 * // Invalid input handling
 * const element1 = getElement(123);
 * console.log(element1); // null
 *
 * const element2 = getElement({});
 * console.log(element2); // null
 *
 * const element3 = getElement('non-existent-selector');
 * console.log(element3); // null (element not found)
 *
 * @example
 * // Use case: Flexible component initialization
 * class Modal {
 *   constructor(target, options = {}) {
 *     this.element = getElement(target);
 *
 *     if (!this.element) {
 *       throw new Error('Modal target element not found');
 *     }
 *
 *     this.init(options);
 *   }
 *
 *   init(options) {
 *     // Initialize modal functionality
 *   }
 * }
 *
 * // All of these work:
 * new Modal('#modal1');                          // CSS selector
 * new Modal(document.getElementById('modal2'));  // HTMLElement
 * new Modal(document.querySelector('.modal'));  // HTMLElement from query
 *
 * @example
 * // Use case: Event handler utility
 * function addClickHandler(target, callback) {
 *   const element = getElement(target);
 *
 *   if (element) {
 *     element.addEventListener('click', callback);
 *     return true; // Success
 *   }
 *
 *   console.warn('Element not found for click handler');
 *   return false; // Failed
 * }
 *
 * // Flexible usage
 * addClickHandler('#submit-btn', () => console.log('Clicked!'));
 * addClickHandler(myButtonElement, handleClick);
 *
 * @example
 * // Use case: DOM manipulation utility
 * function toggleClass(target, className) {
 *   const element = getElement(target);
 *
 *   if (element) {
 *     element.classList.toggle(className);
 *   }
 * }
 *
 * // Works with both selectors and elements
 * toggleClass('.menu-toggle', 'active');
 * toggleClass(menuElement, 'visible');
 *
 * @example
 * // Use case: Form validation helper
 * function validateField(fieldSelector, validator) {
 *   const field = getElement(fieldSelector);
 *
 *   if (!field) {
 *     console.warn(`Field ${fieldSelector} not found`);
 *     return false;
 *   }
 *
 *   const isValid = validator(field.value);
 *   field.classList.toggle('invalid', !isValid);
 *
 *   return isValid;
 * }
 *
 * // Usage
 * validateField('#email', value => value.includes('@'));
 * validateField(passwordField, value => value.length >= 8);
 *
 * @example
 * // Use case: Plugin architecture with flexible targeting
 * class Tooltip {
 *   static attach(target, content) {
 *     const element = getElement(target);
 *
 *     if (!element) {
 *       console.warn('Tooltip target not found:', target);
 *       return null;
 *     }
 *
 *     return new Tooltip(element, content);
 *   }
 *
 *   constructor(element, content) {
 *     this.element = element;
 *     this.content = content;
 *     this.init();
 *   }
 * }
 *
 * // Multiple ways to create tooltips
 * Tooltip.attach('#help-icon', 'Click for help');
 * Tooltip.attach(document.querySelector('.info'), 'Additional info');
 *
 * @example
 * // Use case: Animation utility
 * function fadeOut(target, duration = 300) {
 *   const element = getElement(target);
 *
 *   if (!element) return Promise.reject('Element not found');
 *
 *   element.style.transition = `opacity ${duration}ms`;
 *   element.style.opacity = '0';
 *
 *   return new Promise(resolve => {
 *     setTimeout(() => {
 *       element.style.display = 'none';
 *       resolve(element);
 *     }, duration);
 *   });
 * }
 *
 * // Flexible element targeting
 * fadeOut('.notification').then(() => console.log('Faded out'));
 * fadeOut(alertElement).catch(console.error);
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector Document.querySelector()
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement HTMLElement
 *
 * @since 0.3.0
 */
export function getElement( selector = null ) {
	if ( null === selector ) return null;
	if ( document === selector ) return document;
	if ( typeof selector === 'string' )
		return document.querySelector( selector );
	return selector instanceof HTMLElement ? selector : null;
}

/**
 * Normalizes different selector input types into a collection of HTMLElements.
 *
 * This utility function provides a flexible way to handle multiple element selection by accepting
 * CSS selector strings, individual HTMLElements, or arrays of elements. It ensures consistent
 * output format for functions that need to operate on multiple elements while providing
 * flexibility in input types.
 *
 * @param {string|HTMLElement|HTMLElement[]|NodeList|Array|Document[]} [selectors=[]] - The element selector(s) or element(s)
 * @returns {HTMLElement[]|NodeList|Array|Document[]} Collection of HTMLElements, empty array if no matches
 *
 * @example
 * // Using CSS selector string (returns NodeList)
 * const elements1 = getElements('.button');
 * console.log(elements1); // NodeList of all elements with class 'button'
 *
 * const elements2 = getElements('#container > div');
 * console.log(elements2); // NodeList of direct div children of #container
 *
 * @example
 * // Single HTMLElement (wrapped in array)
 * const singleElement = document.getElementById('header');
 * const elements = getElements(singleElement);
 * console.log(elements); // [<div id="header">...</div>]
 *
 * @example
 * // Array of HTMLElements (passed through)
 * const elementArray = [
 *   document.getElementById('btn1'),
 *   document.getElementById('btn2')
 * ];
 * const elements = getElements(elementArray);
 * console.log(elements === elementArray); // true (same reference)
 *
 * @example
 * // NodeList (passed through)
 * const nodeList = document.querySelectorAll('.item');
 * const elements = getElements(nodeList);
 * console.log(elements === nodeList); // true (same reference)
 *
 * @example
 * // Empty input handling
 * const elements1 = getElements();
 * console.log(elements1); // []
 *
 * const elements2 = getElements([]);
 * console.log(elements2); // []
 *
 * const elements3 = getElements('');
 * console.log(elements3); // NodeList (empty)
 *
 * @example
 * // Use case: Bulk event handler attachment
 * function addEventListeners(targets, eventType, handler) {
 *   const elements = getElements(targets);
 *
 *   // Convert to array if NodeList for easier iteration
 *   const elementsArray = Array.from(elements);
 *
 *   elementsArray.forEach(element => {
 *     if (element && element.addEventListener) {
 *       element.addEventListener(eventType, handler);
 *     }
 *   });
 *
 *   return elementsArray.length; // Return count of elements processed
 * }
 *
 * // Flexible usage
 * addEventListeners('.nav-link', 'click', handleNavClick);
 * addEventListeners([btn1, btn2, btn3], 'click', handleButtonClick);
 * addEventListeners(singleButton, 'click', handleSingleClick);
 *
 * @example
 * // Use case: Bulk style manipulation
 * function setStyles(targets, styles) {
 *   const elements = getElements(targets);
 *
 *   Array.from(elements).forEach(element => {
 *     if (element && element.style) {
 *       Object.assign(element.style, styles);
 *     }
 *   });
 * }
 *
 * // Apply styles to multiple elements
 * setStyles('.card', { opacity: '0.8', transition: 'all 0.3s' });
 * setStyles([header, footer], { backgroundColor: '#f5f5f5' });
 * setStyles(mainContent, { padding: '20px' });
 *
 * @example
 * // Use case: Form field validation
 * function validateFields(fieldSelectors, validator) {
 *   const fields = getElements(fieldSelectors);
 *   const results = [];
 *
 *   Array.from(fields).forEach(field => {
 *     if (field && field.value !== undefined) {
 *       const isValid = validator(field.value);
 *       field.classList.toggle('invalid', !isValid);
 *       field.classList.toggle('valid', isValid);
 *
 *       results.push({
 *         element: field,
 *         valid: isValid,
 *         value: field.value
 *       });
 *     }
 *   });
 *
 *   return results;
 * }
 *
 * // Validate different input types
 * validateFields('.required-field', value => value.trim().length > 0);
 * validateFields([emailField, phoneField], value => value.includes('@') || /^\d+$/.test(value));
 *
 * @example
 * // Use case: Animation sequences
 * function animateElements(targets, animation, delay = 0) {
 *   const elements = getElements(targets);
 *   const promises = [];
 *
 *   Array.from(elements).forEach((element, index) => {
 *     if (element && element.animate) {
 *       const promise = new Promise(resolve => {
 *         setTimeout(() => {
 *           element.animate(animation.keyframes, animation.options)
 *             .addEventListener('finish', resolve);
 *         }, delay * index);
 *       });
 *       promises.push(promise);
 *     }
 *   });
 *
 *   return Promise.all(promises);
 * }
 *
 * // Staggered animations
 * const fadeIn = {
 *   keyframes: [{ opacity: 0 }, { opacity: 1 }],
 *   options: { duration: 500 }
 * };
 *
 * animateElements('.list-item', fadeIn, 100); // 100ms stagger
 *
 * @example
 * // Use case: Component initialization
 * class Tooltip {
 *   static attachToAll(targets, options = {}) {
 *     const elements = getElements(targets);
 *     const instances = [];
 *
 *     Array.from(elements).forEach(element => {
 *       if (element) {
 *         instances.push(new Tooltip(element, options));
 *       }
 *     });
 *
 *     return instances;
 *   }
 *
 *   constructor(element, options) {
 *     this.element = element;
 *     this.options = options;
 *     this.init();
 *   }
 * }
 *
 * // Initialize tooltips on multiple elements
 * Tooltip.attachToAll('[data-tooltip]', { placement: 'top' });
 * Tooltip.attachToAll([helpIcon, infoIcon], { theme: 'dark' });
 *
 * @example
 * // Use case: Data collection and processing
 * function collectElementData(targets, dataExtractor) {
 *   const elements = getElements(targets);
 *   const data = [];
 *
 *   Array.from(elements).forEach(element => {
 *     if (element) {
 *       const elementData = dataExtractor(element);
 *       if (elementData !== null && elementData !== undefined) {
 *         data.push(elementData);
 *       }
 *     }
 *   });
 *
 *   return data;
 * }
 *
 * // Extract data from form fields
 * const formData = collectElementData('.form-field', el => ({
 *   name: el.name,
 *   value: el.value,
 *   type: el.type
 * }));
 *
 * // Extract text content from multiple elements
 * const textContent = collectElementData('.content-section', el => el.textContent);
 *
 * @example
 * // Use case: Conditional operations based on element state
 * function toggleVisibility(targets, condition = null) {
 *   const elements = getElements(targets);
 *   let toggledCount = 0;
 *
 *   Array.from(elements).forEach(element => {
 *     if (element) {
 *       const shouldShow = condition ? condition(element) :
 *         element.style.display === 'none';
 *
 *       element.style.display = shouldShow ? '' : 'none';
 *       toggledCount++;
 *     }
 *   });
 *
 *   return toggledCount;
 * }
 *
 * // Toggle multiple elements
 * toggleVisibility('.sidebar-item');
 * toggleVisibility([menu, dropdown], el => el.classList.contains('active'));
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll Document.querySelectorAll()
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NodeList NodeList
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from Array.from()
 *
 * @since 0.3.0
 */
export function getElements( selectors = [] ) {
	if ( selectors.length === 0 ) return [];
	if ( selectors === document ) return [ document ];
	if ( typeof selectors === 'string' )
		return document.querySelectorAll( selectors );
	return selectors instanceof HTMLElement ? [ selectors ] : selectors;
}

/**
 * Extracts and parses configuration options from HTML data attributes with support for
 * nested structures, type conversion, and attribute overrides.
 *
 * This function supports multiple ways to define options:
 * 1. Main data attribute with JSON/object notation
 * 2. Override attributes using hyphenated keys for nested properties
 * 3. Automatic type conversion for strings, numbers, booleans, arrays, objects, and regex
 *
 * @param {HTMLElement} $element - The DOM element containing the data attributes
 * @param {string} dataAttributeName - The base name of the data attribute (without 'data-' prefix)
 * @param {Object} [userFeatures={}] - Configuration object to customize parsing behavior
 * @param {boolean} [userFeatures.parseNumber=true] - Whether to convert numeric strings to numbers
 * @param {boolean} [userFeatures.parseBoolean=true] - Whether to convert boolean strings to booleans
 * @param {string[]} [userFeatures.truthyStrings=['yes', 'true']] - Strings that should be parsed as true
 * @param {string[]} [userFeatures.falsyStrings=['no', 'false']] - Strings that should be parsed as false
 * @param {boolean} [userFeatures.parseRegex=true] - Whether to parse regex patterns like /pattern/flags
 *
 * @returns {Object} The parsed configuration object with all options merged and type-converted
 *
 * @example
 * // Basic usage with JSON in data attribute
 * // HTML: <div data-config='{"autoplay": true, "speed": 500}'></div>
 * const element = document.querySelector('div');
 * const options = getOptionsFromAttribute(element, 'config');
 * console.log(options); // { autoplay: true, speed: 500 }
 *
 * @example
 * // Using override attributes for nested configuration
 * // HTML: <div data-slider='{"autoplay": true}'
 * //            data-slider-animation-duration="800"
 * //            data-slider-animation-easing="ease-in-out"></div>
 * const element = document.querySelector('div');
 * const options = getOptionsFromAttribute(element, 'slider');
 * console.log(options);
 * // Result: {
 * //   autoplay: true,
 * //   animation: {
 * //     duration: 800,
 * //     easing: "ease-in-out"
 * //   }
 * // }
 *
 * @example
 * // Type conversion examples
 * // HTML: <div data-options-enabled="true"
 * //            data-options-count="42"
 * //            data-options-rate="3.14"
 * //            data-options-pattern="/^test$/i"
 * //            data-options-items='["a", "b", "c"]'></div>
 * const element = document.querySelector('div');
 * const options = getOptionsFromAttribute(element, 'options');
 * console.log(options);
 * // Result: {
 * //   enabled: true,           // boolean
 * //   count: 42,              // number
 * //   rate: 3.14,             // float
 * //   pattern: /^test$/i,     // RegExp
 * //   items: ["a", "b", "c"]  // array
 * // }
 *
 *
 * @example
 * // Complex nested structure with multiple override levels
 * // HTML: <div data-widget-theme-colors-primary="#ff0000"
 * //            data-widget-theme-colors-secondary="#00ff00"
 * //            data-widget-layout-sidebar-width="300"
 * //            data-widget-layout-sidebar-position="left"></div>
 * const element = document.querySelector('div');
 * const options = getOptionsFromAttribute(element, 'widget');
 * console.log(options);
 * // Result: {
 * //   theme: {
 * //     colors: {
 * //       primary: "#ff0000",
 * //       secondary: "#00ff00"
 * //     }
 * //   },
 * //   layout: {
 * //     sidebar: {
 * //       width: 300,
 * //       position: "left"
 * //     }
 * //   }
 * // }
 *
 * @example
 * // Boolean value variations
 * // HTML: <div data-flags-active="true"
 * //            data-flags-visible="yes"
 * //            data-flags-enabled="y"
 * //            data-flags-disabled="false"
 * //            data-flags-hidden="no"
 * //            data-flags-inactive="n"></div>
 * const element = document.querySelector('div');
 * const options = getOptionsFromAttribute(element, 'flags');
 * console.log(options);
 * // Result: {
 * //   active: true,
 * //   visible: true,
 * //   enabled: true,
 * //   disabled: false,
 * //   hidden: false,
 * //   inactive: false
 * // }
 *
 * @throws {Error} Throws error if all JSON parsing strategies fail for nested data
 * @since 0.6.0
 */
export function getOptionsFromAttribute(
	$element,
	dataAttributeName,
	userFeatures = {}
) {
	const defaultFeatures = {
		parseNumber: true, // true | false
		parseBoolean: true, // true | false
		truthyStrings: [ 'yes', 'true' ], // yes | true | y
		falsyStrings: [ 'no', 'false' ], // no | false | n
		parseRegex: true, // true | false
	};

	const FEATURES = { ...defaultFeatures, ...userFeatures };

	const getValue = ( value ) => {
		if ( typeof value !== 'string' ) {
			return value;
		}

		const lowerValue = value.toLowerCase();
		const isNumber = isNaN( Number( value ) ) === false;
		const isRegExp = new RegExp( '^/(.+)/([gimsuyx]*)$' ).test( value );

		// Check for boolean values

		if ( FEATURES.parseBoolean ) {
			if ( FEATURES.truthyStrings.includes( lowerValue ) ) {
				return true;
			}

			if ( FEATURES.falsyStrings.includes( lowerValue ) ) {
				return false;
			}
		}

		// Check for regex pattern: /pattern/flags
		if ( FEATURES.parseRegex && isRegExp ) {
			const regexMatch = value.match( /^\/(.+)\/([gimsuyx]*)$/ );

			try {
				const [ , pattern, flags ] = regexMatch;
				return new RegExp( pattern, flags );
			} catch ( error ) {
				console.warn( `Invalid regex pattern: ${ value }`, error );
				return value; // Return original string if regex is invalid
			}
		}

		// Check for numeric values
		if ( FEATURES.parseNumber ) {
			return isNumber ? Number( value ) : value;
		}

		// Return as string if no type conversion applies
		return value;
	};

	const reviver = ( key, value ) => {
		return getValue( value );
	};

	const getJSONData = ( value, rv ) => {
		const strategies = [
			( val ) => val.replaceAll( "'", '"' ),
			( val ) => val.replaceAll( "'", '"' ).replaceAll( '\\', '\\\\' ),
			//@TODO: Add more strategies here if needed
		];

		for ( const strategy of strategies ) {
			try {
				return JSON.parse( strategy( value ), rv );
			} catch {}
		}

		throw new Error( 'All parsing strategies failed' );
	};

	const makeNestedOptions = ( nestedData ) => {
		const result = {};

		const processLevel = ( data, target ) => {
			for ( const key in data ) {
				if ( data.hasOwnProperty( key ) ) {
					const item = data[ key ];

					// Set the value for current key
					if ( item.value !== undefined ) {
						target[ key ] = item.value;
					}

					// Process children recursively if they exist
					if ( item.child && typeof item.child === 'object' ) {
						// Ensure target[key] is an object to hold nested properties
						if (
							typeof target[ key ] !== 'object' ||
							target[ key ] === null
						) {
							target[ key ] = item.value;
						}

						// Recursively process the child data
						processLevel( item.child, target[ key ] );
					}
				}
			}
		};

		// Start the recursive processing
		processLevel( nestedData, result );

		return result;
	};

	const getOverrideOptions = ( keys, dataset ) => {
		// Stable sort: fewer hyphens first
		const sortedKeys = keys
			.map( ( key, index ) => ( { key, index } ) )
			.sort( ( a, b ) => {
				const hyphenCountA = ( a.key.match( /-/g ) || [] ).length;
				const hyphenCountB = ( b.key.match( /-/g ) || [] ).length;
				if ( hyphenCountA === hyphenCountB ) {
					return a.index - b.index; // preserve original order
				}
				return hyphenCountA - hyphenCountB;
			} )
			.map( ( item ) => item.key );

		const nestedData = {};

		sortedKeys.forEach( ( key ) => {
			const parts = key.split( '-' );
			let oldKey = '';
			let currentKey = '';
			let currentObj = nestedData;

			parts.forEach( ( part ) => {
				currentKey = currentKey ? currentKey + '-' + part : part;

				if ( currentKey === part ) {
					return;
				}

				oldKey = toCamelCase( part );

				if ( ! currentObj[ oldKey ] ) {
					currentObj[ oldKey ] = {
						value: getValue( dataset[ currentKey ] ),
						child: {},
					};
				}

				currentObj = currentObj[ oldKey ].child;
			} );
		} );

		return makeNestedOptions( nestedData );
	};

	let options = {};

	const dataset = { ...$element.dataset };

	const datasetKey = toCamelCase( dataAttributeName );

	const datasetValue = dataset[ datasetKey ];

	// Parse main data if it exists and is not empty
	if ( datasetValue && datasetValue.trim() ) {
		try {
			options = getJSONData( datasetValue, reviver );
		} catch ( error ) {
			console.warn(
				`Failed to parse JSON from "${ dataAttributeName }"`,
				error
			);
			options = {};
		}
	}

	// Find all override attributes with pattern: data-{dataAttributeName}--key
	const overridePrefix = `${ datasetKey }-`;

	const overrideAttrs = Object.keys( dataset ).filter( ( key ) => {
		return key.startsWith( overridePrefix );
	} );

	const overrideOptions = getOverrideOptions( overrideAttrs, dataset );

	// Merge base options with override options (overrides take precedence)
	return deepMerge( options, overrideOptions );
}

/**
 * Escapes special regular expression characters in a string to make it safe for use in regex patterns.
 *
 * This function takes a string that may contain special regex characters and escapes them with backslashes
 * so they will be treated as literal characters rather than regex metacharacters. It uses the native
 * `RegExp.escape()` method if available (future JavaScript feature), otherwise falls back to a manual
 * replacement approach.
 *
 * @param {string} string - The string containing characters to escape for regex use
 * @returns {string} The escaped string safe for use in regular expression patterns
 *
 * @example
 * // Basic escaping of common regex metacharacters
 * const userInput = "What is $100 + $200?";
 * const escaped = escapeRegex(userInput);
 * console.log(escaped); // "What is \\$100 \\+ \\$200\\?"
 *
 * const regex = new RegExp(escaped);
 * console.log(regex.test("What is $100 + $200?")); // true
 *
 * @example
 * // Escaping special characters for literal matching
 * const specialChars = "[.*+?^${}()|[]\\";
 * const escaped = escapeRegex(specialChars);
 * console.log(escaped); // "\\[\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\"
 *
 * @example
 * // Use case: Creating dynamic regex patterns from user input
 * function createSearchRegex(searchTerm, flags = 'gi') {
 *   const escaped = escapeRegex(searchTerm);
 *   return new RegExp(escaped, flags);
 * }
 *
 * const userSearch = "C++ (programming)";
 * const searchRegex = createSearchRegex(userSearch);
 * console.log(searchRegex); // /C\+\+ \(programming\)/gi
 *
 * const text = "Learn C++ (programming) basics";
 * console.log(searchRegex.test(text)); // true
 *
 * @example
 * // Building complex patterns with escaped literal parts
 * const filename = "data.backup.2023-12-01.json";
 * const escapedFilename = escapeRegex(filename);
 *
 * // Create pattern that matches the filename with any extension
 * const pattern = escapedFilename.replace(/\\\..+$/, '\\..+');
 * const regex = new RegExp(pattern);
 *
 * console.log(regex.test("data.backup.2023-12-01.txt")); // true
 * console.log(regex.test("data.backup.2023-12-01.xml")); // true
 *
 * @example
 * // Safe string replacement using escaped patterns
 * function replaceAllLiteral(text, searchValue, replaceValue) {
 *   const escaped = escapeRegex(searchValue);
 *   const regex = new RegExp(escaped, 'g');
 *   return text.replace(regex, replaceValue);
 * }
 *
 * const text = "Price: $50.99 (was $75.99)";
 * const result = replaceAllLiteral(text, "$50.99", "$45.99");
 * console.log(result); // "Price: $45.99 (was $75.99)"
 *
 * @example
 * // Email validation with escaped domain
 * function createEmailRegex(domain) {
 *   const escapedDomain = escapeRegex(domain);
 *   return new RegExp(`^[\\w.-]+@${escapedDomain}$`, 'i');
 * }
 *
 * const companyRegex = createEmailRegex("my-company.co.uk");
 * console.log(companyRegex.test("user@my-company.co.uk")); // true
 * console.log(companyRegex.test("user@other-company.co.uk")); // false
 *
 * @example
 * // Highlighting search terms in text
 * function highlightSearchTerm(text, searchTerm) {
 *   const escaped = escapeRegex(searchTerm);
 *   const regex = new RegExp(`(${escaped})`, 'gi');
 *   return text.replace(regex, '<mark>$1</mark>');
 * }
 *
 * const content = "JavaScript (JS) is great. I love JS!";
 * const highlighted = highlightSearchTerm(content, "JS");
 * console.log(highlighted);
 * // "JavaScript (<mark>JS</mark>) is great. I love <mark>JS</mark>!"
 *
 * @example
 * // Path matching with escaped separators
 * const basePath = "C:\\Users\\John\\Documents";
 * const escapedPath = escapeRegex(basePath);
 * const pathRegex = new RegExp(`^${escapedPath}`);
 *
 * console.log(pathRegex.test("C:\\Users\\John\\Documents\\file.txt")); // true
 * console.log(pathRegex.test("C:\\Users\\Jane\\Documents\\file.txt")); // false
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping MDN - Escaping in Regular Expressions
 * @see https://github.com/tc39/proposal-regex-escaping TC39 Proposal for RegExp.escape
 *
 * @since 0.6.0
 */
export function escapeRegex( string ) {
	return typeof RegExp.escape === 'function'
		? RegExp.escape( string )
		: string.replace( /[/\-\\^$*+?.()|[\]{}]/g, '\\$&' );
}

/**
 * Creates plugin instances for selected DOM elements and manages them using WeakMap storage.
 *
 * This function provides a standardized way to instantiate plugins across multiple DOM elements
 * while preventing memory leaks through WeakMap-based instance storage. It automatically handles
 * element selection, instance creation, and provides built-in cleanup functionality. If an element
 * already has a plugin instance, it returns the existing instance instead of creating a new one.
 *
 * @param {string|HTMLElement|NodeList|HTMLElement[]} selectors - Elements to create plugins for
 * @param {Object} options - Configuration options to pass to the plugin constructor
 * @param {Function} plugin - Plugin constructor function or class
 * @returns {Array<Object>} Array of plugin instances, each with element reference and destroy method
 *
 * @example
 * // Basic plugin creation with CSS selector
 * class Modal {
 *   constructor(element, options = {}) {
 *     this.element = element;
 *     this.options = options;
 *     this.isOpen = false;
 *     this.init();
 *   }
 *
 *   init() {
 *     console.log('Modal initialized on', this.element.id);
 *   }
 *
 *   open() {
 *     this.isOpen = true;
 *     this.element.style.display = 'block';
 *   }
 *
 *   close() {
 *     this.isOpen = false;
 *     this.element.style.display = 'none';
 *   }
 * }
 *
 * // Create modal instances for all elements with class 'modal'
 * const modalInstances = createPluginInstance('.modal', {
 *   autoClose: true,
 *   backdrop: true
 * }, Modal);
 *
 * console.log(modalInstances.length); // Number of modal elements found
 *
 * @example
 * // Creating instances on specific elements
 * const button1 = document.getElementById('btn1');
 * const button2 = document.getElementById('btn2');
 *
 * class Button {
 *   constructor(element, options = {}) {
 *     this.element = element;
 *     this.options = options;
 *     this.clickCount = 0;
 *     this.setupEventListeners();
 *   }
 *
 *   setupEventListeners() {
 *     this.element.addEventListener('click', () => {
 *       this.clickCount++;
 *       this.handleClick();
 *     });
 *   }
 *
 *   handleClick() {
 *     console.log(`Button ${this.element.id} clicked ${this.clickCount} times`);
 *   }
 * }
 *
 * // Create instances on specific elements
 * const buttonInstances = createPluginInstance([button1, button2], {
 *   theme: 'primary',
 *   size: 'large'
 * }, Button);
 *
 * @example
 * // Working with NodeList
 * const accordionElements = document.querySelectorAll('.accordion');
 *
 * class Accordion {
 *   constructor(element, options = {}) {
 *     this.element = element;
 *     this.options = { autoClose: true, ...options };
 *     this.panels = element.querySelectorAll('.panel');
 *     this.activePanel = null;
 *     this.init();
 *   }
 *
 *   init() {
 *     this.panels.forEach((panel, index) => {
 *       const header = panel.querySelector('.panel-header');
 *       header.addEventListener('click', () => this.togglePanel(index));
 *     });
 *   }
 *
 *   togglePanel(index) {
 *     const panel = this.panels[index];
 *     const isActive = panel === this.activePanel;
 *
 *     if (this.options.autoClose && this.activePanel) {
 *       this.closePanel(this.activePanel);
 *     }
 *
 *     if (!isActive) {
 *       this.openPanel(panel);
 *       this.activePanel = panel;
 *     } else {
 *       this.activePanel = null;
 *     }
 *   }
 *
 *   openPanel(panel) {
 *     panel.classList.add('active');
 *   }
 *
 *   closePanel(panel) {
 *     panel.classList.remove('active');
 *   }
 * }
 *
 * // Create accordion instances
 * const accordionInstances = createPluginInstance(accordionElements, {
 *   autoClose: false,
 *   animationDuration: 300
 * }, Accordion);
 *
 * @example
 * // Plugin with data attributes configuration
 * class Tooltip {
 *   constructor(element, options = {}) {
 *     this.element = element;
 *
 *     // Merge options with data attributes
 *     const dataOptions = getOptionsFromAttribute(element, 'tooltip');
 *     this.options = { placement: 'top', ...options, ...dataOptions };
 *
 *     this.tooltip = null;
 *     this.init();
 *   }
 *
 *   init() {
 *     this.element.addEventListener('mouseenter', () => this.show());
 *     this.element.addEventListener('mouseleave', () => this.hide());
 *   }
 *
 *   show() {
 *     if (!this.tooltip) {
 *       this.createTooltip();
 *     }
 *     this.tooltip.style.display = 'block';
 *   }
 *
 *   hide() {
 *     if (this.tooltip) {
 *       this.tooltip.style.display = 'none';
 *     }
 *   }
 *
 *   createTooltip() {
 *     this.tooltip = document.createElement('div');
 *     this.tooltip.className = 'tooltip';
 *     this.tooltip.textContent = this.options.text || this.element.dataset.tooltipText;
 *     document.body.appendChild(this.tooltip);
 *   }
 * }
 *
 * // HTML: <button data-tooltip='{"text": "Click me!", "placement": "bottom"}'>Hover</button>
 * const tooltipInstances = createPluginInstance('[data-tooltip]', {
 *   theme: 'dark'
 * }, Tooltip);
 *
 * @example
 * // Using the built-in destroy functionality
 * class Slider {
 *   constructor(element, options = {}) {
 *     this.element = element;
 *     this.options = { autoplay: true, interval: 3000, ...options };
 *     this.currentSlide = 0;
 *     this.slides = element.querySelectorAll('.slide');
 *     this.autoplayTimer = null;
 *     this.init();
 *   }
 *
 *   init() {
 *     this.setupNavigation();
 *     if (this.options.autoplay) {
 *       this.startAutoplay();
 *     }
 *   }
 *
 *   setupNavigation() {
 *     const prevBtn = this.element.querySelector('.prev');
 *     const nextBtn = this.element.querySelector('.next');
 *
 *     if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
 *     if (nextBtn) nextBtn.addEventListener('click', () => this.next());
 *   }
 *
 *   next() {
 *     this.currentSlide = (this.currentSlide + 1) % this.slides.length;
 *     this.updateSlide();
 *   }
 *
 *   prev() {
 *     this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
 *     this.updateSlide();
 *   }
 *
 *   updateSlide() {
 *     this.slides.forEach((slide, index) => {
 *       slide.classList.toggle('active', index === this.currentSlide);
 *     });
 *   }
 *
 *   startAutoplay() {
 *     this.autoplayTimer = setInterval(() => this.next(), this.options.interval);
 *   }
 *
 *   stopAutoplay() {
 *     if (this.autoplayTimer) {
 *       clearInterval(this.autoplayTimer);
 *       this.autoplayTimer = null;
 *     }
 *   }
 *
 *   // Custom cleanup method that will be called before destroy
 *   cleanup() {
 *     this.stopAutoplay();
 *   }
 * }
 *
 * const sliderInstances = createPluginInstance('.slider', {
 *   autoplay: true,
 *   interval: 5000
 * }, Slider);
 *
 * // Later, destroy all slider instances
 * sliderInstances.forEach(instance => {
 *   if (instance.cleanup) instance.cleanup(); // Custom cleanup
 *   instance.destroy(); // Built-in destroy method
 * });
 *
 * @example
 * // Preventing duplicate instances (returns existing instance)
 * const element = document.getElementById('unique-modal');
 *
 * // First call creates new instance
 * const instances1 = createPluginInstance(element, { theme: 'dark' }, Modal);
 * console.log(instances1.length); // 1
 *
 * // Second call returns existing instance (no duplicate created)
 * const instances2 = createPluginInstance(element, { theme: 'light' }, Modal);
 * console.log(instances2.length); // 1
 * console.log(instances1[0] === instances2[0]); // true (same instance)
 *
 * @example
 * // Real-world use case: Image gallery with lightbox
 * class ImageGallery {
 *   constructor(element, options = {}) {
 *     this.element = element;
 *     this.options = {
 *       thumbnailSelector: '.thumbnail',
 *       lightboxClass: 'lightbox',
 *       showCaptions: true,
 *       autoAdvance: false,
 *       ...options
 *     };
 *
 *     this.images = [];
 *     this.currentIndex = 0;
 *     this.lightbox = null;
 *     this.init();
 *   }
 *
 *   init() {
 *     this.collectImages();
 *     this.setupThumbnails();
 *     this.createLightbox();
 *   }
 *
 *   collectImages() {
 *     const thumbnails = this.element.querySelectorAll(this.options.thumbnailSelector);
 *     this.images = Array.from(thumbnails).map(thumb => ({
 *       src: thumb.dataset.fullsize || thumb.src,
 *       caption: thumb.alt || thumb.dataset.caption,
 *       thumbnail: thumb
 *     }));
 *   }
 *
 *   setupThumbnails() {
 *     this.images.forEach((image, index) => {
 *       image.thumbnail.addEventListener('click', (e) => {
 *         e.preventDefault();
 *         this.openLightbox(index);
 *       });
 *     });
 *   }
 *
 *   createLightbox() {
 *     this.lightbox = document.createElement('div');
 *     this.lightbox.className = this.options.lightboxClass;
 *     this.lightbox.innerHTML = `
 *       <div class="lightbox-content">
 *         <img class="lightbox-image" src="" alt="">
 *         <div class="lightbox-caption"></div>
 *         <button class="lightbox-prev">‹</button>
 *         <button class="lightbox-next">›</button>
 *         <button class="lightbox-close">×</button>
 *       </div>
 *     `;
 *     document.body.appendChild(this.lightbox);
 *     this.setupLightboxEvents();
 *   }
 *
 *   setupLightboxEvents() {
 *     const prev = this.lightbox.querySelector('.lightbox-prev');
 *     const next = this.lightbox.querySelector('.lightbox-next');
 *     const close = this.lightbox.querySelector('.lightbox-close');
 *
 *     prev.addEventListener('click', () => this.prevImage());
 *     next.addEventListener('click', () => this.nextImage());
 *     close.addEventListener('click', () => this.closeLightbox());
 *
 *     this.lightbox.addEventListener('click', (e) => {
 *       if (e.target === this.lightbox) this.closeLightbox();
 *     });
 *   }
 *
 *   openLightbox(index) {
 *     this.currentIndex = index;
 *     this.updateLightboxImage();
 *     this.lightbox.style.display = 'flex';
 *     document.body.style.overflow = 'hidden';
 *   }
 *
 *   closeLightbox() {
 *     this.lightbox.style.display = 'none';
 *     document.body.style.overflow = '';
 *   }
 *
 *   nextImage() {
 *     this.currentIndex = (this.currentIndex + 1) % this.images.length;
 *     this.updateLightboxImage();
 *   }
 *
 *   prevImage() {
 *     this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
 *     this.updateLightboxImage();
 *   }
 *
 *   updateLightboxImage() {
 *     const image = this.images[this.currentIndex];
 *     const img = this.lightbox.querySelector('.lightbox-image');
 *     const caption = this.lightbox.querySelector('.lightbox-caption');
 *
 *     img.src = image.src;
 *     img.alt = image.caption;
 *
 *     if (this.options.showCaptions && image.caption) {
 *       caption.textContent = image.caption;
 *       caption.style.display = 'block';
 *     } else {
 *       caption.style.display = 'none';
 *     }
 *   }
 *
 *   cleanup() {
 *     if (this.lightbox && this.lightbox.parentNode) {
 *       this.lightbox.parentNode.removeChild(this.lightbox);
 *     }
 *     document.body.style.overflow = '';
 *   }
 * }
 *
 * // Initialize galleries
 * const galleryInstances = createPluginInstance('.image-gallery', {
 *   thumbnailSelector: 'img',
 *   showCaptions: true,
 *   autoAdvance: false
 * }, ImageGallery);
 *
 * @see getPluginInstance - For retrieving existing plugin instances
 * @see triggerEvent - For dispatching custom events from plugins
 * @see getOptionsFromAttribute - For extracting plugin options from data attributes
 *
 * @since 0.3.0
 */
export function createPluginInstance( selectors, options, plugin ) {
	const weakMap = getWeakMap( namespace );
	return Array.from( getElements( selectors ) ).map( ( element ) => {
		if ( weakMap.has( element ) ) return weakMap.get( element );

		const instance = new plugin( element, options );
		instance.element = element;
		instance.destroy = () => {
			weakMap.delete( element );
			triggerEvent( element, 'destroy' );
		};

		weakMap.set( element, instance );
		return instance;
	} );
}

/**
 * Retrieves existing plugin instances for selected DOM elements from WeakMap storage.
 *
 * This function provides a way to access previously created plugin instances without
 * creating new ones. It only returns instances for elements that already have plugins
 * attached via createPluginInstance(). Elements without existing instances are filtered
 * out from the results, ensuring you only work with active, initialized plugins.
 *
 * @param {string|HTMLElement|NodeList|HTMLElement[]} selectors - Elements to get plugin instances for
 * @returns {Array<Object>} Array of existing plugin instances (excludes elements without instances)
 *
 * @example
 * // Basic usage - retrieving existing modal instances
 * class Modal {
 *   constructor(element, options = {}) {
 *     this.element = element;
 *     this.options = options;
 *     this.isOpen = false;
 *   }
 *
 *   open() {
 *     this.isOpen = true;
 *     this.element.style.display = 'block';
 *     console.log(`Modal ${this.element.id} opened`);
 *   }
 *
 *   close() {
 *     this.isOpen = false;
 *     this.element.style.display = 'none';
 *     console.log(`Modal ${this.element.id} closed`);
 *   }
 *
 *   toggle() {
 *     this.isOpen ? this.close() : this.open();
 *   }
 *
 *   getState() {
 *     return {
 *       elementId: this.element.id,
 *       isOpen: this.isOpen,
 *       options: this.options
 *     };
 *   }
 * }
 *
 * // First create some modal instances
 * createPluginInstance('.modal', { backdrop: true }, Modal);
 *
 * // Later, retrieve existing instances to work with them
 * const existingModals = getPluginInstance('.modal');
 * console.log(`Found ${existingModals.length} existing modal instances`);
 *
 * // Call methods on existing instances
 * existingModals.forEach(modal => {
 *   console.log('Modal state:', modal.getState());
 *   modal.open();
 * });
 *
 * @example
 * // Working with specific elements - only returns instances that exist
 * const modal1 = document.getElementById('modal1');
 * const modal2 = document.getElementById('modal2');
 * const modal3 = document.getElementById('modal3');
 *
 * // Create instances for modal1 and modal2 only
 * createPluginInstance([modal1, modal2], {}, Modal);
 *
 * // Try to get instances for all three modals
 * const modalInstances = getPluginInstance([modal1, modal2, modal3]);
 * console.log(modalInstances.length); // 2 (modal3 has no instance, so it's excluded)
 *
 * // Verify which modals have instances
 * const modalIds = modalInstances.map(modal => modal.element.id);
 * console.log('Modals with instances:', modalIds); // ['modal1', 'modal2']
 *
 * @example
 * // Checking for existing instances before creating new ones
 * function initializeDropdowns(selector, options = {}) {
 *   // First, check for existing instances
 *   const existing = getPluginInstance(selector);
 *
 *   if (existing.length > 0) {
 *     console.log(`Found ${existing.length} existing dropdown instances`);
 *     return existing;
 *   }
 *
 *   // Create new instances if none exist
 *   console.log('No existing instances found, creating new dropdown instances');
 *   return createPluginInstance(selector, options, DropdownMenu);
 * }
 *
 * class DropdownMenu {
 *   constructor(element, options = {}) {
 *     this.element = element;
 *     this.options = { closeOnClick: true, ...options };
 *     this.isOpen = false;
 *     this.menu = element.querySelector('.dropdown-menu');
 *     this.toggle = element.querySelector('.dropdown-toggle');
 *     this.init();
 *   }
 *
 *   init() {
 *     this.toggle.addEventListener('click', (e) => {
 *       e.preventDefault();
 *       this.toggleMenu();
 *     });
 *   }
 *
 *   toggleMenu() {
 *     this.isOpen ? this.close() : this.open();
 *   }
 *
 *   open() {
 *     this.isOpen = true;
 *     this.menu.style.display = 'block';
 *     this.element.classList.add('open');
 *   }
 *
 *   close() {
 *     this.isOpen = false;
 *     this.menu.style.display = 'none';
 *     this.element.classList.remove('open');
 *   }
 * }
 *
 * // First call creates instances
 * const dropdowns1 = initializeDropdowns('.dropdown');
 *
 * // Second call returns existing instances (no duplicates created)
 * const dropdowns2 = initializeDropdowns('.dropdown');
 *
 * console.log(dropdowns1[0] === dropdowns2[0]); // true (same instances)
 *
 * @example
 * // Updating configuration of existing instances
 * function updateSliderSettings(selector, newOptions) {
 *   const sliders = getPluginInstance(selector);
 *
 *   if (sliders.length === 0) {
 *     console.warn('No slider instances found for selector:', selector);
 *     return [];
 *   }
 *
 *   sliders.forEach(slider => {
 *     // Merge new options with existing ones
 *     Object.assign(slider.options, newOptions);
 *
 *     // Reinitialize with new settings if method exists
 *     if (typeof slider.reinit === 'function') {
 *       slider.reinit();
 *     }
 *
 *     console.log(`Updated slider on element: ${slider.element.id}`);
 *   });
 *
 *   console.log(`Updated ${sliders.length} slider instances`);
 *   return sliders;
 * }
 *
 * class Slider {
 *   constructor(element, options = {}) {
 *     this.element = element;
 *     this.options = { autoplay: true, interval: 3000, ...options };
 *     this.currentSlide = 0;
 *     this.timer = null;
 *     this.init();
 *   }
 *
 *   init() {
 *     this.setupSlider();
 *     if (this.options.autoplay) {
 *       this.startAutoplay();
 *     }
 *   }
 *
 *   reinit() {
 *     this.stop();
 *     this.init();
 *   }
 *
 *   startAutoplay() {
 *     this.timer = setInterval(() => this.next(), this.options.interval);
 *   }
 *
 *   stop() {
 *     if (this.timer) {
 *       clearInterval(this.timer);
 *       this.timer = null;
 *     }
 *   }
 *
 *   setupSlider() {
 *     // Slider setup logic
 *   }
 *
 *   next() {
 *     // Next slide logic
 *   }
 * }
 *
 * // Create sliders
 * createPluginInstance('.slider', { autoplay: true, interval: 3000 }, Slider);
 *
 * // Later, update settings on existing instances
 * updateSliderSettings('.slider', { autoplay: false, interval: 5000 });
 *
 * @example
 * // Batch operations on existing instances
 * function pauseAllCarousels() {
 *   const carousels = getPluginInstance('.carousel');
 *
 *   if (carousels.length === 0) {
 *     console.log('No carousel instances found to pause');
 *     return;
 *   }
 *
 *   carousels.forEach(carousel => {
 *     if (typeof carousel.pause === 'function') {
 *       carousel.pause();
 *     }
 *   });
 *
 *   console.log(`Paused ${carousels.length} carousels`);
 * }
 *
 * function resumeAllCarousels() {
 *   const carousels = getPluginInstance('.carousel');
 *
 *   carousels.forEach(carousel => {
 *     if (typeof carousel.resume === 'function') {
 *       carousel.resume();
 *     }
 *   });
 *
 *   console.log(`Resumed ${carousels.length} carousels`);
 * }
 *
 * function getAllCarouselStates() {
 *   const carousels = getPluginInstance('.carousel');
 *
 *   return carousels.map(carousel => ({
 *     elementId: carousel.element.id || 'unnamed',
 *     isPlaying: carousel.isPlaying || false,
 *     currentSlide: carousel.currentSlide || 0,
 *     totalSlides: carousel.totalSlides || 0,
 *     options: carousel.options
 *   }));
 * }
 *
 * // Usage
 * pauseAllCarousels();
 * setTimeout(resumeAllCarousels, 5000);
 * console.log('Carousel states:', getAllCarouselStates());
 *
 * @example
 * // Event-driven instance management and communication
 * class NotificationManager {
 *   constructor(element, options = {}) {
 *     this.element = element;
 *     this.options = { autoHide: true, duration: 3000, ...options };
 *     this.notifications = [];
 *     this.init();
 *   }
 *
 *   init() {
 *     this.element.addEventListener('addNotification', (e) => {
 *       this.addNotification(e.detail);
 *     });
 *   }
 *
 *   addNotification(data) {
 *     const notification = this.createNotification(data);
 *     this.notifications.push(notification);
 *
 *     if (this.options.autoHide) {
 *       setTimeout(() => this.removeNotification(notification), this.options.duration);
 *     }
 *   }
 *
 *   createNotification(data) {
 *     const div = document.createElement('div');
 *     div.className = `notification ${data.type || 'info'}`;
 *     div.textContent = data.message;
 *     this.element.appendChild(div);
 *     return div;
 *   }
 *
 *   removeNotification(notification) {
 *     if (notification.parentNode) {
 *       notification.parentNode.removeChild(notification);
 *     }
 *     this.notifications = this.notifications.filter(n => n !== notification);
 *   }
 *
 *   clearAll() {
 *     this.notifications.forEach(n => this.removeNotification(n));
 *   }
 *
 *   getCount() {
 *     return this.notifications.length;
 *   }
 * }
 *
 * // Create notification managers
 * createPluginInstance('.notification-container', {
 *   autoHide: true,
 *   duration: 4000
 * }, NotificationManager);
 *
 * // Function to broadcast notifications to all existing managers
 * function broadcastNotification(message, type = 'info') {
 *   const managers = getPluginInstance('.notification-container');
 *
 *   if (managers.length === 0) {
 *     console.warn('No notification managers found');
 *     return;
 *   }
 *
 *   managers.forEach(manager => {
 *     triggerEvent(manager.element, 'addNotification', { message, type });
 *   });
 *
 *   console.log(`Broadcasted notification to ${managers.length} managers`);
 * }
 *
 * // Function to get total notification count across all managers
 * function getTotalNotificationCount() {
 *   const managers = getPluginInstance('.notification-container');
 *   return managers.reduce((total, manager) => total + manager.getCount(), 0);
 * }
 *
 * // Function to clear all notifications from all managers
 * function clearAllNotifications() {
 *   const managers = getPluginInstance('.notification-container');
 *   managers.forEach(manager => manager.clearAll());
 *   console.log(`Cleared notifications from ${managers.length} managers`);
 * }
 *
 * // Usage
 * broadcastNotification('Welcome to the app!', 'success');
 * broadcastNotification('Settings saved', 'info');
 * console.log('Total notifications:', getTotalNotificationCount());
 *
 * @example
 * // Form validation system - retrieve and validate existing forms
 * class FormValidator {
 *   constructor(element, options = {}) {
 *     this.element = element;
 *     this.options = {
 *       validateOnBlur: true,
 *       validateOnSubmit: true,
 *       showErrors: true,
 *       ...options
 *     };
 *     this.fields = [];
 *     this.errors = {};
 *     this.isValid = false;
 *     this.init();
 *   }
 *
 *   init() {
 *     this.collectFields();
 *     this.setupEventListeners();
 *   }
 *
 *   collectFields() {
 *     const inputs = this.element.querySelectorAll('input, select, textarea');
 *     this.fields = Array.from(inputs).filter(input => input.hasAttribute('data-validate'));
 *   }
 *
 *   setupEventListeners() {
 *     if (this.options.validateOnSubmit) {
 *       this.element.addEventListener('submit', (e) => {
 *         if (!this.validateForm()) {
 *           e.preventDefault();
 *         }
 *       });
 *     }
 *   }
 *
 *   validateForm() {
 *     this.fields.forEach(field => this.validateField(field));
 *     this.isValid = Object.values(this.errors).every(errors => errors.length === 0);
 *     return this.isValid;
 *   }
 *
 *   validateField(field) {
 *     const rules = field.dataset.validate.split('|');
 *     const errors = [];
 *
 *     rules.forEach(rule => {
 *       if (!this.applyRule(field.value, rule)) {
 *         errors.push(this.getErrorMessage(rule));
 *       }
 *     });
 *
 *     this.errors[field.name] = errors;
 *     return errors.length === 0;
 *   }
 *
 *   applyRule(value, rule) {
 *     if (rule === 'required') return value.trim() !== '';
 *     if (rule === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
 *     if (rule.startsWith('min:')) return value.length >= parseInt(rule.split(':')[1]);
 *     return true;
 *   }
 *
 *   getErrorMessage(rule) {
 *     const messages = {
 *       required: 'This field is required',
 *       email: 'Please enter a valid email address',
 *       'min:6': 'Minimum 6 characters required'
 *     };
 *     return messages[rule] || 'Invalid value';
 *   }
 *
 *   getFormData() {
 *     const data = {};
 *     this.fields.forEach(field => {
 *       data[field.name] = field.value;
 *     });
 *     return data;
 *   }
 *
 *   reset() {
 *     this.fields.forEach(field => {
 *       field.value = '';
 *       field.classList.remove('error');
 *     });
 *     this.errors = {};
 *   }
 *
 *   getValidationSummary() {
 *     return {
 *       formId: this.element.id,
 *       isValid: this.isValid,
 *       errorCount: Object.values(this.errors).reduce((count, errors) => count + errors.length, 0),
 *       fieldCount: this.fields.length,
 *       errors: this.errors
 *     };
 *   }
 * }
 *
 * // Initialize form validators
 * createPluginInstance('form[data-validate-form]', {
 *   validateOnBlur: true,
 *   validateOnSubmit: true
 * }, FormValidator);
 *
 * // Function to validate all existing forms programmatically
 * function validateAllForms() {
 *   const validators = getPluginInstance('form[data-validate-form]');
 *
 *   if (validators.length === 0) {
 *     console.log('No form validators found');
 *     return [];
 *   }
 *
 *   const results = validators.map(validator => {
 *     validator.validateForm();
 *     return validator.getValidationSummary();
 *   });
 *
 *   console.log('Validation results:', results);
 *   return results;
 * }
 *
 * // Function to get validation summary for all forms
 * function getFormsValidationStatus() {
 *   const validators = getPluginInstance('form[data-validate-form]');
 *
 *   const summary = {
 *     totalForms: validators.length,
 *     validForms: 0,
 *     invalidForms: 0,
 *     totalErrors: 0,
 *     forms: []
 *   };
 *
 *   validators.forEach(validator => {
 *     const formSummary = validator.getValidationSummary();
 *     summary.forms.push(formSummary);
 *
 *     if (formSummary.isValid) {
 *       summary.validForms++;
 *     } else {
 *       summary.invalidForms++;
 *     }
 *
 *     summary.totalErrors += formSummary.errorCount;
 *   });
 *
 *   return summary;
 * }
 *
 * // Function to reset all existing forms
 * function resetAllForms() {
 *   const validators = getPluginInstance('form[data-validate-form]');
 *   validators.forEach(validator => validator.reset());
 *   console.log(`Reset ${validators.length} forms`);
 * }
 *
 * @example
 * // Dynamic content management with cleanup
 * let activeTooltips = [];
 *
 * class Tooltip {
 *   constructor(element, options = {}) {
 *     this.element = element;
 *     this.options = { placement: 'top', trigger: 'hover', ...options };
 *     this.tooltip = null;
 *     this.isVisible = false;
 *     this.init();
 *   }
 *
 *   init() {
 *     if (this.options.trigger === 'hover') {
 *       this.element.addEventListener('mouseenter', () => this.show());
 *       this.element.addEventListener('mouseleave', () => this.hide());
 *     } else if (this.options.trigger === 'click') {
 *       this.element.addEventListener('click', () => this.toggle());
 *     }
 *   }
 *
 *   show() {
 *     if (!this.tooltip) this.createTooltip();
 *     this.tooltip.style.display = 'block';
 *     this.isVisible = true;
 *   }
 *
 *   hide() {
 *     if (this.tooltip) this.tooltip.style.display = 'none';
 *     this.isVisible = false;
 *   }
 *
 *   toggle() {
 *     this.isVisible ? this.hide() : this.show();
 *   }
 *
 *   createTooltip() {
 *     this.tooltip = document.createElement('div');
 *     this.tooltip.className = 'tooltip';
 *     this.tooltip.textContent = this.element.dataset.tooltip;
 *     document.body.appendChild(this.tooltip);
 *   }
 *
 *   destroy() {
 *     if (this.tooltip && this.tooltip.parentNode) {
 *       this.tooltip.parentNode.removeChild(this.tooltip);
 *     }
 *     this.tooltip = null;
 *     this.isVisible = false;
 *   }
 * }
 *
 * function createTooltipsForNewContent(container) {
 *   const tooltipElements = container.querySelectorAll('[data-tooltip]');
 *
 *   if (tooltipElements.length > 0) {
 *     const newTooltips = createPluginInstance(tooltipElements, {
 *       placement: 'top',
 *       trigger: 'hover'
 *     }, Tooltip);
 *
 *     activeTooltips.push(...newTooltips);
 *     console.log(`Created ${newTooltips.length} new tooltips`);
 *   }
 * }
 *
 * function cleanupTooltipsInContainer(container) {
 *   const tooltipElements = container.querySelectorAll('[data-tooltip]');
 *   const containedTooltips = getPluginInstance(tooltipElements);
 *
 *   containedTooltips.forEach(tooltip => {
 *     tooltip.destroy();
 *     activeTooltips = activeTooltips.filter(t => t !== tooltip);
 *   });
 *
 *   console.log(`Cleaned up ${containedTooltips.length} tooltips`);
 * }
 *
 * function getAllActiveTooltips() {
 *   // Get all tooltips from DOM and filter out destroyed instances
 *   const allTooltipElements = document.querySelectorAll('[data-tooltip]');
 *   const currentTooltips = getPluginInstance(allTooltipElements);
 *
 *   // Update our tracking array
 *   activeTooltips = currentTooltips;
 *
 *   return currentTooltips;
 * }
 *
 * function hideAllTooltips() {
 *   const tooltips = getAllActiveTooltips();
 *   tooltips.forEach(tooltip => tooltip.hide());
 *   console.log(`Hidden ${tooltips.length} tooltips`);
 * }
 *
 * function getTooltipStates() {
 *   const tooltips = getAllActiveTooltips();
 *   return tooltips.map(tooltip => ({
 *     elementId: tooltip.element.id || 'unnamed',
 *     text: tooltip.element.dataset.tooltip,
 *     isVisible: tooltip.isVisible,
 *     placement: tooltip.options.placement,
 *     trigger: tooltip.options.trigger
 *   }));
 * }
 *
 * // Usage in dynamic content scenarios
 * const dynamicContainer = document.getElementById('dynamic-content');
 *
 * // When new content is added
 * function addNewContent(htmlContent) {
 *   dynamicContainer.innerHTML += htmlContent;
 *   createTooltipsForNewContent(dynamicContainer);
 * }
 *
 * // When content is removed
 * function clearContent() {
 *   cleanupTooltipsInContainer(dynamicContainer);
 *   dynamicContainer.innerHTML = '';
 * }
 *
 * // Monitor active tooltips
 * function reportTooltipStatus() {
 *   const active = getAllActiveTooltips();
 *   const states = getTooltipStates();
 *   console.log(`Active tooltips: ${active.length}`);
 *   console.table(states);
 * }
 *
 * @example
 * // Conditional instance retrieval with fallback creation
 * function getOrCreateImageLightbox(selector, options = {}) {
 *   // Try to get existing instances first
 *   let instances = getPluginInstance(selector);
 *
 *   // If no instances found, create them
 *   if (instances.length === 0) {
 *     instances = createPluginInstance(selector, options, ImageLightbox);
 *     console.log(`Created ${instances.length} new lightbox instances`);
 *   } else {
 *     console.log(`Found ${instances.length} existing lightbox instances`);
 *   }
 *
 *   return instances;
 * }
 *
 * class ImageLightbox {
 *   constructor(element, options = {}) {
 *     this.element = element;
 *     this.options = { animation: 'fade', closeOnEscape: true, ...options };
 *     this.images = Array.from(element.querySelectorAll('img'));
 *     this.currentIndex = 0;
 *     this.isOpen = false;
 *     this.init();
 *   }
 *
 *   init() {
 *     this.images.forEach((img, index) => {
 *       img.addEventListener('click', () => this.openLightbox(index));
 *     });
 *   }
 *
 *   openLightbox(index) {
 *     this.currentIndex = index;
 *     this.isOpen = true;
 *     // Lightbox opening logic
 *     console.log(`Opened lightbox at image ${index}`);
 *   }
 *
 *   closeLightbox() {
 *     this.isOpen = false;
 *     // Lightbox closing logic
 *     console.log('Closed lightbox');
 *   }
 *
 *   nextImage() {
 *     this.currentIndex = (this.currentIndex + 1) % this.images.length;
 *     console.log(`Moved to image ${this.currentIndex}`);
 *   }
 *
 *   prevImage() {
 *     this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
 *     console.log(`Moved to image ${this.currentIndex}`);
 *   }
 *
 *   getCurrentImageInfo() {
 *     return {
 *       index: this.currentIndex,
 *       total: this.images.length,
 *       src: this.images[this.currentIndex]?.src,
 *       alt: this.images[this.currentIndex]?.alt
 *     };
 *   }
 * }
 *
 * // Usage - will create if not exists, or return existing
 * const lightboxes1 = getOrCreateImageLightbox('.gallery');
 * const lightboxes2 = getOrCreateImageLightbox('.gallery'); // Returns same instances
 *
 * // Function to get status of all lightboxes
 * function getAllLightboxStatus() {
 *   const lightboxes = getPluginInstance('.gallery');
 *   return lightboxes.map(lightbox => ({
 *     galleryElement: lightbox.element.id || 'unnamed',
 *     isOpen: lightbox.isOpen,
 *     currentImage: lightbox.getCurrentImageInfo(),
 *     options: lightbox.options
 *   }));
 * }
 *
 * @example
 * // Error handling and instance validation
 * function safelyExecuteOnInstances(selector, methodName, ...args) {
 *   const instances = getPluginInstance(selector);
 *
 *   if (instances.length === 0) {
 *     console.warn(`No instances found for selector: ${selector}`);
 *     return [];
 *   }
 *
 *   const results = [];
 *
 *   instances.forEach((instance, index) => {
 *     try {
 *       if (typeof instance[methodName] === 'function') {
 *         const result = instance[methodName](...args);
 *         results.push({ success: true, result, instance });
 *       } else {
 *         console.warn(`Method ${methodName} not found on instance ${index}`);
 *         results.push({ success: false, error: `Method not found: ${methodName}`, instance });
 *       }
 *     } catch (error) {
 *       console.error(`Error calling ${methodName} on instance ${index}:`, error);
 *       results.push({ success: false, error: error.message, instance });
 *     }
 *   });
 *
 *   return results;
 * }
 *
 * function validateInstances(selector, requiredMethods = []) {
 *   const instances = getPluginInstance(selector);
 *
 *   return instances.map(instance => {
 *     const validation = {
 *       instance,
 *       elementId: instance.element?.id || 'unnamed',
 *       isValid: true,
 *       missingMethods: [],
 *       hasElement: !!instance.element,
 *       elementInDOM: instance.element?.parentNode !== null
 *     };
 *
 *     requiredMethods.forEach(method => {
 *       if (typeof instance[method] !== 'function') {
 *         validation.isValid = false;
 *         validation.missingMethods.push(method);
 *       }
 *     });
 *
 *     return validation;
 *   });
 * }
 *
 * // Usage examples
 * const openResults = safelyExecuteOnInstances('.modal', 'open');
 * console.log('Open results:', openResults);
 *
 * const validationResults = validateInstances('.modal', ['open', 'close', 'toggle']);
 * console.log('Validation results:', validationResults);
 *
 * @see createPluginInstance - For creating new plugin instances
 * @see triggerEvent - For custom event dispatching
 * @see getElements - For element selection and normalization
 *
 * @since 0.3.0
 */
export function getPluginInstance( selectors ) {
	const weakMap = getWeakMap( namespace );
	return Array.from( getElements( selectors ) )
		.filter( ( element ) => weakMap.has( element ) )
		.map( ( element ) => weakMap.get( element ) );
}

/**
 * Dispatches a custom event on a target DOM element with optional event details and configuration.
 * Provides a convenient wrapper around the native CustomEvent constructor and dispatchEvent method.
 *
 * @param {HTMLElement[]|HTMLElement|EventTarget} $targets - The DOM element or EventTarget to dispatch the event on
 * @param {string} eventType - The name/type of the custom event to dispatch
 * @param {Object} [eventDetails={}] - Data to include in the event's detail property
 * @param {Object} [options={}] - CustomEvent configuration options
 * @param {boolean} [options.bubbles=false] - Whether the event bubbles up through the DOM tree
 * @param {boolean} [options.cancelable=true] - Whether the event can be canceled with preventDefault()
 * @param {boolean} [options.composed=false] - Whether the event will trigger listeners outside of a shadow root
 * @returns {boolean} True if the event was not canceled, false if preventDefault() was called
 * @example
 * // Basic custom event dispatch
 * const button = document.getElementById('my-button');
 *
 * triggerEvent(button, 'customClick', {
 *   timestamp: Date.now(),
 *   userId: 123
 * });
 *
 * // Listen for the custom event
 * button.addEventListener('customClick', (event) => {
 *   console.log('Custom click:', event.detail);
 *   // { timestamp: 1634567890123, userId: 123 }
 * });
 *
 * @example
 * // Event with bubbling enabled
 * const childElement = document.querySelector('.child');
 * const parentElement = document.querySelector('.parent');
 *
 * // Event will bubble up to parent
 * triggerEvent(childElement, 'dataUpdate',
 *   { newValue: 'updated data' },
 *   { bubbles: true }
 * );
 *
 * // Parent can catch the bubbled event
 * parentElement.addEventListener('dataUpdate', (event) => {
 *   console.log('Caught bubbled event:', event.detail.newValue);
 * });
 *
 * @example
 * // Cancelable event with preventDefault check
 * const form = document.querySelector('form');
 *
 * const wasNotCanceled = triggerEvent(form, 'beforeSubmit',
 *   { formData: new FormData(form) },
 *   { cancelable: true, bubbles: true }
 * );
 *
 * if (wasNotCanceled) {
 *   console.log('Event was not canceled, proceed with submit');
 * } else {
 *   console.log('Event was canceled, abort submit');
 * }
 *
 * // Listener that cancels the event
 * form.addEventListener('beforeSubmit', (event) => {
 *   if (!validateForm(event.detail.formData)) {
 *     event.preventDefault(); // Cancel the event
 *   }
 * });
 *
 * @example
 * // Component communication pattern
 * class CustomComponent {
 *   constructor(element) {
 *     this.element = element;
 *   }
 *
 *   updateValue(newValue) {
 *     const oldValue = this.value;
 *     this.value = newValue;
 *
 *     // Notify listeners of the change
 *     triggerEvent(this.element, 'valueChanged', {
 *       oldValue,
 *       newValue,
 *       component: this
 *     }, { bubbles: true });
 *   }
 * }
 *
 * @example
 * // Modal dialog events
 * const modal = document.querySelector('.modal');
 *
 * function openModal() {
 *   // Dispatch opening event (cancelable)
 *   const canOpen = triggerEvent(modal, 'modalOpening',
 *     { timestamp: Date.now() },
 *     { cancelable: true, bubbles: true }
 *   );
 *
 *   if (canOpen) {
 *     modal.classList.add('open');
 *
 *     // Dispatch opened event (non-cancelable)
 *     triggerEvent(modal, 'modalOpened',
 *       { timestamp: Date.now() },
 *       { bubbles: true }
 *     );
 *   }
 * }
 *
 * // Prevent modal from opening under certain conditions
 * modal.addEventListener('modalOpening', (event) => {
 *   if (document.querySelector('.blocking-overlay')) {
 *     event.preventDefault();
 *     console.log('Modal opening prevented');
 *   }
 * });
 *
 * @example
 * // Cross-component event system
 * const eventBus = document.body; // Use body as event bus
 *
 * // Component A dispatches events
 * function componentAAction() {
 *   triggerEvent(eventBus, 'userAction', {
 *     action: 'buttonClick',
 *     componentId: 'componentA',
 *     data: { userId: getCurrentUserId() }
 *   }, { bubbles: true });
 * }
 *
 * // Component B listens for events
 * eventBus.addEventListener('userAction', (event) => {
 *   const { action, componentId, data } = event.detail;
 *
 *   if (componentId !== 'componentB') {
 *     updateComponentB(action, data);
 *   }
 * });
 *
 * @example
 * // Web Components custom events
 * class MyWebComponent extends HTMLElement {
 *   connectedCallback() {
 *     this.addEventListener('click', this.handleClick.bind(this));
 *   }
 *
 *   handleClick() {
 *     triggerEvent(this, 'my-component-clicked', {
 *       elementId: this.id,
 *       timestamp: Date.now(),
 *       position: this.getBoundingClientRect()
 *     }, {
 *       bubbles: true,
 *       composed: true // Allow event to cross shadow DOM boundary
 *     });
 *   }
 * }
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent CustomEvent API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent dispatchEvent API
 */
export function triggerEvent(
	$targets,
	eventType,
	eventDetails = {},
	options = {}
) {
	const defaultOptions = {
		bubbles: false,
		cancelable: true,
		composed: false,
	};
	const availableOptions = { ...defaultOptions, ...options };

	const $elements = getElements( $targets );

	$elements.forEach( ( $element ) => {
		return $element.dispatchEvent(
			new CustomEvent( eventType, {
				...availableOptions,
				detail: {
					...eventDetails,
				},
			} )
		);
	} );
}

/**
 * Attaches swipe gesture detection to a DOM element, supporting both touch and pointer events.
 * Automatically registers event listeners and provides directional swipe detection with customizable offset.
 *
 * @param {HTMLElement} target - The DOM element to attach swipe detection to
 * @param {Function} listenerFn - Callback function that handles swipe events
 * @param {Object} [options={}] - Configuration options
 * @param {number} [options.offset=10] - Minimum pixel distance to register a directional swipe
 * @param {boolean} [options.touchOnly=false] - If true, only listen for touch events (ignore pointer/mouse)
 * @returns {Function} A cleanup function to remove all event listeners and abort the controller
 *
 * @example
 * // Basic swipe detection on a div element
 * const swipeArea = document.getElementById('swipe-area');
 *
 * const cleanup = swipeEvent(swipeArea, (event) => {
 *   const { detail } = event;
 *
 *   if (detail.done) {
 *     if (detail.left) console.log('Swiped left!');
 *     if (detail.right) console.log('Swiped right!');
 *     if (detail.top) console.log('Swiped up!');
 *     if (detail.bottom) console.log('Swiped down!');
 *   }
 * });
 *
 * // Clean up when done
 * // cleanup();
 *
 * @example
 * // Custom offset for more sensitive detection
 * const sensitiveSwipe = swipeEvent(element, (event) => {
 *   const { detail } = event;
 *   console.log(`Swipe distance: x=${detail.x}, y=${detail.y}`);
 * }, { offset: 5 }); // Only need 5px to trigger direction
 *
 * @example
 * // Touch-only mode (no mouse/pointer support)
 * const touchOnlySwipe = swipeEvent(mobileElement, (event) => {
 *   const { detail } = event;
 *
 *   if (detail.moving) {
 *     // Live tracking during swipe
 *     updateUI(detail.x, detail.y);
 *   }
 *
 *   if (detail.done) {
 *     // Final swipe result
 *     handleSwipeComplete(detail);
 *   }
 * }, { touchOnly: true });
 *
 * @example
 * // Image carousel with swipe navigation
 * const carousel = document.querySelector('.carousel');
 * let currentSlide = 0;
 *
 * swipeEvent(carousel, (event) => {
 *   const { detail } = event;
 *
 *   if (detail.done) {
 *     if (detail.left && currentSlide < maxSlides - 1) {
 *       currentSlide++;
 *       showSlide(currentSlide);
 *     } else if (detail.right && currentSlide > 0) {
 *       currentSlide--;
 *       showSlide(currentSlide);
 *     }
 *   }
 * });
 *
 * @example
 * // Card swipe with visual feedback during gesture
 * const card = document.querySelector('.swipe-card');
 *
 * swipeEvent(card, (event) => {
 *   const { detail } = event;
 *
 *   if (detail.moving) {
 *     // Provide visual feedback during swipe
 *     card.style.transform = `translateX(${detail.x}px) rotateZ(${detail.x * 0.1}deg)`;
 *
 *     // Change color based on direction
 *     if (detail.left) card.classList.add('reject-hint');
 *     if (detail.right) card.classList.add('accept-hint');
 *   }
 *
 *   if (detail.done) {
 *     if (Math.abs(detail.x) > 100) {
 *       // Complete the action if swipe was far enough
 *       detail.left ? rejectCard() : acceptCard();
 *     } else {
 *       // Snap back if swipe wasn't far enough
 *       card.style.transform = '';
 *       card.classList.remove('reject-hint', 'accept-hint');
 *     }
 *   }
 * }, { offset: 20 });
 *
 * @example
 * // Cleanup in React useEffect
 * useEffect(() => {
 *   const element = elementRef.current;
 *   if (!element) return;
 *
 *   const cleanup = swipeEvent(element, handleSwipe, { offset: 15 });
 *
 *   return cleanup; // Cleanup function returned by swipeEvent
 * }, []);
 *
 *
 * @description
 * The swipe event detail object contains:
 * - `x` {number} - Horizontal distance from start position
 * - `y` {number} - Vertical distance from start position
 * - `left` {boolean} - True if swiping left beyond offset threshold
 * - `right` {boolean} - True if swiping right beyond offset threshold
 * - `top` {boolean} - True if swiping up beyond offset threshold
 * - `bottom` {boolean} - True if swiping down beyond offset threshold
 * - `moving` {boolean} - True during active swipe, false when completed
 * - `done` {boolean} - True when swipe gesture is complete
 */
export function swipeEvent( target, listenerFn, options = {} ) {
	let readyToMove = false;
	let isMoved = false;
	let xStart = 0;
	let yStart = 0;
	let isTouchEvent = false;
	const defaults = { offset: 10, touchOnly: false };
	const settings = { ...defaults, ...options };
	const controller = new AbortController();
	const { signal } = controller;

	const start = ( event ) => {
		readyToMove = true;
		isMoved = false;

		xStart = event.x;
		yStart = event.y;
		isTouchEvent = event.type === 'touchstart';

		if ( event.type === 'pointerdown' && isTouchEvent ) {
			return false;
		}

		if ( isTouchEvent ) {
			const { clientX, clientY } = event.changedTouches[ 0 ];
			xStart = clientX;
			yStart = clientY;
		}
	};

	const move = ( event ) => {
		if ( ! readyToMove ) {
			return;
		}

		if ( event.type === 'pointermove' && isTouchEvent ) {
			return false;
		}

		let horizontalDiff = event.x - xStart;
		let verticalDiff = event.y - yStart;

		if ( isTouchEvent ) {
			const touch = event.changedTouches[ 0 ];
			horizontalDiff = touch.clientX - xStart;
			verticalDiff = touch.clientY - yStart;
		}

		isMoved = true;

		const details = {
			x: horizontalDiff,
			y: verticalDiff,
			top: verticalDiff + settings.offset < 0, // to top
			bottom: verticalDiff - settings.offset > 0, // to bottom
			left: horizontalDiff + settings.offset < 0, // to left
			right: horizontalDiff - settings.offset > 0, // to right
			moving: true,
			done: false,
		};

		triggerEvent( target, 'swipe', details );
	};

	const end = ( event ) => {
		if ( ! readyToMove ) {
			return;
		}

		const isPointerEvent =
			event.type === 'pointerleave' || event.type === 'pointerup';

		if ( isPointerEvent && isTouchEvent ) {
			return false;
		}

		let horizontalDiff = event.x - xStart;
		let verticalDiff = event.y - yStart;

		if ( isTouchEvent ) {
			const { clientX, clientY } = event.changedTouches[ 0 ];
			horizontalDiff = clientX - xStart;
			verticalDiff = clientY - yStart;
		}

		if ( isMoved ) {
			const details = {
				x: horizontalDiff,
				y: verticalDiff,
				top: verticalDiff + settings.offset < 0, // to top
				bottom: verticalDiff - settings.offset > 0, // to bottom
				left: horizontalDiff + settings.offset < 0, // to left
				right: horizontalDiff - settings.offset > 0, // to right
				moving: false,
				done: true,
			};

			triggerEvent( target, 'swipe', details );
		}

		isMoved = false;
		isTouchEvent = false;
		readyToMove = false;
	};

	const unregister = () => {
		controller.abort();
	};

	const register = () => {
		target.addEventListener( 'touchstart', start, {
			passive: true,
			signal,
		} );
		target.addEventListener( 'touchmove', move, { passive: true, signal } );
		target.addEventListener( 'touchend', end, { passive: true, signal } );
		target.addEventListener( 'touchcancel', end, { signal } );

		if ( ! settings.touchOnly ) {
			target.addEventListener( 'pointerdown', start, { signal } );
			target.addEventListener( 'pointermove', move, { signal } );
			target.addEventListener( 'pointerup', end, { signal } );
			target.addEventListener( 'pointerleave', end, { signal } );
		}

		target.addEventListener( 'swipe', listenerFn, { signal } );

		return unregister;
	};

	return register();
}

/**
 * Safely retrieves a nested value from an object using customizable path notation formats.
 *
 * This utility function provides safe access to deeply nested object properties without throwing
 * errors when intermediate properties don't exist. It supports flexible notation formats through
 * a configurable separator system, allowing you to specify which characters should be treated
 * as path separators. The function handles dot notation, hyphen notation, underscore notation,
 * bracket notation for arrays, and any custom separator combinations.
 * If the specified path doesn't exist, it returns a default value instead of throwing an error.
 *
 * @param {Object|Array} obj - The object or array to search in
 * @param {string|string[]} path - The property path as a string (using specified notation) or array of keys
 * @param {*} [defaultValue] - The default value to return if the path doesn't exist or resolves to undefined
 * @param {string|string[]} [notation=['.', '-', '_']] - The separator(s) to use for parsing the path string
 * @returns {*} The value at the specified path, or the default value if not found
 *
 * @example
 * // Basic usage with default notation (supports ., -, and _ separators)
 * const user = {
 *   name: 'John',
 *   profile: {
 *     email: 'john@example.com',
 *     settings: { theme: 'dark' }
 *   }
 * };
 *
 * console.log(findObjectValue(user, 'name')); // 'John'
 * console.log(findObjectValue(user, 'profile.email')); // 'john@example.com'
 * console.log(findObjectValue(user, 'profile-email')); // 'john@example.com'
 * console.log(findObjectValue(user, 'profile_email')); // 'john@example.com'
 * console.log(findObjectValue(user, 'profile.settings.theme')); // 'dark'
 * console.log(findObjectValue(user, 'profile-settings-theme')); // 'dark'
 * console.log(findObjectValue(user, 'profile_settings_theme')); // 'dark'
 *
 * @example
 * // Using specific single notation
 * const config = {
 *   database: {
 *     host: 'localhost',
 *     port: 5432,
 *     ssl: { enabled: true }
 *   }
 * };
 *
 * // Dot notation only
 * console.log(findObjectValue(config, 'database.host', 'defaulthost', '.')); // 'localhost'
 * console.log(findObjectValue(config, 'database.ssl.enabled', false, '.')); // true
 *
 * // Hyphen notation only
 * console.log(findObjectValue(config, 'database-host', 'defaulthost', '-')); // 'localhost'
 * console.log(findObjectValue(config, 'database-ssl-enabled', false, '-')); // true
 *
 * // Underscore notation only
 * console.log(findObjectValue(config, 'database_host', 'defaulthost', '_')); // 'localhost'
 * console.log(findObjectValue(config, 'database_ssl_enabled', false, '_')); // true
 *
 * @example
 * // Using mixed notation (multiple separators)
 * const data = {
 *   api: {
 *     endpoints: {
 *       users: '/api/users',
 *       posts: '/api/posts'
 *     }
 *   }
 * };
 *
 * // Mixed dot and hyphen notation
 * console.log(findObjectValue(data, 'api.endpoints-users', '', ['.', '-'])); // '/api/users'
 * console.log(findObjectValue(data, 'api-endpoints.posts', '', ['.', '-'])); // '/api/posts'
 *
 * // Mixed underscore and dot notation
 * console.log(findObjectValue(data, 'api_endpoints.users', '', ['_', '.'])); // '/api/users'
 * console.log(findObjectValue(data, 'api.endpoints_posts', '', ['_', '.'])); // '/api/posts'
 *
 * @example
 * // Array access with bracket notation and custom separators
 * const dataset = {
 *   users: ['Alice', 'Bob', 'Charlie'],
 *   posts: [
 *     { title: 'Post 1', author: { name: 'John', id: 1 } },
 *     { title: 'Post 2', author: { name: 'Jane', id: 2 } }
 *   ]
 * };
 *
 * // Array access with different separators
 * console.log(findObjectValue(dataset, 'users[0]', '', '.')); // 'Alice'
 * console.log(findObjectValue(dataset, 'posts[0].title', '', '.')); // 'Post 1'
 * console.log(findObjectValue(dataset, 'posts[0]-title', '', '-')); // 'Post 1'
 * console.log(findObjectValue(dataset, 'posts[1]_author_name', '', '_')); // 'Jane'
 * console.log(findObjectValue(dataset, 'posts[1].author-id', '', ['.', '-'])); // 2
 *
 * @example
 * // Using array paths (bypasses notation parsing)
 * const obj = { a: { b: { c: 'deep value' } } };
 *
 * console.log(findObjectValue(obj, ['a', 'b', 'c'])); // 'deep value'
 * console.log(findObjectValue(obj, ['a', 'b', 'c'], 'default')); // 'deep value'
 * console.log(findObjectValue(obj, ['a', 'x', 'y'], 'not found')); // 'not found'
 *
 * @example
 * // Safe access with non-existent paths and default values
 * const user = { name: 'John' };
 *
 * // Using default notation
 * console.log(findObjectValue(user, 'profile.email', 'no-email@example.com')); // 'no-email@example.com'
 * console.log(findObjectValue(user, 'settings.theme', 'light')); // 'light'
 *
 * // Using specific notation
 * console.log(findObjectValue(user, 'profile-email', 'no-email@example.com', '-')); // 'no-email@example.com'
 * console.log(findObjectValue(user, 'settings_theme', 'light', '_')); // 'light'
 *
 * @example
 * // Use case: Flexible API response handling
 * function extractUserData(apiResponse, pathNotation = '.') {
 *   return {
 *     id: findObjectValue(apiResponse, 'data.user.id', null, pathNotation),
 *     name: findObjectValue(apiResponse, 'data.user.profile.displayName', 'Anonymous', pathNotation),
 *     email: findObjectValue(apiResponse, 'data.user.contact.email', '', pathNotation),
 *     avatar: findObjectValue(apiResponse, 'data.user.avatar.large.url', '/default-avatar.png', pathNotation),
 *     preferences: {
 *       theme: findObjectValue(apiResponse, 'data.user.settings.theme', 'light', pathNotation),
 *       language: findObjectValue(apiResponse, 'data.user.settings.language', 'en', pathNotation),
 *       notifications: findObjectValue(apiResponse, 'data.user.settings.notifications.enabled', true, pathNotation)
 *     },
 *     metadata: {
 *       lastLogin: findObjectValue(apiResponse, 'data.user.metadata.lastLoginAt', null, pathNotation),
 *       isVerified: findObjectValue(apiResponse, 'data.user.verification.email.verified', false, pathNotation)
 *     }
 *   };
 * }
 *
 * // Usage with different API response formats
 * const dotNotationAPI = { data: { user: { id: 1, profile: { displayName: 'John' } } } };
 * const hyphenNotationAPI = { data: { user: { id: 1, profile: { displayName: 'John' } } } };
 *
 * const userData1 = extractUserData(dotNotationAPI, '.');
 * const userData2 = extractUserData(hyphenNotationAPI, '-');
 *
 * @example
 * // Use case: Multi-format configuration system
 * class ConfigManager {
 *   constructor(config, notation = ['.', '-', '_']) {
 *     this.config = config;
 *     this.notation = notation;
 *   }
 *
 *   get(path, defaultValue) {
 *     return findObjectValue(this.config, path, defaultValue, this.notation);
 *   }
 *
 *   // Support for different path formats
 *   getDotPath(path, defaultValue) {
 *     return findObjectValue(this.config, path, defaultValue, '.');
 *   }
 *
 *   getHyphenPath(path, defaultValue) {
 *     return findObjectValue(this.config, path, defaultValue, '-');
 *   }
 *
 *   getUnderscorePath(path, defaultValue) {
 *     return findObjectValue(this.config, path, defaultValue, '_');
 *   }
 *
 *   // Environment-specific getters
 *   getDatabaseConfig() {
 *     return {
 *       host: this.get('database.host', 'localhost'),
 *       port: this.get('database_port', 5432),
 *       ssl: this.get('database-ssl-enabled', false)
 *     };
 *   }
 * }
 *
 * const config = new ConfigManager({
 *   database: {
 *     host: 'prod-db.example.com',
 *     port: 5432,
 *     ssl: { enabled: true }
 *   },
 *   features: {
 *     auth: { enabled: true },
 *     cache: { redis: { url: 'redis://localhost' } }
 *   }
 * });
 *
 * // Different access patterns
 * console.log(config.get('database.host')); // 'prod-db.example.com'
 * console.log(config.get('database-ssl-enabled')); // true
 * console.log(config.get('features_auth_enabled')); // true
 *
 * @example
 * // Use case: Form data processing with flexible field naming
 * function processFormData(formData, fieldNotation = '.') {
 *   const extractField = (path, defaultVal = '') =>
 *     findObjectValue(formData, path, defaultVal, fieldNotation);
 *
 *   return {
 *     // Personal information
 *     personal: {
 *       firstName: extractField('fields.personal.firstName.value'),
 *       lastName: extractField('fields.personal.lastName.value'),
 *       email: extractField('fields.contact.email.value'),
 *       phone: extractField('fields.contact.phone.value')
 *     },
 *
 *     // Address information
 *     address: {
 *       street: extractField('fields.address.street.value'),
 *       city: extractField('fields.address.city.value'),
 *       state: extractField('fields.address.state.value'),
 *       country: extractField('fields.address.country.value', 'US')
 *     },
 *
 *     // Preferences
 *     preferences: {
 *       newsletter: extractField('fields.preferences.newsletter.checked', false),
 *       marketing: extractField('fields.preferences.marketing.checked', false),
 *       theme: extractField('fields.preferences.theme.value', 'light')
 *     },
 *
 *     // Validation info
 *     validation: {
 *       isValid: extractField('validation.isValid', false),
 *       errors: extractField('validation.errors', []),
 *       warnings: extractField('validation.warnings', [])
 *     },
 *
 *     // Metadata
 *     metadata: {
 *       submittedAt: extractField('metadata.timestamp', new Date().toISOString()),
 *       userAgent: extractField('metadata.userAgent', 'unknown'),
 *       sessionId: extractField('metadata.sessionId')
 *     }
 *   };
 * }
 *
 * // Process form with dot notation
 * const dotFormData = processFormData(formDataObject, '.');
 * // Process form with hyphen notation
 * const hyphenFormData = processFormData(formDataObject, '-');
 * // Process form with mixed notation
 * const mixedFormData = processFormData(formDataObject, ['.', '_']);
 *
 * @example
 * // Use case: Template rendering with customizable path syntax
 * function createTemplateRenderer(pathNotation = '.') {
 *   return function renderTemplate(template, data) {
 *     return template.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
 *       const value = findObjectValue(data, path.trim(), '', pathNotation);
 *       return String(value);
 *     });
 *   };
 * }
 *
 * // Create renderers for different notation styles
 * const dotRenderer = createTemplateRenderer('.');
 * const hyphenRenderer = createTemplateRenderer('-');
 * const underscoreRenderer = createTemplateRenderer('_');
 * const mixedRenderer = createTemplateRenderer(['.', '-', '_']);
 *
 * const templateData = {
 *   user: {
 *     name: 'John Doe',
 *     profile: { email: 'john@example.com' },
 *     preferences: { theme: 'dark' }
 *   },
 *   company: { name: 'Acme Corp' }
 * };
 *
 * // Different template syntaxes
 * const dotTemplate = 'Hello {{user.name}}, email: {{user.profile.email}}';
 * const hyphenTemplate = 'Hello {{user-name}}, email: {{user-profile-email}}';
 * const underscoreTemplate = 'Hello {{user_name}}, theme: {{user_preferences_theme}}';
 * const mixedTemplate = 'Hello {{user.name}}, company: {{company-name}}, theme: {{user_preferences_theme}}';
 *
 * console.log(dotRenderer(dotTemplate, templateData));
 * console.log(hyphenRenderer(hyphenTemplate, templateData));
 * console.log(underscoreRenderer(underscoreTemplate, templateData));
 * console.log(mixedRenderer(mixedTemplate, templateData));
 *
 * @example
 * // Use case: Data transformation pipeline with notation preferences
 * class DataTransformer {
 *   constructor(inputNotation = '.', outputNotation = '.') {
 *     this.inputNotation = inputNotation;
 *     this.outputNotation = outputNotation;
 *   }
 *
 *   transform(data, mappings) {
 *     const result = {};
 *
 *     Object.entries(mappings).forEach(([outputPath, inputPath]) => {
 *       const value = findObjectValue(data, inputPath, null, this.inputNotation);
 *       if (value !== null) {
 *         this.setNestedValue(result, outputPath, value);
 *       }
 *     });
 *
 *     return result;
 *   }
 *
 *   setNestedValue(obj, path, value) {
 *     const separators = Array.isArray(this.outputNotation) ? this.outputNotation : [this.outputNotation];
 *     const escapedSeparators = separators.map(sep => sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
 *     const regex = new RegExp(`[${escapedSeparators.join('')}]`);
 *     const pathArray = path.split(regex);
 *
 *     let current = obj;
 *     for (let i = 0; i < pathArray.length - 1; i++) {
 *       const key = pathArray[i];
 *       if (!(key in current)) {
 *         current[key] = {};
 *       }
 *       current = current[key];
 *     }
 *     current[pathArray[pathArray.length - 1]] = value;
 *   }
 * }
 *
 * // Transform data from API format to internal format
 * const transformer = new DataTransformer('_', '.');
 *
 * const apiData = {
 *   user_profile: {
 *     first_name: 'John',
 *     last_name: 'Doe',
 *     contact_info: {
 *       email_address: 'john@example.com',
 *       phone_number: '123-456-7890'
 *     }
 *   }
 * };
 *
 * const mappings = {
 *   'user.firstName': 'user_profile_first_name',
 *   'user.lastName': 'user_profile_last_name',
 *   'user.contact.email': 'user_profile_contact_info_email_address',
 *   'user.contact.phone': 'user_profile_contact_info_phone_number'
 * };
 *
 * const transformedData = transformer.transform(apiData, mappings);
 * // Result: {
 * //   user: {
 * //     firstName: 'John',
 * //     lastName: 'Doe',
 * //     contact: {
 * //       email: 'john@example.com',
 * //       phone: '123-456-7890'
 * //     }
 * //   }
 * // }
 *
 * @example
 * // Use case: Custom separator for special use cases
 * const specialData = {
 *   'level1': {
 *     'level2': {
 *       'data': 'found it!'
 *     }
 *   }
 * };
 *
 * // Using custom separators
 * console.log(findObjectValue(specialData, 'level1|level2|data', 'not found', '|')); // 'found it!'
 * console.log(findObjectValue(specialData, 'level1->level2->data', 'not found', '->')); // 'found it!'
 * console.log(findObjectValue(specialData, 'level1::level2::data', 'not found', '::')); // 'found it!'
 *
 * // Using multiple custom separators
 * const mixedData = { a: { b: { c: 'value' } } };
 * console.log(findObjectValue(mixedData, 'a|b->c', 'not found', ['|', '->'])); // 'value'
 *
 * @throws {TypeError} If the first argument (obj) is null or undefined
 * @see https://lodash.com/docs/4.17.15#get Deprecated Lodash get() - Similar functionality with different API
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce Array.reduce() - MDN
 *
 * @since 0.6.0
 */
export function findObjectValue(
	obj,
	path,
	defaultValue,
	notation = [ '.', '-', '_' ]
) {
	// If path is not defined or it has false value
	if ( ! path ) return undefined;

	// If path is already an array, use it directly
	if ( Array.isArray( path ) ) {
		const result = path.reduce(
			( prevObj, key ) => prevObj && prevObj[ key ],
			obj
		);
		return result === undefined ? defaultValue : result;
	}

	// Normalize notation to array
	const separators = Array.isArray( notation ) ? notation : [ notation ];

	// Create regex pattern to match separators (escape special regex characters)
	const escapedSeparators = separators.map( ( separator ) =>
		escapeRegex( separator )
	);
	const separatorPattern = escapedSeparators.join( '' );

	// Create regex to split on separators but not within brackets
	const regex = new RegExp( `([^[${ separatorPattern }\\]])+`, 'g' );
	const pathArray = path.match( regex ) || [];

	// Find value
	const result = pathArray.reduce(
		( prevObj, key ) => prevObj && prevObj[ key ],
		obj
	);

	// If found value is undefined return default value; otherwise return the value
	return result === undefined ? defaultValue : result;
}

/**
 * Retrieves or creates a global event map for a specific key. This function provides
 * a centralized way to manage event-related data structures across different parts
 * of an application by creating isolated Map instances stored in a global namespace.
 *
 * The function automatically converts the provided key to UpperCamelCase format and
 * ensures that the global StorePress namespace structure exists. Each unique key
 * gets its own Map instance that persists across function calls.
 *
 * @function getEventsMap
 * @param {string} key - The identifier for the event map. Will be converted to UpperCamelCase.
 *                      Examples: 'tooltip', 'modal', 'user-actions', 'cart_events'
 *
 * @returns {Map} A Map instance specific to the provided key. If the map doesn't exist,
 *               it will be created and stored globally for future access.
 *
 * @global
 * @namespace StorePress
 * @memberof StorePress
 * @property {Object} $eventsMap - Global container for all event maps
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map Map MDN Documentation
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window Window MDN Documentation
 *
 * @since 0.9.0
 *
 * @note This function creates global state. Use with caution in environments where
 *       global namespace pollution is a concern. Consider using module-scoped storage
 *       for applications that require better encapsulation.
 *
 * @note The UpperCamelCase conversion means that keys like 'tooltip', 'user-actions',
 *       and 'cart_events' become 'Tooltip', 'UserActions', and 'CartEvents' respectively
 *       in the global storage structure.
 */
export function getEventsMap( key ) {
	const name = toUpperCamelCase( key );

	// Ensure nested structure exists
	window.StorePress = window.StorePress || {};
	window.StorePress.$eventsMap = window.StorePress.$eventsMap || {};

	// Create Map if it doesn't exist
	if ( ! window.StorePress.$eventsMap[ name ] ) {
		window.StorePress.$eventsMap[ name ] = new Map();
	}

	return window.StorePress.$eventsMap[ name ];
}

/**
 * Creates a namespaced event manager for handling DOM events with automatic cleanup using AbortControllers.
 * This function provides a centralized way to manage event listeners across multiple elements with
 * namespace isolation and automatic memory management.
 *
 * @function createEventManager
 * @param {string} namespace - The namespace identifier for this event manager instance. Used to isolate events between different managers.
 * @param {Object} [options={}] - Configuration options for the event manager.
 * @param {string} [options.prefix='storepress'] - The prefix used in generated event names. If empty string, defaults to '$global'.
 * @param {string} [options.separator=':'] - The separator used between prefix, namespace, and event type in generated event names. If empty string, defaults to ':'.
 *
 * @returns {Object} An event manager object with methods for managing events.
 * @returns {Function} returns.add - Adds event listeners to elements.
 * @returns {Function} returns.trigger - Triggers events on elements.
 * @returns {Function} returns.remove - Removes specific event listeners from elements.
 * @returns {Function} returns.removeAll - Removes all event listeners for this namespace.
 * @returns {Function} returns.get - Gets information about events attached to specific elements.
 * @returns {Function} returns.getAll - Gets information about all events in this namespace.
 *
 * @example
 * // Basic usage with default options
 * const modalEvents = createEventManager('modal');
 *
 * @example
 * // Custom configuration
 * const tooltipEvents = createEventManager('tooltip', {
 *   prefix: 'myapp',
 *   separator: '-'
 * });
 *
 * @example
 * // Complete workflow example
 * const buttonEvents = createEventManager('buttons');
 *
 * // Add click handlers to multiple buttons
 * buttonEvents.add('.btn', 'click', (e) => {
 *   console.log('Button clicked:', e.target.textContent);
 * });
 *
 * // Add hover effect
 * buttonEvents.add('.btn', 'mouseenter', (e) => {
 *   e.target.classList.add('hover');
 * });
 *
 * buttonEvents.add('.btn', 'mouseleave', (e) => {
 *   e.target.classList.remove('hover');
 * });
 *
 * // Trigger events programmatically
 * buttonEvents.trigger('.primary-btn', 'click');
 *
 * // Remove specific event type
 * buttonEvents.remove('.btn', 'mouseenter');
 *
 * // Clean up all events when done
 * buttonEvents.removeAll();
 */
export function createEventManager(
	namespace,
	options = { prefix: 'storepress', separator: ':' }
) {
	const prefix = options.prefix.length > 0 ? options.prefix : '$global';
	const separator = options.separator.length > 0 ? options.separator : ':';
	const controllers = getEventsMap( prefix );

	const _add = ( $target, eventType, handler, eventOptions = {} ) => {
		const $element = getElement( $target );

		if ( ! controllers.has( namespace ) ) {
			controllers.set( namespace, new Map() );
		}

		if ( ! controllers.get( namespace ).has( $element ) ) {
			controllers.get( namespace ).set( $element, {} );
		}

		const events = controllers.get( namespace ).get( $element );

		const eventName = `${ prefix }${ separator }${ namespace }${ separator }${ eventType }`;

		events[ eventName ] = new AbortController();

		controllers.get( namespace ).set( $element, events );

		const controller = controllers.get( namespace ).get( $element )[
			eventName
		];

		const type = eventName.split( separator ).at( -1 );

		const getType = `on${ type }` in $element ? type : eventName;

		$element.addEventListener( getType, handler, {
			...eventOptions,
			signal: controller.signal,
		} );
	};

	/**
	 * Adds event listeners to one or more DOM elements.
	 * Creates namespaced event handlers that can be easily managed and removed later.
	 *
	 * @method add
	 * @memberof createEventManager
	 * @param {string|Element|NodeList|Array|Document} $targets - Target element(s) to add events to. Can be CSS selector, DOM element, NodeList, or array of elements.
	 * @param {string} eventType - The type of event to listen for (e.g., 'click', 'mouseenter', 'keydown').
	 * @param {Function} handler - The event handler function to execute when the event is triggered.
	 * @param {Object} [eventOptions={}] - Additional options to pass to addEventListener (e.g., { once: true, passive: true }).
	 *
	 * @example
	 * // Add click handler to a single element
	 * manager.add('#submit-btn', 'click', (e) => {
	 *   e.preventDefault();
	 *   console.log('Form submitted');
	 * });
	 *
	 * @example
	 * // Add event to multiple elements using selector
	 * manager.add('.toggle-btn', 'click', (e) => {
	 *   e.target.classList.toggle('active');
	 * });
	 *
	 * @example
	 * // Add event with options
	 * manager.add('.drag-item', 'touchstart', handleTouch, {
	 *   passive: false,
	 *   once: false
	 * });
	 *
	 * @example
	 * // Add to DOM element directly
	 * const button = document.querySelector('#my-button');
	 * manager.add(button, 'click', myHandler);
	 */
	const add = ( $targets, eventType, handler, eventOptions = {} ) => {
		const $elements = getElements( $targets );

		$elements.forEach( ( $element ) => {
			_add( $element, eventType, handler, eventOptions );
		} );
	};

	const _trigger = (
		$target,
		eventType,
		eventDetails = {},
		options = {}
	) => {
		const events = _getEvents( $target, eventType );
		const eventName = `${ prefix }${ separator }${ namespace }${ separator }${ eventType }`;

		for ( const [ event, isNative, type ] of events ) {
			const $element = getElement( $target );

			if ( isNative && eventName === event ) {
				$element.dispatchEvent(
					new Event( type, {
						bubbles: true,
						cancelable: true,
					} )
				);
			} else {
				triggerEvent( $element, event, eventDetails, options );
			}
		}
	};

	/**
	 * Triggers events on one or more DOM elements.
	 * Can trigger both native events and custom events with optional data.
	 *
	 * @method trigger
	 * @memberof createEventManager
	 * @param {string|Element|NodeList|Array|Document} $targets - Target element(s) to trigger events on.
	 * @param {string|null} [eventType=null] - The event type to trigger. If null, triggers all events for the element.
	 * @param {Object} [eventDetails={}] - Custom data to pass with the event (for custom events).
	 * @param {Object} [options={}] - Additional options for event dispatching.
	 *
	 * @example
	 * // Trigger specific event type
	 * manager.trigger('#my-button', 'click');
	 *
	 * @example
	 * // Trigger all events on element
	 * manager.trigger('#my-element', null);
	 *
	 * @example
	 * // Trigger with custom data
	 * manager.trigger('.notification', 'show', {
	 *   message: 'Hello World',
	 *   type: 'success'
	 * });
	 *
	 * @example
	 * // Trigger on multiple elements
	 * manager.trigger('.modal', 'close');
	 */
	const trigger = (
		$targets,
		eventType = null,
		eventDetails = {},
		options = {}
	) => {
		const $elements = getElements( $targets );

		if ( ! controllers.has( namespace ) ) {
			return;
		}

		$elements.forEach( ( $element ) => {
			_trigger( $element, eventType, eventDetails, options );
		} );
	};

	const _getEvents = ( $target, eventType ) => {
		if ( ! controllers.get( namespace ).has( $target ) ) {
			return [];
		}

		const events = controllers.get( namespace ).get( $target );
		const available = [];

		const eventName = `${ prefix }${ separator }${ namespace }${ separator }${ eventType }`;

		if ( eventType === null ) {
			for ( const [ type ] of Object.entries( events ) ) {
				const event = type.split( separator ).at( -1 );
				const isNative = `on${ event }` in $target;
				available.push( [ type, isNative, event ] );
			}

			return available;
		}

		for ( const [ type ] of Object.entries( events ) ) {
			if ( type === eventName || type.startsWith( eventName ) ) {
				const event = type.split( separator ).at( -1 );
				const isNative = `on${ event }` in $target;
				available.push( [ type, isNative, event ] );
			}
		}

		return available;
	};

	const _remove = ( $target, eventType ) => {
		const $element = getElement( $target );

		if ( typeof controllers.get( namespace ) === 'undefined' ) {
			throw new Error(
				`Namespace: "${ namespace }" is not available in "${ prefix }" event map.`
			);
		}

		if ( ! controllers.get( namespace ).has( $element ) ) {
			return;
		}

		const events = controllers.get( namespace ).get( $element );

		if ( eventType === null ) {
			for ( const [ _, controller ] of Object.entries( events ) ) {
				controller.abort();
			}

			controllers.get( namespace ).delete( $element );
			return;
		}

		const eventName = `${ prefix }${ separator }${ namespace }${ separator }${ eventType }`;
		for ( const [ type, controller ] of Object.entries( events ) ) {
			if ( type === eventName || type.startsWith( eventName ) ) {
				controller.abort();
				delete events[ type ];
			}
		}

		controllers.get( namespace ).set( $target, events );
	};

	/**
	 * Removes event listeners from one or more DOM elements.
	 * Uses AbortController to cleanly remove listeners without memory leaks.
	 *
	 * @method remove
	 * @memberof createEventManager
	 * @param {string|Element|NodeList|Array|Document} $targets - Target element(s) to remove events from.
	 * @param {string|null} [eventType=null] - The event type to remove. If null, removes all events from the element.
	 *
	 * @example
	 * // Remove specific event type
	 * manager.remove('#my-button', 'click');
	 *
	 * @example
	 * // Remove all events from element
	 * manager.remove('#my-element', null);
	 *
	 * @example
	 * // Remove events from multiple elements
	 * manager.remove('.temporary-listeners', 'mouseenter');
	 */
	const remove = ( $targets, eventType = null ) => {
		if ( ! controllers.has( namespace ) ) {
			return;
		}

		const $elements = getElements( $targets );

		$elements.forEach( ( $element ) => {
			_remove( $element, eventType );
		} );
	};

	/**
	 * Removes all event listeners for this namespace and cleans up the namespace entirely.
	 * This is useful for cleanup when a component or module is being destroyed.
	 *
	 * @method removeAll
	 * @memberof createEventManager
	 *
	 * @example
	 * // Clean up all events when component unmounts
	 * componentWillUnmount() {
	 *   this.eventManager.removeAll();
	 * }
	 *
	 * @example
	 * // Clean up modal events when modal is closed permanently
	 * function destroyModal() {
	 *   modalEvents.removeAll();
	 * }
	 */
	const removeAll = () => {
		if ( ! controllers.has( namespace ) ) {
			return;
		}

		const events = controllers.get( namespace );
		for ( const [ $target ] of [ ...events ] ) {
			_remove( $target, null );
		}

		controllers.delete( namespace );
	};

	const _get = ( $target ) => {
		const $element = getElement( $target );

		if ( typeof controllers.get( namespace ) === 'undefined' ) {
			throw new Error(
				`Namespace: "${ namespace }" is not available in "${ prefix }" event map.`
			);
		}

		if ( ! controllers.get( namespace ).has( $element ) ) {
			return [];
		}

		const events = controllers.get( namespace ).get( $element );

		const available = [];

		for ( const [ eventType ] of Object.entries( events ) ) {
			const last = eventType.split( separator ).at( -1 );
			const isNative = `on${ last }` in $element;
			available.push( {
				eventType,
				isNative,
				nativeType: isNative ? last : '',
			} );
		}

		return [ ...new Set( available ) ];
	};

	/**
	 * Gets information about events attached to specific elements.
	 * Returns an array of objects containing element and event information.
	 *
	 * @method get
	 * @memberof createEventManager
	 * @param {string|Element|NodeList|Array|Document} $targets - Target element(s) to get event information for.
	 * @returns {Array<Object>} Array of objects containing element and event data.
	 * @returns {Element} returns[].$element - The DOM element.
	 * @returns {Array<Object>} returns[].$events - Array of event information objects.
	 * @returns {string} returns[].$events[].eventType - The full namespaced event type.
	 * @returns {boolean} returns[].$events[].isNative - Whether this is a native DOM event.
	 * @returns {string} returns[].$events[].nativeType - The native event type if applicable.
	 *
	 * @example
	 * // Get events for specific elements
	 * const eventInfo = manager.get('.my-buttons');
	 * eventInfo.forEach(({$element, $events}) => {
	 *   console.log('Element:', $element);
	 *   console.log('Events:', $events);
	 * });
	 *
	 * @example
	 * // Check if element has specific events
	 * const info = manager.get('#my-element');
	 * const hasClickEvent = info[0].$events.some(e => e.nativeType === 'click');
	 */
	const get = ( $targets ) => {
		if ( ! controllers.has( namespace ) ) {
			return [];
		}

		const $elements = getElements( $targets );

		const available = [];
		$elements.forEach( ( $element ) => {
			available.push( {
				$element,
				$events: _get( $element ),
			} );
		} );

		return available;
	};

	/**
	 * Gets information about all events in this namespace across all elements.
	 * Useful for debugging or monitoring the current state of event listeners.
	 *
	 * @method getAll
	 * @memberof createEventManager
	 * @returns {Array<Object>} Array of objects containing all elements and their events in this namespace.
	 * @returns {Element} returns[].$element - The DOM element.
	 * @returns {Array<Object>} returns[].$events - Array of event information objects for this element.
	 *
	 * @example
	 * // Debug all events in namespace
	 * const allEvents = manager.getAll();
	 * console.log(`Total elements with events: ${allEvents.length}`);
	 * allEvents.forEach(({$element, $events}) => {
	 *   console.log(`Element ${$element.tagName} has ${$events.length} events`);
	 * });
	 *
	 * @example
	 * // Audit event usage
	 * function auditEvents() {
	 *   const events = manager.getAll();
	 *   const totalEvents = events.reduce((sum, {$events}) => sum + $events.length, 0);
	 *   console.log(`Total active events: ${totalEvents}`);
	 * }
	 */
	const getAll = () => {
		if ( ! controllers.has( namespace ) ) {
			return [];
		}

		const events = controllers.get( namespace );
		const available = [];
		for ( const [ $element ] of [ ...events ] ) {
			available.push( {
				$element,
				$events: _get( $element ),
			} );
		}

		return available;
	};

	return {
		add,
		trigger,
		remove,
		removeAll,
		get,
		getAll,
	};
}

/**
 * Creates a centralized plugin management system for StorePress with event-driven lifecycle management.
 *
 * This factory function creates a comprehensive plugin controller that handles initialization, destruction,
 * reloading, and cleanup of plugin instances across DOM elements. It provides a standardized event-driven
 * architecture for managing complex plugins with automatic memory management via WeakMap storage and
 * AbortController for cleanup.
 *
 * @param {Object} config - Configuration object for the plugin system
 * @param {string|HTMLElement|NodeList|HTMLElement[]} config.selector - Default selector for plugin elements
 * @param {Object} [config.options={}] - Default options to pass to plugin instances
 * @param {Function} config.plugin - Plugin constructor function or class
 * @param {string} config.namespace - Unique namespace identifier for the plugin system
 * @returns {Object} Plugin management object with lifecycle methods and event handling
 *
 * @example
 *
 * // Modal Plugin - Modal dialogs with backdrop and keyboard support
 * // File: Plugin.js
 *
 * function Modal(element) {
 *   const removeStyles = () => {
 *     this.$element.style.display = ''
 *   }
 *
 *   const removeClasses = () => {
 *     this.$element.classList.remove('show')
 *   }
 *
 *   const removeEvents = () => {
 *     this.controller.abort()
 *   }
 *
 *   const removeDOMElements = () => {
 *     if (this.backdrop && this.backdrop.parentNode) {
 *       this.backdrop.parentNode.removeChild(this.backdrop)
 *       this.backdrop = null
 *     }
 *   }
 *
 *   const createBackdrop = () => {
 *     this.backdrop = document.createElement('div')
 *     this.backdrop.className = 'modal-backdrop'
 *     this.backdrop.addEventListener('click', () => close(), {
 *       signal: this.signal,
 *       passive: true
 *     })
 *     document.body.appendChild(this.backdrop)
 *   }
 *
 *   const open = () => {
 *     this.isOpen = true
 *     this.$element.style.display = 'block'
 *     this.$element.classList.add('show')
 *
 *     if (this.options.backdrop) {
 *       createBackdrop()
 *     }
 *
 *     triggerEvent(this.$element, 'modal:opened', { modal: this })
 *   }
 *
 *   const close = () => {
 *     this.isOpen = false
 *     this.$element.style.display = 'none'
 *     this.$element.classList.remove('show')
 *
 *     if (this.backdrop) {
 *       this.backdrop.remove()
 *       this.backdrop = null
 *     }
 *
 *     triggerEvent(this.$element, 'modal:closed', { modal: this })
 *   }
 *
 *   const toggle = () => {
 *     this.isOpen ? close() : open()
 *   }
 *
 *
 *   // Resets the plugin to its initial state
 *
 *   const reset = () => {
 *     removeStyles()
 *     removeClasses()
 *     removeDOMElements()
 *     removeEvents()
 *
 *     this.isOpen = false
 *     console.log(`Modal ${this.$element.id} reset`)
 *   }
 *
 *
 *   // Creates and returns the public API object for the plugin instance
 *
 *   const expose = () => ({
 *     reset,
 *     open,
 *     close,
 *     toggle
 *   })
 *
 *   // Sets up the initial state and attaches event listeners
 *
 *   const initial = () => {
 *     const trigger = document.querySelector(`[data-toggle="${this.$element.id}"]`)
 *     if (trigger) {
 *       trigger.addEventListener('click', () => open(), {
 *         signal: this.signal,
 *         passive: true
 *       })
 *     }
 *
 *     if (this.options.keyboard) {
 *       document.addEventListener('keydown', (e) => {
 *         if (e.key === 'Escape' && this.isOpen) close()
 *       }, { signal: this.signal })
 *     }
 *
 *     console.log(`Modal initialized on ${this.$element.id}`)
 *   }
 *
 *  // Main initialization function
 *
 *   const init = () => {
 *     this.$element = element
 *     this.controller = new AbortController()
 *     this.signal = this.controller.signal
 *
 *     this.options = {
 *       backdrop: true,
 *       keyboard: true,
 *       ...getOptionsFromAttribute(element, 'modal')
 *     }
 *
 *     this.isOpen = false
 *     this.backdrop = null
 *
 *     initial()
 *     return expose()
 *   }
 *
 *   return init()
 * }
 *
 * export { Plugin }
 *
 * // Create the modal plugin system
 * // File: index.js
 * import { createStorePressPlugin } from '@storepress/utils';
 * import { Plugin } from 'plugin'
 * const StorePressModal = createStorePressPlugin({
 *   selector: '.modal',
 *   options: { backdrop: true, keyboard: true },
 *   plugin: Modal,
 *   namespace: 'modal'
 * });
 *
 * // Setup the event listeners
 * StorePressModal.setup()
 *
 * export default StorePressModal
 *
 * // Initialize all modals
 * // File: scripts.js
 * // import { StorePressModal } from 'modal'
 * document.addEventListener('DOMContentLoaded', ()=>{
 *   StorePressModal.init();
 * })
 *
 */
export function createStorePressPlugin( {
	selector,
	options = {},
	plugin,
	namespace,
} ) {
	const name = toSnakeCase( namespace );
	const pluginEvents = createEventManager( name );
	const initEventType = `init`;
	const destroyEventType = `destroy`;
	const reloadEventType = `reload`;

	return {
		get instance() {
			return {
				set( $element, settings ) {
					return createPluginInstance( $element, settings, plugin );
				},

				get( $element ) {
					return getPluginInstance( $element );
				},

				init( $element, settings ) {
					const instance = this.set( $element, settings );

					if ( ! instance || instance.length === 0 ) {
						return;
					}

					for ( const { element, reset } of instance ) {
						if ( element && typeof reset === 'function' ) {
							element.removeEventListener( 'destroy', reset, {
								passive: true,
								once: true,
							} );
							element.addEventListener( 'destroy', reset, {
								passive: true,
								once: true,
							} );
						}
					}
				},

				destroy( $element ) {
					const instance = this.get( $element );
					if ( ! instance || instance.length === 0 ) {
						return;
					}
					for ( const { destroy } of instance ) {
						if ( typeof destroy === 'function' ) {
							destroy();
						}
					}
				},

				reload( $element, settings ) {
					this.destroy( $element );
					this.init( $element, settings );
				},
			};
		},

		setup() {
			const handleInit = ( event ) => {
				const defaultSettings = {};
				const settings = {
					...defaultSettings,
					...event.detail?.settings,
				};
				const element = event.detail?.element;

				if ( Array.isArray( element ) ) {
					for ( const el of element ) {
						this.instance.init( el, settings );
					}
				} else {
					this.instance.init( element, settings );
				}
			};

			const handleDestroy = ( event ) => {
				const element = event.detail?.element;

				if ( Array.isArray( element ) ) {
					for ( const el of element ) {
						this.instance.destroy( el );
					}
				} else {
					this.instance.destroy( element );
				}
			};

			const handleReload = ( event ) => {
				const defaultSettings = {};
				const settings = {
					...defaultSettings,
					...event.detail?.settings,
				};
				const element = event.detail?.element;

				if ( Array.isArray( element ) ) {
					for ( const el of element ) {
						this.instance.reload( el, settings );
					}
				} else {
					this.instance.reload( element, settings );
				}
			};

			const options = {
				passive: true,
			};

			// Init.
			pluginEvents.add( document, initEventType, handleInit, options );

			// Destroy.
			pluginEvents.add(
				document,
				destroyEventType,
				handleDestroy,
				options
			);

			// Reload.
			pluginEvents.add(
				document,
				reloadEventType,
				handleReload,
				options
			);
		},

		clear( $selector = selector ) {
			this.destroy( $selector );
			pluginEvents.removeAll();
		},

		init( $selector = selector, settings = options ) {
			pluginEvents.trigger( document, initEventType, {
				element: $selector,
				settings,
			} );
		},

		destroy( $selector = selector ) {
			pluginEvents.trigger( document, destroyEventType, {
				element: $selector,
			} );
		},

		reload( $selector = selector, settings = options ) {
			pluginEvents.trigger( document, reloadEventType, {
				element: $selector,
				settings,
			} );
		},
	};
}

/**
 *  Creates a promise that resolves after a specified delay with optional data.
 *  Useful for adding delays in async/await code, testing timeouts, or creating
 *  artificial delays in processing without blocking the UI thread.
 *
 * @param {number} milliseconds - The number of milliseconds to wait before resolving
 * @param {*} [data={}] - Optional data to resolve with after the delay
 * @returns {Promise<*>} A promise that resolves after the specified duration
 *
 * @example
 * // Basic usage - wait 1 second
 * await waitAsync(1000);
 * console.log('1 second has passed');
 *
 * @example
 * // Wait with data
 * const result = await waitAsync(500, { message: 'Hello World' });
 * console.log(result); // { message: 'Hello World' }
 *
 * @example
 * // Wait with primitive data
 * const number = await waitAsync(1500, 42);
 * console.log(number); // 42
 *
 * @example
 * // Use in a loop with delay
 * for (let i = 0; i < 3; i++) {
 *   console.log(`Step ${i + 1}`);
 *   await waitAsync(1000, `Completed step ${i + 1}`);
 * }
 *
 * @example
 * // Simulate API delay in testing
 * async function mockApiCall() {
 *   await waitAsync(2000); // Simulate 2-second API response time
 *   return { status: 'success', data: 'API response' };
 * }
 *
 * @example
 * // Chain with other async operations
 * const processWithDelay = async (data) => {
 *   console.log('Processing started...');
 *   const processed = await waitAsync(1000, data.toUpperCase());
 *   console.log('Processing completed');
 *   return processed;
 * };
 *
 * const result = await processWithDelay('hello');
 * console.log(result); // 'HELLO'
 */
export function testWaitAsync( milliseconds, data = {} ) {
	return new Promise( ( resolve ) =>
		setTimeout( () => resolve( data ), milliseconds )
	);
}

/**
 * Synchronously waits for the specified duration, blocking the UI thread.
 * This function uses a busy-wait loop that will block the current thread and consume CPU cycles.
 * WARNING: This will freeze the UI during execution.
 *
 * @param {number} milliseconds - The number of milliseconds to block execution.
 * @param {*} [data={}] - Optional data to return after the delay.
 * @returns {*} The provided data after the synchronous delay
 *
 * @example
 * // Basic usage - block for 1 second (⚠️ blocks everything!)
 * console.log('Before wait');
 * waitSync(1000);
 * console.log('After wait - 1 second later');
 *
 * @example
 * // Return data after blocking
 * const result = waitSync(500, { message: 'Delayed data' });
 * console.log(result); // { message: 'Delayed data' }
 *
 * @example
 * // Use with primitive data
 * const number = waitSync(300, 42);
 * console.log(number); // 42
 *
 * @example
 * // Timing critical operations (rare use case)
 * function preciseTiming() {
 *   const start = performance.now();
 *   waitSync(100); // Precise 100ms delay
 *   const end = performance.now();
 *   console.log(`Actual delay: ${end - start}ms`);
 * }
 *
 * @example
 * // Testing synchronous behavior (not recommended for production)
 * function testSyncBehavior() {
 *   console.log('Step 1');
 *   waitSync(1000, 'step1-complete');
 *   console.log('Step 2'); // This won't execute until after the full delay
 *   return 'all-complete';
 * }
 *
 * @example
 * // CPU-intensive alternative that shows the blocking nature
 * console.log('UI will freeze during this:');
 * waitSync(3000); // ⚠️ Browser UI will be completely unresponsive
 * console.log('UI unfrozen now');
 *
 */
export function testWaitSync( milliseconds, data = {} ) {
	const start = Date.now();
	while ( Date.now() - start < milliseconds ) {}
	return data;
}
