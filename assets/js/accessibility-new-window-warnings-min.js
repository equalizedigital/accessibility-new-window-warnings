!function($){"use strict";$(window).on("load",(function(){var i="",t=$("<div/>").css({position:"absolute",background:"white",color:"#1e1e1e",fontSize:"16px",border:"1px solid black",padding:"5px 10px",zIndex:9999,display:"none"}).addClass("anww-tooltip").appendTo("body");$("a[target=_blank]").each((function(){$(":header",this).length?$(":header",this).append('<i class="anww-external-link-icon" aria-hidden="true"></i>'):$(this).append('<i class="anww-external-link-icon" aria-hidden="true"></i>'),$(this).attr("aria-label")?i=$(this).attr("aria-label"):$("img",$(this)).length?i=$(this).find("img").attr("alt"):$(this).text()&&(i=$(this).text()),i?(i=i.trimEnd(),i+=", "+anww_localized.opens_a_new_window):i+=anww_localized.opens_a_new_window,$(this).attr("aria-label",i),$(this).mousemove((function(i){t.css({top:i.pageY+10+"px",left:i.pageX+10+"px"})})).hover((function(){t.show().html(anww_localized.opens_a_new_window)}),(function(){t.hide()})),$(this).on({focusin:function(){var i=$(this).offset();t.css({top:i.top+$(this).outerHeight()+"px",left:i.left+"px"}),t.show().html(anww_localized.opens_a_new_window)},focusout:function(){t.hide()}})}))}))}(jQuery);