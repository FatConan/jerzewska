define(["underscore", "jquery"], function(_, $){
    return function(timelineOverlay, timelineBase, targetLinks){
        var clz = _.extend({}, {
            initialize: function (timelineOverlay, timelineBase, targetLinks) {
                this.overlay = timelineOverlay;
                this.base = timelineBase;
                this.targetLinks = targetLinks;
                this.targetLinks.hover(this.hoverOver.bind(this), this.hoverOut.bind(this))
            },

            hoverChange: function (pos) {
                var backgroundPos = (33.33333 * pos) + "%";
                if (pos > 0) {
                    this.overlay.css("background-position-y", backgroundPos);
                    this.overlay.removeClass("off");
                    this.base.addClass("grey");
                } else {
                    this.overlay.addClass("off");
                    this.base.removeClass("grey");
                }
            },

            hoverOver: function (e) {
                e.preventDefault();
                var $e = $(e.target);
                $e.addClass("on");
                var pos = parseInt($e.data("target"), 10);
                this.hoverChange(pos);
            },

            hoverOut: function(e){
                e.preventDefault();
                var $e = $(e.target);
                $e.removeClass("on");
                this.hoverChange(0);
            }
        });
        var inst = _.extend({}, clz);
        inst.initialize(timelineOverlay, timelineBase, targetLinks);
        return inst;
    }
});