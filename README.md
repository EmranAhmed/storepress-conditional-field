# Conditional Field Display

## Usages

- `npm i @storepress/conditional-field @storepress/utils --save`
- Load `./build/style-conditional-field.css`
- Load `./build/storepress-utils.js`
- Load `./build/conditional-field.js`

### Markup

```html
<li class="input-group">
  <label for="InputText">Input Field:</label>
  <input type="text" class="form-control input-name" value="" id="InputText" placeholder="Input Field">
</li>

<li inert data-storepress-conditional-field='{"selector":"#InputText"}'>
  <p class="message">
        This field will show if "Input Field" have some value.
  </p>
</li>

<li inert data-storepress-conditional-field='{"selector":"#InputText", "value":false}'>
  <p class="message hide">
    This field will hide if "Input Field" have some value.
  </p>
</li>
```

### HTML Attribute

```markdown
- {"selector":"#InputName"} // Show if: value is not empty
- {"selector":"#InputName", "value": true} // Show if: value is not empty
- {"selector":"#InputName", "value": false} // Show if: value is empty
- {"selector":"#InputName", "value": "hello"} // Show if: value is "hello"
- {"selector":"#InputName", "value": ["yes", "no"]} // Show if: value is "yes" or "no"
- {"selector":"#InputName", "value": 5} // Show if: value length is more or equal to 5
- {"selector":"#InputName","value":[10, 20]} // Show if: value length between 10 to 20
- {"selector":"#InputText", "value":"#InputText2", "type": "ELEMENT"} // Match both element have same equal value
- [{"selector":"#InputText"}, {"selector":"#InputText2"}] // Match both element have some value
- data-storepress-conditional-field--relation="OR" // Use to compare with OR default is AND
```

## Integration

```js
/**
 * External dependencies
 */
import StorePressConditionalFieldPlugin from '@storepress/conditional-field';
import domReady from '@wordpress/dom-ready';
import { triggerEvent } from '@storepress/utils';

domReady(function () {
  StorePressConditionalFieldPlugin();
  triggerEvent(document, 'storepress_conditional_field_init', {
    element: ['[data-storepress-conditional-field]'],
    settings: {},
  });
});
```

```scss

@charset "UTF-8";

@use "~@storepress/conditional-field/src/mixins" as conditional-field;

:where(
[data-storepress-conditional-field],
[data-storepress-conditional-field--selector],
[data-storepress-conditional-field--value],
[data-storepress-conditional-field--type],
[data-storepress-conditional-field--relation],
[data-storepress-conditional-field--compare]
) {
  @include conditional-field.init();
}
```

## Development

- `npm i`
- `npm run packages-update` - Update WordPress packages

## Develop

- `npm start`

## Lint

- `npm run lint:js` - Lint Javascript
- `npm run lint:js:report` - Lint Javascript and will generate `lint-report.html`. From terminal `open lint-report.html`
- `npm run lint:css` - Lint CSS
- `npm run lint:css:report` - Lint CSS and will generate `scss-report.txt` file.

## Fix

- `npm run lint:js:fix` - Fix Javascript Lint Issue.
- `npm run lint:css:fix` - Fix SCSS Lint Issue.

## Format

- `npm run format:js` - Format Javascript
- `npm run format:css` - Format SCSS
- `npm run format` - Format `./src`

## Release

- `npm publish`
