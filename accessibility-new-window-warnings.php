<?php
/**
 * Plugin Name: Accessibility New Window Warnings
 * Plugin URI:  https://a11ychecker.com
 * Description: Make links that open in a new window accessible by adding a warning.
 * Version:     1.0.8
 * Author:      Equalize Digital
 * Author URI:  https://equalizedigital.com
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: accessibility-new-window-warnings
 *
 * @package ANWW
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use EqualizeDigital\ANWW\Inc\AccessibilityNewWindowWarnings;

define( 'ANWW_VERSION', '1.0.8' );
define( 'ANWW_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'ANWW_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/* ***************************** CLASS AUTOLOADING *************************** */
if ( file_exists( ANWW_PLUGIN_DIR . 'vendor/autoload.php' ) ) {
	require ANWW_PLUGIN_DIR . 'vendor/autoload.php';
}

if ( class_exists( 'EqualizeDigital\ANWW\Inc\AccessibilityNewWindowWarnings' ) ) {
	new AccessibilityNewWindowWarnings();
}
