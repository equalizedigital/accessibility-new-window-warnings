<?php // phpcs:ignore WordPress.Files.FileName.NotHyphenatedLowercase // phpcs:ignore WordPress.Files.FileName.InvalidClassFileName
/**
 * Class file for the Accessibility New Window Warnings plugin.
 *
 * @package ANWW
 */

namespace EqualizeDigital\ANWW\Inc;

use EqualizeDigital\ANWW\Admin\Admin;

/**
 * AccessibilityNewWindowWarnings Class
 *
 * This class sets up actions for enqueuing styles and scripts
 * for making links that open in a new window accessible by adding a warning.
 */
class AccessibilityNewWindowWarnings {

	/**
	 * ANWW constructor.
	 * Sets up hooks for enqueuing styles and scripts
	 */
	public function __construct() {
		$this->setup_actions();

		if ( \is_admin() ) {
			new Admin();
		}
	}

	/**
	 * Sets up hooks for enqueuing styles and scripts.
	 * Hooks are added to 'wp_enqueue_scripts'
	 */
	public function setup_actions() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );
	}

	/**
	 * Enqueues stylesheet for the plugin.
	 * Stylesheet is located at the plugin's assets directory.
	 */
	public function enqueue_styles() {
		wp_enqueue_style( 'anww', ANWW_PLUGIN_URL . 'assets/css/accessibility-new-window-warnings-min.css', array(), ANWW_VERSION, 'all' );
	}

	/**
	 * Enqueues JavaScript file for the plugin.
	 * JS file is located at the plugin's assets directory.
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( 'anww', ANWW_PLUGIN_URL . 'assets/js/accessibility-new-window-warnings-min.js', array( 'jquery' ), ANWW_VERSION, true );

		// Localize the script with new data.
		$translation_array = array(
			'opens_a_new_window' => __( 'opens a new window', 'accessibility-new-window-warnings' ),
		);
		wp_localize_script( 'anww', 'anww_localized', $translation_array );
	}
}
