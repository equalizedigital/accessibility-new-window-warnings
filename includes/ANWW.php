<?php

namespace EqualizeDigital\AccessibilityNewWindowWarnings;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * ANWW Class
 *
 * This class sets up actions for enqueuing styles and scripts
 * for making links that open in a new window accessible by adding a warning.
 */
class ANWW {

	/**
	 * Singleton instance of the class.
	 *
	 * @var ANWW
	 */
	private static $instance;

	/**
	 * Get the singleton instance of the class.
	 */
	public static function get_instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}
		return static::$instance;
	}

	/**
	 * ANWW constructor.
	 * Sets up hooks for enqueuing styles and scripts
	 */
	private function __construct() {
		$this->setup_actions();
	}

	/**
	 * Sets up hooks for enqueuing styles and scripts.
	 * Hooks are added to 'wp_enqueue_scripts'
	 */
	public function setup_actions() {
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_styles' ] );
	}

	/**
	 * Enqueues stylesheet for the plugin.
	 * Stylesheet is located at the plugin's assets directory.
	 */
	public function enqueue_styles() {
		$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '-min';
		wp_enqueue_style( 'anww', ANWW_PLUGIN_URL . "assets/css/accessibility-new-window-warnings{$suffix}.css", [], ANWW_VERSION, 'all' );
	}

	/**
	 * Enqueues JavaScript file for the plugin.
	 * JS file is located at the plugin's assets directory.
	 */
	public function enqueue_scripts() {

		$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '-min';
		wp_enqueue_script( 'anww', ANWW_PLUGIN_URL . "assets/js/accessibility-new-window-warnings{$suffix}.js", [], ANWW_VERSION, true );
		// Localize the script with new data.
		wp_localize_script(
			'anww',
			'anww_localized',
			[
				'classPrefix'     => 'anww',
				'localizedString' => __( 'opens a new window', 'accessibility-new-window-warnings' ),
			]
		);
	}
}
