requirejs(["build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "./timeline/TimelineHandler"], function ($, domReady, TimelineHandler) {
        domReady(function(){
            $(window).scroll(function(){
                var a = $("div.intro-inner").height() - ($("timeline.main").height() + 70);
                var pos = $(window).scrollTop();
                if(pos > a) {
                    $("timeline.main").removeClass("scrolling").addClass("alt")
                }else if(pos > 0){
                    $("timeline.main").removeClass("alt").addClass("scrolling");
                }else{
                    $("timeline.main").removeClass("alt").removeClass("scrolling");
                }
            });

            /* Handle hovering on the timeline */
            var overlay = $("div.timeline .over");
            var base = $("div.timeline .base");
            var links = $("ul.timeline-links a");
            new TimelineHandler(overlay, base, links);
        });
    });
});