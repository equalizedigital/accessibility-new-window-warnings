(function ($) {
  "use strict";

  $(window).on('load',function () {
    
    /**
     * Accessible _blank link tooltip
     */
    var anww_link_tooltip = $('<div/>').css({
      position: 'absolute',
      background: 'white',
      border: '1px solid black',
      padding: '5px 10px',
      zIndex: 999,
      display: 'none'
    }).appendTo('body');

    /**
     * loop through each link with a target of _blank
     */
    $("a[target=_blank]").each(function(){

      // add icon to link
      if($(':header',this).length){
        $(':header',this).append(' <i class="anww-external-link-icon" aria-hidden="true"></i>');
      }else{
        $(this).append(' <i class="anww-external-link-icon" aria-hidden="true"></i>');
      }
      
      // add aria-label to link
      $(this).attr("aria-label", $(this).text()+", opens a new window");

      // position and show link_tooltip on hover
      $(this).mousemove(function(e){
        anww_link_tooltip.css({
          top: e.pageY + 10 + 'px',
          left: e.pageX + 10 + 'px'
        });
      })
      .hover(function(){
        anww_link_tooltip.show().html('opens a new window');
      }, function(){
        anww_link_tooltip.hide();
      });

      // position and show link_tooltip on focus
      $(this).on({
        focusin: function () {
          var position = $(this).position();
          anww_link_tooltip.css({
                top: position.top + $(this).outerHeight() + 'px',
                left: position.left + 'px'
            });

          anww_link_tooltip.show().html('opens a new window');
        },
        focusout: function () {
            anww_link_tooltip.hide();
        }
      });

    });

  });
})(jQuery);
