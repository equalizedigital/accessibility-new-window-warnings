!function(n){"use strict";n(window).on("load",(function(){var i=n("<div/>").css({position:"absolute",background:"white",border:"1px solid black",padding:"5px 10px",zIndex:999,display:"none"}).appendTo("body");n("a[target=_blank]").each((function(){n(":header",this).length?n(":header",this).append(' <i class="anww-external-link-icon" aria-hidden="true"></i>'):n(this).append(' <i class="anww-external-link-icon" aria-hidden="true"></i>'),n(this).attr("aria-label",n(this).text()+", opens a new window"),n(this).mousemove((function(n){i.css({top:n.pageY+10+"px",left:n.pageX+10+"px"})})).hover((function(){i.show().html("opens a new window")}),(function(){i.hide()})),n(this).on({focusin:function(){var e=n(this).position();i.css({top:e.top+n(this).outerHeight()+"px",left:e.left+"px"}),i.show().html("opens a new window")},focusout:function(){i.hide()}})}))}))}(jQuery);