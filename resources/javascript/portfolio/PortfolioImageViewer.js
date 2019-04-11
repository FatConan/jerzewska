define(["underscore", "jquery"], function(_, $){
    return class PortfolioImageViewer{
        constructor(){
            this.supplemental = $("section.supplemental");
            this.fader = $("div.fader");

            this.switchers = $("a.thumb");
            this.switchers.each(function (i, el) {
                let $el = $(el);
                let fullImg = new Image();
                fullImg.src = $el.data("half");
            });
            this.setInitial();

            this.switchers.on("mouseover", function(e){
                e.preventDefault();
                let $el = $(e.target);
                this.switch($el);
            }.bind(this));

            this.switchers.on("click", function(e){
                e.preventDefault();
                let $el = $(e.target);
                this.open($el);
            }.bind(this))
        }

        open($el){
            this.switchers.removeClass("selected");
            $el.addClass("selected");
        }

        switch($el){
            this.fader.hide();
            this.fader.css("background-image", this.supplemental.css("background-image"));
            this.fader.css("background-color", this.supplemental.css("background-color"));
            this.fader.show();

            let imgSrc = $el.data("half");
            let fullImg = new Image();
            fullImg.src = imgSrc;

            let bg_col = $el.data("color") ? $el.data("color") : "transparent";
            this.supplemental.css("background-image", "url(" + fullImg.src + ")");
            this.supplemental.css("background-color", $el.data("color"));

            this.fader.fadeOut(500);
        }

        setInitial(){
            if(this.switchers.length > 0){
                this.switchers.each(function (i, el){
                    let $el = $(el);
                    if ($el.hasClass("selected")){
                        this.switch($el);
                    }
                }.bind(this));
            }
        }
    }
});