(function ($) {
	"use strict";

	var anww_link_tooltip;

	function initializeTooltip() {
		anww_link_tooltip = $('<div/>').css({
			position: 'absolute',
			background: 'white',
			color: '#1e1e1e',
			fontSize: '16px',
			border: '1px solid black',
			padding: '5px 10px',
			zIndex: 9999,
			display: 'none'
		}).addClass('anww-tooltip').appendTo('body');
	}

	function processLinks() {
		var anww_label = '';

		// Remove previously appended icons to avoid duplication
		$(".anww-external-link-icon").remove();

		$("a").each(function () {
			var hasIcon = false;
			var onclickAttr = $(this).attr("onclick");

			// Check if the link opens a new window using target="_blank"
			if ($(this).attr("target") === "_blank") {
				addExternalLinkIcon($(this));
				updateAriaLabel($(this));
				addTooltipHandlers($(this));
				hasIcon = true;
			}

			// Check if the link uses window.open in the onclick attribute
			if (onclickAttr && onclickAttr.includes("window.open")) {
				// Extract window.open arguments
				var windowOpenMatch = onclickAttr.match(/window\.open\([^,]+,\s*['"]([^'"]+)['"]/);
				var targetWindow = windowOpenMatch ? windowOpenMatch[1] : '';

				// Ensure window.open is opening a new window (i.e., '_blank')
				if (targetWindow === '_blank' || targetWindow === '') {
					addExternalLinkIcon($(this));
					updateAriaLabel($(this));
					addTooltipHandlers($(this));
					hasIcon = true;
				}
			}

			// If no external link behavior detected, do not proceed with tooltip
			if (!hasIcon) {
				return;
			}

			function addExternalLinkIcon(link) {
				// Add icon to link
				if ($(':header', link).length) {
					$(':header', link).append('<i class="anww-external-link-icon" aria-hidden="true"></i>');
				} else {
					link.append('<i class="anww-external-link-icon" aria-hidden="true"></i>');
				}
			}

			function updateAriaLabel(link) {
				// Get aria label text
				if (link.attr("aria-label")) {
					anww_label = link.attr("aria-label");
				} else if ($('img', link).length) {
					anww_label = link.find("img").attr("alt");
				} else if (link.text()) {
					anww_label = link.text();
				}

				// Add warning label
				if (anww_label) {
					anww_label = anww_label.trimEnd();
					anww_label += ", " + anww_localized.opens_a_new_window;
				} else {
					anww_label += anww_localized.opens_a_new_window;
				}

				// Add aria-label to link 
				link.attr("aria-label", anww_label);
			}

			function addTooltipHandlers(link) {
				// Position and show link_tooltip on hover
				link.mousemove(function (e) {
					anww_link_tooltip.css({
						top: e.pageY + 10 + 'px',
						left: e.pageX + 10 + 'px'
					});
				})
				.hover(function () {
					anww_link_tooltip.show().html(anww_localized.opens_a_new_window);
				}, function () {
					anww_link_tooltip.hide();
				});

				// Position and show link_tooltip on focus
				link.on({
					focusin: function () {
						var position = link.offset();
						anww_link_tooltip.css({
							top: position.top + link.outerHeight() + 'px',
							left: position.left + 'px'
						});

						anww_link_tooltip.show().html(anww_localized.opens_a_new_window);
					},
					focusout: function () {
						anww_link_tooltip.hide();
					}
				});
			}
		});
	}

	$(window).on('load', function () {
		initializeTooltip();
		processLinks();
	});

	// Support for FacetWP: Re-run the processLinks function when FacetWP refreshes the page
	$(document).on('facetwp-loaded', processLinks);

})(jQuery);
