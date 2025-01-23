# Conditional Field Display

A StorePress Plugin

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

- `npm run plugin-zip` - make zip based on `package.json` `files` list.
- `npm run package` - make directory based on `package.json` `files` list.
