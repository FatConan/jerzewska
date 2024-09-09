requirejs(["../build"], function(){
    'use strict';
    boot(["jquery", "domReady", "common/HighLevelEventHandler"], function($, domReady, HighLevelEventHandler){
        domReady(function(){
            const $overlay = $("div.home>div");
            const eventHandler = HighLevelEventHandler.grabHandler();
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

            $overlay.on("mouseover", function(e){
                let $match = eventHandler.parentMatches(e.target, matchObj);
                if($match[0] !== null){
                    $match[2]($match[0]);
                }else{
                    $overlay.removeClass();
                }
            });
        });
    });
});