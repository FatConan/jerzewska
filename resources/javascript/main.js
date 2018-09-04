requirejs(["build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "nav/NavigationHandler"], function ($, domReady, NavigationHandler) {
        domReady(function(){
            $(window).scroll(function(){
                var a = $("div.intro-inner").height() - ($("nav.main").height() + 70);
                var pos = $(window).scrollTop();
                if(pos > a) {
                    $("nav.main").removeClass("scrolling").addClass("alt")
                }else if(pos > 0){
                    $("nav.main").removeClass("alt").addClass("scrolling");
                }else{
                    $("nav.main").removeClass("alt").removeClass("scrolling");
                }
            });

            var overlay = $("div.timeline .over");
            var base = $("div.timeline .base");
            var links = $("ul.timeline-links a");
            new NavigationHandler(overlay, base, links);
        });
    });
});