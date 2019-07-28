requirejs(["build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "./timeline/TimelineHandler"], function ($, domReady, TimelineHandler) {
        domReady(function(){
            class NavSwitcher{
                constructor(){
                     this.mainNav = $("nav.main.shown");
                     this.mainNavInner = this.mainNav.find("div.inner");
                     this.introHeader = $("header.intro")
                     this.cutoffPoint  = this.introHeader.height() - (this.mainNavInner.height());
                     this.checkScroll();
                     this.addListener();
                }

                checkScroll(){
                    let pos = $(window).scrollTop();
                    if(pos > this.cutoffPoint) {
                        this.mainNav.addClass("alt");
                    }else{
                        this.mainNav.removeClass("alt");
                    }
                }

                addListener(){
                    $(window).scroll(function(){
                        this.checkScroll();
                    }.bind(this));
                }
            }

            new NavSwitcher();

            /* Handle hovering on the timeline */
            let overlay = $("div.timeline .over");
            let base = $("div.timeline .base");
            let links = $("ul.timeline-links a");

            new TimelineHandler(overlay, base, links);
        });
    });
});