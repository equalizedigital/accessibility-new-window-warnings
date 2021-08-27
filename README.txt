=== Accessibility New Window Warnings ===
Contributors: equalizedigital, alh0319, stevejonesdev, roadwarriorwp
Tags: accessibility, accessible, wcag, ada, a11y, section 508, links, open new window, open new tab
Requires at least: 5.0.0
Tested up to: 5.8
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html


Make links that open in a new window compliant with WCAG guidelines for accessibility by adding a warning for users.

== Description ==

Web Content Accessibility Guidelines (WCAG) Success Criterion 3.2 (Predictable) specifies that web pages should appear and operate in predictable ways. It is a common practice to set links that go to off-site locations to open in a new window or tab when clicked. Opening new windows or tabs automatically when a link is activated can be disorienting for people who have difficulty perceiving visual content, and for some people with cognitive disabilities, if they are not warned in advance. 

This plugin helps websites become more accessible and better meet WCAG guidelines for predicability by providing advanced warning if a link is going to open a new window or tab before the user clicks or activates it. Providing a warning allows the user to decide it they want to leave the current window, and the warning will help them find their way back, if they do decide they would like to go to the new window. It will help them understand that the "back" button will not work and that they have to return to the last window they had open, in order to find their previous location.

There are no settings in this plugin. Simply activate it and it will automatically find all links that open in a new window and add the following three fixes to each link:
1. A new window icon after the link text to denote that the link opens in a new window for sighted people.
2. A tooltip, visible on hover, that says "opens a new window."
3. "Opens a new window" screen reader text that will be read out to blind or visually impaired people using screen readers immediately following the link anchor text.

Please note: new window warnings will be added to links and links that have been styled to look like buttons, including social media sharing and link icons. Depending upon what third party plugins are adding links to your site that open in new windows, some CSS styling may be required.

In addition to adding warnings for your users, this plugin integrates with the **[Accessibility Checker plugin](https://wordpress.org/plugins/accessibility-checker/)**; when Accessibility New Window Warnings is activated, it will automatically clear all "[Link Opens New Window or Tab](https://equalizedigital.com/accessibility-checker/link-opens-new-window-or-tab/)" warnings in Accessibility Checker scans of your website. Installing and activating this plugin is a great way to quickly remediate and remove a lot of open issues across you entire website.  

The Accessibility New Window Warnings plugin is inspired by [Techniques for WCAG 2.0 G201: Giving users advanced warning when opening a new window](https://www.w3.org/TR/WCAG20-TECHS/G201.html).

== Installation ==

Getting started with Accessibility New Window Warnings is as easy as installing and activating the plugin. There are no settings to configure, it just works!  

### Installing Accessibility New Window Warnings Within WordPress
1. Visit the plugins page within your dashboard and select ‘Add New’.
2. Search for ‘Accessibility New Window Warnings’;
3. On the Accessibility New Window Warnings plugin, click or activate the 'Install' button.
4. Activate Accessibility New Window Warnings from your Plugins page.

### Installing Accessibility New Window Warnings Manually

1.Upload the unzipped ‘accessibility-new-window-warnings’ folder to the /wp-content/plugins/ directory on your website via FTP.
2. Activate Accessibility New Window Warnings from your Plugins page.

== Frequently Asked Questions ==

= How does the plugin know which links open new windows? =
The plugin looks for `target="_blank"` in your links. If `target="_blank"` is present then it will identify the link as opening a new window and automatically add the warning.

= Is this compatible with the block editor or the classic editor or page builder XYZ? =
Yes. No matter how you're creating your content, this plugin will work. It uses javascript to identify the links and fix them as the page is rendered so it doesn't matter what tool you used to build out your content.

= The plugin adds new window icons to my social media icons and I don't like how it looks!? =
When it comes to accessibility, warning users about links opening in new tabs or windows applies to all links, not just links in your body text. Adding the visible icon is important for users with cognative disabilities or mobility challenges so they are warned about the new window before clicking on or activating links - it's not sufficient to just add screen reader text for blind and visually imparied users. 

Depending upon how you're adding linked icons, we understand that this can cause a less than ideal appearance. If you don't like how the visible icon appears you have a couple of options: either change the link to not open in a new window or change the design of your social media or icon buttons either with that plugin's settings or custom CSS. It's generally not considered correct to hide the visible icon.

= Does this plugin make my website accessible? =
This plugin can help to make your website *more accessible* by fixing a common issue, however it alone will not make your website accessible. True accessibility requires manual and automated testing and a human being making fixes in the website. While problems can be resolved with an automated tool such as this, not all accessibility problems can be identified automatically. [Learn more about how to test your website for accessibility errors](https://equalizedigital.com/accessibility-checker/how-to-manually-check-your-website-for-accessibility/)


== Screenshots ==

1. Shows the new window icon being added to the end of a text link.
2. Shows the "opens a new window" tool tip visible on hover.
3. Shows the screen reader text "opens a new window" being added after the link anchor in the link's HTML.
4. Shows the new window icon added to a button created with the block editor.
5. Shows the new window icons being added into social media sharing buttons from a third-party plugin.

== Changelog ==

= 1.0.0 =
* Everything is new and shiny.
* We think it's awesome you want to make your website more accessible.
