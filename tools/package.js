#!/usr/bin/env node
'use strict';
/**
 * External dependencies
 */
const AdmZip = require( 'adm-zip' );
const { sync: glob } = require( 'fast-glob' );
const { dirname, join } = require( 'path' );
const { stdout } = require( 'process' );
const fs = require( 'fs-extra' );

/**
 * WordPress dependencies
 */
const {
	hasPackageProp,
	getPackageProp,
	hasArgInCLI,
} = require( '@wordpress/scripts/utils' );

const packageName =  getPackageProp( 'name' );
const packageSlug =  packageName.replace(/^@/, '').replace('/', '-');
const packageVersion = getPackageProp( 'version' );

stdout.write( `Creating package for \`${ packageName }\` plugin... 🎁\n\n` );
const zip = new AdmZip();
const isZip = hasArgInCLI( '--zip' );

let files = [];

const hasFiles = hasPackageProp( 'zip' ) || hasPackageProp( 'files' );
const availableFiles = hasPackageProp( 'zip' ) ? getPackageProp( 'zip' ) : getPackageProp( 'files' )

if ( hasFiles ) {
	stdout.write(
		'Using the `files` field from `package.json` to detect files:\n\n'
	);

	files = glob( availableFiles, {
		caseSensitiveMatch: false,
	} );
} else {
	stdout.write(
		'Using Plugin Handbook best practices to discover files:\n\n'
	);
	// See https://developer.wordpress.org/plugins/plugin-basics/best-practices/#file-organization.
	files = glob(
		[
			'build/**',
			'includes/**',
			'languages/**',
			'templates/**',
			`${ packageName }.php`,
			'uninstall.php',
			'block.json',
			'changelog.*',
			'license.*',
			'readme.*',
		],
		{
			caseSensitiveMatch: false,
		}
	);
}

if ( isZip ) {
	stdout.write(
		`Creating archive for \`${ packageName }\` plugin... 🎁\n\n`
	);
	files.forEach( ( file ) => {
		stdout.write( `  🥳 Adding \`${ file }\`.\n` );
		const zipDirectory = dirname( file );
		// Prefix every entry with the slug folder
		const targetDir =
			zipDirectory !== '.'
				? join( packageSlug, zipDirectory )
				: packageSlug;
		zip.addLocalFile( file, targetDir );
	} );

	zip.writeZip( `./${ packageSlug }-v${ packageVersion }.zip` );
	stdout.write(
		`\nDone. \`${ packageSlug }-v${ packageVersion }.zip\` is ready! 🎉\n`
	);
} else {
	fs.remove( packageSlug ).then( () => {
		fs.ensureDir( packageSlug, () => {
			stdout.write(
				`Creating directory for \`${ packageName }\` plugin... 🎁\n\n`
			);

			files.forEach( ( file ) => {
				const to = `${ packageSlug }/${ file }`;
				stdout.write( `  🥳 Adding \`${ file }\`.\n` );
				fs.copy( file, to );
			} );

			stdout.write(
				`\n\nDone. \`${ packageSlug }\` directory is ready! 🎉\n`
			);
		} );
	} );
}
