!function($){"use strict";var n;function t(){var t="";$(".anww-external-link-icon").remove(),$("a[target=_blank]").each((function(){$(":header",this).length?$(":header",this).append('<i class="anww-external-link-icon" aria-hidden="true"></i>'):$(this).append('<i class="anww-external-link-icon" aria-hidden="true"></i>'),$(this).attr("aria-label")?t=$(this).attr("aria-label"):$("img",$(this)).length?t=$(this).find("img").attr("alt"):$(this).text()&&(t=$(this).text()),t?(t=t.trimEnd(),t+=", "+anww_localized.opens_a_new_window):t+=anww_localized.opens_a_new_window,$(this).attr("aria-label",t),$(this).mousemove((function(t){n.css({top:t.pageY+10+"px",left:t.pageX+10+"px"})})).hover((function(){n.show().html(anww_localized.opens_a_new_window)}),(function(){n.hide()})),$(this).on({focusin:function(){var t=$(this).offset();n.css({top:t.top+$(this).outerHeight()+"px",left:t.left+"px"}),n.show().html(anww_localized.opens_a_new_window)},focusout:function(){n.hide()}})}))}$(window).on("load",(function(){n=$("<div/>").css({position:"absolute",background:"white",color:"#1e1e1e",fontSize:"16px",border:"1px solid black",padding:"5px 10px",zIndex:9999,display:"none"}).addClass("anww-tooltip").appendTo("body"),t()})),$(document).on("facetwp-loaded",t)}(jQuery);