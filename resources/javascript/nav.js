/**
 * Created by ian on 3/27/17.
 */
$(function() {
    var overlay = $("div.timeline .over");
    var base = $("div.timeline .base");

    var hoverChange = function(pos){
        var backgroundPos = (33.33333 * pos) + "%";
        if(pos > 0){
            overlay.css("background-position-y", backgroundPos);
            overlay.removeClass("off");
            base.addClass("grey");
        }else{
            overlay.addClass("off");
            base.removeClass("grey");
        }
    };

    var hoverOver = function(e){
        e.preventDefault();
        var $e = $(e.target);
        $e.addClass("on");
        var pos = parseInt($e.data("target"), 10);
        hoverChange(pos);
    };
    var hoverOut = function(e){
        e.preventDefault();
        var $e = $(e.target);
        $e.removeClass("on");
        hoverChange(0);
    };

    $("ul.timeline-links a").hover(hoverOver, hoverOut);
});

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
