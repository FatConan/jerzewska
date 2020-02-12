requirejs(["../build"], function(){
    'use strict';
    boot(["jquery", "domReady"], function ($, domReady) {
        domReady(function(){
            let $overlay = $("div.home>div");
            $("a.cs-link").on("mouseover", function(e){
                let classes = $(e.target.classList).slice(1, e.target.classList.length);
                let classArray = [];
                classes.each(function(i, c){
                    classArray.push(c);
                });
                $overlay.removeClass().addClass(classArray);
            });
        });
    });
});