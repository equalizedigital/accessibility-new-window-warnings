(function ($) {
  "use strict";

  $(window).on('load',function () {

    var anww_label = '';
    
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
      
      // get aria label text
      if($(this).attr("aria-label")){
        anww_label = $(this).attr("aria-label");
      }else if($('img', $(this)).length){
        anww_label = $(this).find("img").attr("alt");
      }else if($(this).text()){
        anww_label = $(this).text();
      }

      // add warning label
      if(anww_label){
        anww_label = anww_label.trimEnd();
        anww_label += ", opens a new window";
      }else{
        anww_label += "opens a new window";
      }

      // add aria-label to link 
      $(this).attr("aria-label", anww_label);

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
          var position = $(this).offset();
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
