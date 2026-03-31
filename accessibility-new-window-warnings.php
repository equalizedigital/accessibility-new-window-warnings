<?php
/**
 * Plugin Name: Accessibility New Window Warnings
 * Plugin URI:  https://a11ychecker.com
 * Description: Make links that open in a new window accessible by adding a warning.
 * Version:     1.3.0
 * Author:      Equalize Digital
 * Author URI:  https://equalizedigital.com
 * License:     GPL-2.0-or-later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: accessibility-new-window-warnings
 *
 * @package ANWW
 */

use EqualizeDigital\AccessibilityNewWindowWarnings\ANWW;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const ANWW_VERSION = '1.3.0';
define( 'ANWW_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'ANWW_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

if ( ! class_exists( '\EqualizeDigital\AccessibilityNewWindowWarnings\ANWW' ) ) {
	require_once ANWW_PLUGIN_DIR . 'includes/ANWW.php';
}

// instantiate the plugin class.
ANWW::get_instance();
