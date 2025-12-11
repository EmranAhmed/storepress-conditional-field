# Conditional Field Display

Conditional Fields is a lightweight, dependency-free JavaScript utility for showing or hiding DOM elements based on the state of other form inputs. It's configured declaratively using a `data-*` attribute in your HTML, allowing for complex conditional logic without writing custom JavaScript for every scenario.

The script works by making the controlled element inert (disabling it and hiding it from assistive technology) when its conditions are not met. You must provide your own CSS to visually hide the element based on the `[inert]` attribute.


## Configuration API

| Key	| Type	| Required?	| Description                                                                                                                                                                                                                  |
|---|---|---|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|selector|	String |	Yes | 	A CSS selector for the input field(s) that control this element.                                                                                                                                                            |
|relation	| String |	No	| How to evaluate multiple conditions. Defaults to `AND`. Options: `AND`, `OR`                                                                                                                                                 |
|value	| Any	| No	| The value to compare against. Defaults to `true` (checking for existence).                                                                                                                                                   |
|type	| String |	No	| The type of comparison to perform. The script auto-detects based on the value, but you can set it explicitly. Options: BOOLEAN, STRING, NUMBER, STRING-ARRAY, NUMBER-ARRAY, REGEXP, MINMAX, RANGE,ELEMENT.                   |
|compare|	String |	No	| For type: "NUMBER". The comparison operator. Defaults to `EQ`. Options: `EQ`, `GT`, `GTEQ`, `LT`, `LTEQ`.  For type: "STRING" or "STRING-ARRAY" Options: `LIKE`.                                                             |
|inert	| Boolean |	No	| Inverts the behavior. If `true`, the element will be shown by default and hidden when the condition is met. Defaults to `false`.                                                                                             |
|case	| Boolean	| No	| For type: "STRING" or STRING-ARRAY". If true, the string comparison will be case-sensitive. Defaults to `false`.                                                                                                             |
|strict|	Boolean	| No	| For array types like multiple selectbox or checkboxes. If `true`, the input's values must be an exact match to the value array. Defaults to `false`.                                                                         |
|require|	Boolean	| No	| For array types like multiple selectbox or checkboxes and when **strict** is `false`. If `true`, all items in the value array must be present in the input's selected values. Defaults to `false` (any match is sufficient). |
|check	| String	| No	| Only For type: "ELEMENT". Specifies the comparison type to use against the target element's value. Defaults to `STRING`.                                                                                                       |

## Examples

- Simple Text Input Match 
This shows a field when the user types the exact word `CONFIRM`.

```html
<label for="ex1">Type CONFIRM to proceed:</label>
<input type="text" id="ex1" />

<div data-storepress-conditional-field='{"selector": "#ex1", "value": "CONFIRM", "case": true}'>
  ✅ Confirmation successful.
</div>
```

- Checkbox Group Requirement
This shows a field only if both "Terms and Conditions" and "Privacy Policy" are checked.

```html
<label><input type="checkbox" name="agreement" value="terms" /> I agree to the Terms</label>
<label><input type="checkbox" name="agreement" value="privacy" /> I agree to the Privacy Policy</label>

<div data-storepress-conditional-field='{
    "selector": "[name=agreement]",
    "value": ["terms", "privacy"],
    "require": true
}'>
  ✅ Thank you for agreeing to all terms.
</div>
```

- `MINMAX` vs. `RANGE`

`MINMAX` checks the length or item count. This example shows a field if the comment is between 10 and 50 characters long.

```html
<label for="ex3-minmax">Comment (10-50 chars):</label>
<textarea id="ex3-minmax"></textarea>

<div data-storepress-conditional-field='{"selector": "#ex3-minmax", "value": [10, 50], "type": "MINMAX"}'>
  Comment length is valid.
</div>
```

`RANGE` checks the actual numeric value. This example shows a field if the entered age is between 18 and 65. 
Note: `RANGE` only support `NUMBER` and `RANGE` Input type.

```html
<label for="ex3-range">Age:</label>
<input type="number" id="ex3-range" />

<div data-storepress-conditional-field='{"selector": "#ex3-range", "value": [18, 65], "type": "RANGE"}'>
  Age is within the required range.
</div>
```

- Radio Check
This shows a field if the user selects "Email" OR "Phone" as their preferred contact method.

```html
<p>Preferred Contact Method:</p>
<label><input type="radio" name="contact" value="email" /> Email</label>
<label><input type="radio" name="contact" value="phone" /> Phone</label>
<label><input type="radio" name="contact" value="mail" /> Postal Mail</label>

<div data-storepress-conditional-field='{
    "selector": "[name=contact]",
    "value": ["email", "phone"]
}'>
  We will contact you via Email or Phone.
</div>
```

- `ELEMENT` Dependency

This shows a "Submit" button only when the password and confirmation password fields match

```html
<label for="ex5-pass">Password:</label>
<input type="password" id="ex5-pass" />

<label for="ex5-confirm">Confirm Password:</label>
<input type="password" id="ex5-confirm" />

<div data-storepress-conditional-field='{
    "selector": "#ex5-pass",
    "value": "#ex5-confirm",
    "type": "ELEMENT"
}'>
  <button type="submit">Submit</button>
</div>
```

- Relation Check

```html
<div class="test-case">
    <h4>Complex AND/OR</h4>
    <label for="complex-1">Type "start":</label>
    <input type="text" id="complex-1" />
  
    <label for="complex-2">Check A or B:</label>
    <label><input type="checkbox" name="complex-cb" value="A"> A</label>
    <label><input type="checkbox" name="complex-cb" value="B"> B</label>
  
    <div class="conditional-field" data-storepress-conditional-field='{
            "relation": "AND",
            "0": {"selector": "#complex-1", "value": "start"},
            "1": {"selector": "[name=complex-cb]", "value": ["A", "B"]}
        }'>✅ Visible! Text is "start" AND (A or B is checked).
    </div>
</div>
```

Alternate way to add `relation` from `data-*`

```html
<div class="conditional-field" data-storepress-conditional-field--relation="OR" data-storepress-conditional-field='[
        {"selector": "#complex-1", "value": "start"},
        {"selector": "[name=complex-cb]", "value": ["A", "B"]}
    ]'>✅ Visible! Text is "start" AND (A or B is checked).
</div>
```


## Usages

- `npm i @storepress/conditional-field @storepress/utils --save`

- Load `./build/storepress-utils.js`
- Load `./build/conditional-field.js`
- Load `./build/style-conditional-field.css`

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
- "strict" and "require" are use for checkbox and multi select box.
- if "strict" true, "require" will always be false.
- "case" true to check case sensitivity.
- `"compare":"LIKE"` to check string in string with case in sensitive.
- `"compare":">"` `"compare":"<"` `"compare":">="` `"compare":"<="` to check number range.
- `"value": [4, 6], "type":"MINMAX"` to check min value and max value.
- `"value": [4, 6], "type":"RANGE"` to check range in between value.
- `"value": "#InputElement1", "type":"ELEMENT"` to compare value in other element.
- `"value": "/^[\w.-]+@[\w.-]+\.\w+$/g", "type":"REGEXP"` to check regular expression.
  
- {"selector":"#InputName"} // Show if: value is not empty
- {"selector":"#InputName", "value": true} // Show if: value is not empty
- {"selector":"#InputName", "value": false} // Show if: value is empty
- {"selector":"#InputName", "value": "hello"} // Show if: value is "hello"
- {"selector":"#InputName", "value": "hello", "strict": true}
- {"selector":"#InputName", "value": ["yes", "no"]} // Show if: value is "yes" or "no"
- {"selector":"#InputName", "value": 5} // Show if: value length is more or equal to 5
- {"selector":"#InputName","value":[10, 20]} // Show if: value length between 10 and 20
- {"selector":"#InputText", "value":"#InputText2", "type": "ELEMENT"} // Match both element have same equal value
- [{"selector":"#InputText"}, {"selector":"#InputText2"}] // Match both element have some value
- data-storepress-conditional-field--relation="OR" // Use to compare with OR default is AND
```

## Integration

```js 
/**
 * External dependencies
 * dependency.js
 */
import StorePressConditionalField from '@storepress/conditional-field';
import domReady from '@wordpress/dom-ready';

// document.addEventListener('DOMContentLoaded', () => {
domReady( () => {
  StorePressConditionalField();
});
```

```scss
@charset "UTF-8";

@use "~@storepress/conditional-field/src/mixins" as plugin;

:where(
[data-storepress-conditional-field],
[data-storepress-conditional-field--selector],
[data-storepress-conditional-field--value],
[data-storepress-conditional-field--type],
[data-storepress-conditional-field--relation],
[data-storepress-conditional-field--compare]
) {
  @include plugin.init();
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

## Control from external script

```js
/**
 * External dependencies
 */
import { getStorePressPlugin } from '@storepress/utils'

// getStorePressPlugin is also available globally by: StorePress.Utils.getStorePressPlugin

document.getElementById('custom-button').addEventListener('click', () => {
  const Plugin = getStorePressPlugin('conditional')
  Plugin.destroy()
  Plugin.init()

  Plugin.setup()
  Plugin.clear()
})


const $plugin1 = StorePress.Utils.getPluginInstance('li.item', 'conditional')
const $plugin2 = StorePress.Utils.getStorePressPlugin('conditional').get('ul')
const $plugin3 = StorePress.Utils.getStorePressPlugin('conditional').get()
```

## Publish

- Add Tag - `git tag $(node -p "require('./package.json').version") && git push origin "$_"`
- Delete Tag - `git tag -d $(node -p "require('./package.json').version") && git push origin --delete "$_"`
- Publish - `npm publish`
