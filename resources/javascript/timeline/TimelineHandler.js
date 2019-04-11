define(["underscore", "jquery"], function(_, $){
    return class TimeLineHandler{
        constructor(timelineOverlay, timelineBase, targetLinks){
            this.overlay = timelineOverlay;
            this.base = timelineBase;
            this.targetLinks = targetLinks;
            this.targetLinks.hover(this.hoverOver.bind(this), this.hoverOut.bind(this))
        }

        hoverChange(pos){
            let backgroundPos = (33.33333 * pos) + "%";
            if(pos > 0){
                this.overlay.css("background-position-y", backgroundPos);
                this.overlay.removeClass("off");
                this.base.addClass("grey");
            }else{
                this.overlay.addClass("off");
                this.base.removeClass("grey");
            }
        }

        hoverOver(e){
            e.preventDefault();
            let $e = $(e.target);
            $e.addClass("on");
            let pos = parseInt($e.data("target"), 10);
            this.hoverChange(pos);
        }

        hoverOut(e){
            e.preventDefault();
            let $e = $(e.target);
            $e.removeClass("on");
            this.hoverChange(0);
        }
    }
});