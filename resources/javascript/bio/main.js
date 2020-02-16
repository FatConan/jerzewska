requirejs(["../build"], function(){
    'use strict';
    boot(["jquery", "domReady"], function ($, domReady) {
        domReady(function(){
            const eventHandler = window.eventHandler;

            const bioEntryHandler = function(e, args){
                e.preventDefault();
                const roles = $("ol.roles li");
                if(args.$matchedEl.hasClass("open")){
                    roles.removeClass("open");
                }else{
                    roles.removeClass("open");
                    args.$matchedEl.addClass("open");
                }
            };

            const formHandler = function(e, args){
                e.preventDefault();
                let form = eventHandler.findParentTag(args.matchedEl, "form");
                if(form){
                    form.submit();
                }
            };

            eventHandler.addListener("ol.roles li", bioEntryHandler);
            eventHandler.addListener("a.submit", formHandler);
        });
    });
});