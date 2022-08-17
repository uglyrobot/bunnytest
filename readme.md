# Bunnytest Gutenberg Block

Contributors:      The WordPress Contributors
Tags:              block
Tested up to:      6.0
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A Gutenberg block to demonstrate the uploading, encoding, and embedding of video files using the Bunny.net API.

## Description

Using the [Bunny.net API](https://bunny.net/api) and the [Gutenberg](https://wordpress.org/gutenberg/) editor.

Built using the [Create Block Template](https://developer.wordpress.org/block-editor/getting-started/create-block/). Read for instructions on how to use the block.

## Installation

This section describes how to install the plugin and dev environment.

1. Checkout this repo to the `/wp-content/plugins/bunnytest` directory in your local WordPress development install.
1. Add `define( 'BUNNY_API_KEY', 'xxxxxxxxx' );` to your wp-config.php file with the Bunny.net Video library API key.
1. Run `npm install` in the root directory.
1. Use `npm run start` for creating a “development” build, this does not compress the code so it is easier to read using browser tools, plus source maps that make debugging easier. Additionally, development build will start a watch process that waits and watches for changes to the file and will rebuild each time it is saved; so you don’t have to run the command for each change.
1. Activate the plugin through the 'Plugins' screen in WordPress
