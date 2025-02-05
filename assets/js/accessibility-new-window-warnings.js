/* global jQuery, anww_localized */

(function ($) {
	"use strict";

	let anwwLinkTooltip;
	let tooltipTimeout;

	/**
	 * Initializes the tooltip element and event listeners.
	 */
	const initializeTooltip = () => {
		anwwLinkTooltip = $("<div/>")
			.attr("role", "tooltip")
			.css({
				position: "absolute",
				background: "white",
				color: "#1e1e1e",
				fontSize: "16px",
				border: "1px solid black",
				padding: "5px 10px",
				zIndex: 9999,
				display: "none",
				pointerEvents: "auto",
				boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
				maxWidth: "200px", // Prevent excessive width
				whiteSpace: "nowrap" // Prevent text wrapping
			})
			.addClass("anww-tooltip")
			.appendTo("body");

		// Hide tooltip when clicking outside or pressing Escape
		$(document).on("click keydown", (event) => {
			if (event.type === "keydown" && event.key === "Escape") {
				hideTooltip();
			} else if (!$(event.target).closest(".anww-tooltip, a[target='_blank']").length) {
				hideTooltip();
			}
		});

		// Keep tooltip visible when hovered
		anwwLinkTooltip.on("mouseenter", () => {
			clearTimeout(tooltipTimeout);
		}).on("mouseleave", () => {
			hideTooltip();
		});
	};

	/**
	 * Processes all anchor links and applies necessary accessibility enhancements.
	 */
	const processLinks = () => {
		$(".anww-external-link-icon").remove();

		$("a").each(function () {
			let hasIcon = false;
			const $this = $(this);
			const onclickAttr = $this.attr("onclick");

			if ($this.attr("target") === "_blank") {
				addExternalLinkIcon($this);
				updateAriaLabel($this);
				addTooltipHandlers($this);
				hasIcon = true;
			}

			if (onclickAttr && onclickAttr.includes("window.open")) {
				const windowOpenMatch = onclickAttr.match(/window\.open\([^,]+,\s*['"]([^'"]+)['"]/);
				const targetWindow = windowOpenMatch ? windowOpenMatch[1] : "";

				if (targetWindow === "_blank" || targetWindow === "") {
					addExternalLinkIcon($this);
					updateAriaLabel($this);
					addTooltipHandlers($this);
					hasIcon = true;
				}
			}

			if (!hasIcon) {
				return;
			}
		});
	};

	/**
	 * Adds an external link icon to the specified link.
	 * @param {jQuery} link - The link element to modify.
	 */
	const addExternalLinkIcon = (link) => {
		if ($(":header", link).length) {
			$(":header", link).append('<i class="anww-external-link-icon" aria-hidden="true"></i>');
		} else {
			link.append('<i class="anww-external-link-icon" aria-hidden="true"></i>');
		}
	};

	/**
	 * Updates the aria-label of the specified link.
	 * @param {jQuery} link - The link element to modify.
	 */
	const updateAriaLabel = (link) => {
		let anwwLabel = "";

		if (link.attr("aria-label")) {
			anwwLabel = link.attr("aria-label");
		} else if ($("img", link).length) {
			anwwLabel = link.find("img").attr("alt");
		} else if (link.text()) {
			anwwLabel = link.text();
		}

		if (anwwLabel) {
			anwwLabel = anwwLabel.trimEnd();
			anwwLabel += `, ${anww_localized.opens_a_new_window}`;
		} else {
			anwwLabel += anww_localized.opens_a_new_window;
		}

		link.attr("aria-label", anwwLabel);
	};

	/**
	 * Adds tooltip event handlers to the specified link.
	 * @param {jQuery} link - The link element to modify.
	 */
	const addTooltipHandlers = (link) => {
		link.on("mouseenter", (e) => {
			showTooltip(link, e.pageX, e.pageY);
		});

		link.on("focusin", (e) => {
			const position = link.offset();
			showTooltip(link, position.left, position.top + link.outerHeight());
		});

		link.on("mouseleave focusout", () => {
			hideTooltipWithDelay();
		});
	};

	/**
	 * Displays the tooltip near the specified coordinates, adjusting if it overflows.
	 * @param {jQuery} link - The link triggering the tooltip.
	 * @param {number} x - The x-coordinate.
	 * @param {number} y - The y-coordinate.
	 */
	const showTooltip = (link, x, y) => {
		clearTimeout(tooltipTimeout);

		anwwLinkTooltip.html(anww_localized.opens_a_new_window).css("display", "block");

		const tooltipWidth = anwwLinkTooltip.outerWidth();
		const tooltipHeight = anwwLinkTooltip.outerHeight();
		const windowWidth = $(window).width();
		const windowHeight = $(window).height();
		const scrollTop = $(window).scrollTop();

		// Adjust X if the tooltip overflows the right edge
		if (x + tooltipWidth + 10 > windowWidth) {
			x -= (tooltipWidth + 20);
		}

		// Adjust Y if the tooltip overflows the bottom edge
		if (y + tooltipHeight + 10 > windowHeight + scrollTop) {
			y -= (tooltipHeight + 20);
		}

		anwwLinkTooltip.css({
			top: `${y + 10}px`,
			left: `${x + 10}px`
		});
	};

	/**
	 * Delays hiding the tooltip to prevent flickering.
	 */
	const hideTooltipWithDelay = () => {
		tooltipTimeout = setTimeout(hideTooltip, 300);
	};

	/**
	 * Hides the tooltip.
	 */
	const hideTooltip = () => {
		anwwLinkTooltip.hide();
	};

	// Initialize tooltip and process links on page load
	$(window).on("load", () => {
		initializeTooltip();
		processLinks();
	});

	// Support for FacetWP: Re-run the processLinks function when FacetWP refreshes the page
	$(document).on("facetwp-loaded", processLinks);

})(jQuery);
