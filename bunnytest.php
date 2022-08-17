<?php
/**
 * Plugin Name:       Bunnytest
 * Description:       A Gutenberg block to demonstrate the uploading, encoding, and embedding of video files using the Bunny.net API.
 * Version:           0.1.0
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Author:            UglyRobot
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bunnytest
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_bunnytest_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_bunnytest_block_init' );

/**
 * Enqueue the block's assets for the editor.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function bunny_script_enqueue() {
	$data = array(
		'libraryId' => '26801',
		'apiKey' => BUNNY_API_KEY
	);
	wp_register_script( 'bunnytest-dummy-js-header', '');
	wp_enqueue_script( 'bunnytest-dummy-js-header' );
	wp_add_inline_script( 'bunnytest-dummy-js-header', 'const BUNNYTEST = ' . json_encode( $data ) . ';' );

}
add_action( 'enqueue_block_editor_assets', 'bunny_script_enqueue' );
