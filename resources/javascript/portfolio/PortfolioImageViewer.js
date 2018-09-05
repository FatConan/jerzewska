define(["underscore", "jquery"], function(_, $){
    return function(){
        var clz = {
            init: function () {
                this.supplemental = $("section.supplemental");
                this.fader = $("div.fader");

                this.switchers = $("a.thumb");
                this.switchers.each(function (i, el) {
                    $el = $(el);
                    var fullImg = new Image();
                    fullImg.src = $el.data("half");
                });
                this.setInitial();

                this.switchers.on("mouseover", function (e) {
                    e.preventDefault();
                    var $el = $(e.target);
                    this.switch($el);
                }.bind(this));

                this.switchers.on("click", function (e) {
                    e.preventDefault();
                    var $el = $(e.target);
                    this.open($el);
                }.bind(this));

                return this;
            },

            open: function($el){
                this.switchers.removeClass("selected");
                $el.addClass("selected");
            },

            switch: function($el){
                this.fader.hide();
                this.fader.css("background-image", this.supplemental.css("background-image"));
                this.fader.css("background-color", this.supplemental.css("background-color"));
                this.fader.show();

                var imgSrc = $el.data("half");
                var fullImg = new Image();
                fullImg.src = imgSrc;

                var bg_col = $el.data("color") ? $el.data("color") : "transparent";
                this.supplemental.css("background-image", "url(" + fullImg.src + ")");
                this.supplemental.css("background-color", $el.data("color"));

                this.fader.fadeOut(500);
            },

            setInitial: function(){
                if (this.switchers.length > 0) {
                    this.switchers.each(function (i, el) {
                        $el = $(el);
                        if ($el.hasClass("selected")) {
                            this.switch($el);
                        }
                    }.bind(this));
                }
            }
        };
        var inst = _.extend({}, clz);
        inst.init();
        return inst;
    }
});