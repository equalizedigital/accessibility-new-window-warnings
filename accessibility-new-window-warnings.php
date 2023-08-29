<?php
/**
 * Plugin Name: Accessibility New Window Warnings
 * Plugin URI:  https://a11ychecker.com
 * Description: Make links that open in a new window accessible by adding a warning.
 * Version:     1.0.6
 * Author:      Equalize Digital
 * Author URI:  https://equalizedigital.com
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: anww
 * Domain Path: /languages
 * 
 * @package ANWW
 */

define( 'ANWW_VERSION', '1.0.6' );
define( 'ANWW_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'ANWW_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

if ( ! class_exists( 'ANWW' ) ) {
	/**
	 * ANWW Class
	 * 
	 * This class sets up actions for enqueuing styles and scripts
	 * for making links that open in a new window accessible by adding a warning.
	 */
	class ANWW {

		private static $instance;

		/**
		 * Get the singleton instance of the class.
		 */
		public static function getInstance() {
			if ( null === static::$instance ) {
				static::$instance = new static();
			}
			return static::$instance;
		}
		
		/**
		 * ANWW constructor.
		 * Sets up hooks for enqueuing styles and scripts
		 */
		public function __construct() {
			$this->setup_actions();
		}
		
		/**
		 * Sets up hooks for enqueuing styles and scripts.
		 * Hooks are added to 'wp_enqueue_scripts'
		 */
		public function setup_actions() {
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );
			add_action( 'plugins_loaded', array( $this, 'load_textdomain' ) );
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
				'opens_a_new_window' => __( 'opens a new window', 'anww' ),
			);
			wp_localize_script( 'anww', 'anww_localized', $translation_array );
		}

		/**
		 * Loads the plugin's textdomain.
		 */
		public function load_textdomain() {
			load_plugin_textdomain( 'anww', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
		}
		
	}
	
	// instantiate the plugin class.
	ANWW::getInstance();
}
