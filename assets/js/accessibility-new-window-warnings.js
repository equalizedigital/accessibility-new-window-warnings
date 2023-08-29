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

      $("a[target=_blank]").each(function () {
          // Add icon to link
          if ($(':header', this).length) {
              $(':header', this).append('<i class="anww-external-link-icon" aria-hidden="true"></i>');
          } else {
              $(this).append('<i class="anww-external-link-icon" aria-hidden="true"></i>');
          }

          // Get aria label text
          if ($(this).attr("aria-label")) {
              anww_label = $(this).attr("aria-label");
          } else if ($('img', $(this)).length) {
              anww_label = $(this).find("img").attr("alt");
          } else if ($(this).text()) {
              anww_label = $(this).text();
          }

          // Add warning label
          if (anww_label) {
              anww_label = anww_label.trimEnd();
              anww_label += ", " + anww_localized.opens_a_new_window;
          } else {
              anww_label += anww_localized.opens_a_new_window;
          }

          // Add aria-label to link 
          $(this).attr("aria-label", anww_label);

          // Position and show link_tooltip on hover
          $(this).mousemove(function (e) {
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
          $(this).on({
              focusin: function () {
                  var position = $(this).offset();
                  anww_link_tooltip.css({
                      top: position.top + $(this).outerHeight() + 'px',
                      left: position.left + 'px'
                  });

                  anww_link_tooltip.show().html(anww_localized.opens_a_new_window);
              },
              focusout: function () {
                  anww_link_tooltip.hide();
              }
          });
      });
  }

  $(window).on('load', function () {
      initializeTooltip();
      processLinks();
  });

  // Support for FacetWP: Re-run the processLinks function when FacetWP refreshes the page
  $(document).on('facetwp-loaded', processLinks);

})(jQuery);
