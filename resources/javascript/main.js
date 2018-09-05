requirejs(["build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "./timeline/TimelineHandler"], function ($, domReady, TimelineHandler) {
        domReady(function(){
            var mainNav = $("nav.main");

            /* Set up the scroll tracker */
            $(window).scroll(function(){
                var a = $("div.intro-inner").height() - (mainNav.height() + 70);
                var pos = $(window).scrollTop();
                if(pos > a) {
                    mainNav.removeClass("scrolling").addClass("alt")
                }else if(pos > 0){
                    mainNav.removeClass("alt").addClass("scrolling");
                }else{
                    mainNav.removeClass("alt").removeClass("scrolling");
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