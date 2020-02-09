define(["underscore", "jquery"], function(_, $){
    return class Galleria{
        constructor(){
            this.events = window.eventHandler;
            this.galleria = $("ul.galleria");
            this.galleriaNav = $(".galleria-nav");
            this.shots = this.galleria.find("li");

            console.log(this.galleria, this.galleriaNav);
        }

        /*switch($el){
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
        }*/
    }
});