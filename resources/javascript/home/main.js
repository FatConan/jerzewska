requirejs(["../build"], function(){
    'use strict';
    boot(["jquery", "domReady"], function ($, domReady) {
        domReady(function(){
            let $overlay = $("div.home>div");
            const matchObj = {
                "a.cs-link": function(el){
                    let classes = $(el.classList).slice(1, el.classList.length);
                    let classArray = [];
                    classes.each(function(i, c){
                        classArray.push(c);
                    });
                    $overlay.removeClass().addClass(classArray);
                }
            };

            $("a.cs-link").on("mouseover", function(e){
                let $match = window.eventHandler.parentMatches(e.target, matchObj);
                if($match){
                    $match[2]($match[0]);
                }
            });
        });
    });
});