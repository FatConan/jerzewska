requirejs(["../build"], function(){
    'use strict';
    boot(["jquery", "domReady"], function ($, domReady) {
        domReady(function(){
            const bioEntryHandler = function(e, args){
                if(args.$matchedEl.hasClass("open")){
                    $("ol.roles li").removeClass("open");
                }else{
                    $("ol.roles li").removeClass("open");
                    args.$matchedEl.addClass("open");
                }
            };

            window.eventHandler.addListener("ol.roles li", bioEntryHandler);
        });
    });
});