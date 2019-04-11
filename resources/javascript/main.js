requirejs(["build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "./timeline/TimelineHandler"], function ($, domReady, TimelineHandler) {
        domReady(function(){
            let mainNav = $("nav.main");

            /* Set up the scroll tracker */
            $(window).scroll(function(){
                let a = $("div.intro-inner").height() - (mainNav.height() + 70);
                let pos = $(window).scrollTop();
                if(pos > a) {
                    mainNav.removeClass("scrolling").addClass("alt")
                }else if(pos > 0){
                    mainNav.removeClass("alt").addClass("scrolling");
                }else{
                    mainNav.removeClass("alt").removeClass("scrolling");
                }
            });

            /* Handle hovering on the timeline */
            let overlay = $("div.timeline .over");
            let base = $("div.timeline .base");
            let links = $("ul.timeline-links a");

            new TimelineHandler(overlay, base, links);
        });
    });
});