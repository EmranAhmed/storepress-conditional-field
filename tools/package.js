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

const packageName = getPackageProp( 'name' );
const packageVersion = getPackageProp( 'version' );

stdout.write( `Creating package for \`${ packageName }\` plugin... 🎁\n\n` );
const zip = new AdmZip();
const isZip = hasArgInCLI( '--zip' );

let files = [];

if ( hasPackageProp( 'files' ) ) {
	stdout.write(
		'Using the `files` field from `package.json` to detect files:\n\n'
	);

	files = glob( getPackageProp( 'files' ), {
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
				? join( packageName, zipDirectory )
				: packageName;
		zip.addLocalFile( file, targetDir );
	} );

	zip.writeZip( `./${ packageName }-v${ packageVersion }.zip` );
	stdout.write(
		`\nDone. \`${ packageName }-v${ packageVersion }.zip\` is ready! 🎉\n`
	);
} else {
	fs.remove( packageName ).then( () => {
		fs.ensureDir( packageName, () => {
			stdout.write(
				`Creating directory for \`${ packageName }\` plugin... 🎁\n\n`
			);

			files.forEach( ( file ) => {
				const to = `${ packageName }/${ file }`;
				stdout.write( `  🥳 Adding \`${ file }\`.\n` );
				fs.copy( file, to );
			} );

			stdout.write(
				`\n\nDone. \`${ packageName }\` directory is ready! 🎉\n`
			);
		} );
	} );
}
