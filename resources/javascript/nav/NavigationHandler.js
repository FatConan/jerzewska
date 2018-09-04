require(["jquery"], function($){
    return {
        initialize: function(timelineOverlay, timelineBase, targetLinks){
            this.overlay = timelineOverlay;
            this.base = timelineBase;
            this.targetLinks = targetLinks;
            this.targetLinks.hover(this.hoverOver, this.hoverOut)
        },

        hoverChange: function(pos){
            var backgroundPos = (33.33333 * pos) + "%";
            if(pos > 0){
                overlay.css("background-position-y", backgroundPos);
                overlay.removeClass("off");
                base.addClass("grey");
            }else{
                overlay.addClass("off");
                base.removeClass("grey");
            }
        },

        hoverOver: function(e){
            e.preventDefault();
            var $e = $(e.target);
            $e.addClass("on");
            var pos = parseInt($e.data("target"), 10);
            hoverChange(pos);
        },

        hoverOut: function(e) {
            e.preventDefault();
            var $e = $(e.target);
            $e.removeClass("on");
            hoverChange(0);
        }
    };
});