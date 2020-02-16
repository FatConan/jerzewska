define(["underscore", "jquery", "common/HighLevelEventHandler", "jquery-touchwipe"], function(_, $, HighLevelEventHandler){
    return class Galleria{
        constructor(){
            this.index = 0;
            this.events = HighLevelEventHandler.grabHandler();
            this.galleria = $("ul.galleria");
            this.galleriaNav = $(".galleria-nav");
            this.shots = this.galleria.find("li");
            this.total = this.shots.length;
            this.monitor = this.galleriaNav.find(".monitor");

            let params = new URLSearchParams(location.search);
            let startingIndex = 0;
            let i = params.get("i");
            if(i){
                startingIndex = parseInt(params.get("i"), 10) - 1;
            }

            this.showSpecific(startingIndex, false);
            this.loadImages();
            this.addEvents();
        }

        addEvents(){
            this.events.addListener(".galleria-nav div", function(e, args){
                e.preventDefault();
                let direction = args.$matchedEl.data("direction");
                if(direction){
                    this.show(direction);
                }
            }.bind(this));

            $(".galleria.shots").touchwipe({
                 wipeLeft: function(){
                     this.show("next");
                 }.bind(this),
                 wipeRight: function(){
                     this.show("previous");
                 }.bind(this),
                 min_move_x: 20,
                 preventDefaultEvents: false
            });

            this.events.addKeyboardListener("body", "ArrowLeft", function(e, args){
                e.preventDefault();
                this.show("previous");
            }.bind(this));

            this.events.addKeyboardListener("body", "ArrowRight", function(e, args){
                e.preventDefault();
                this.show("next");
            }.bind(this));
        }

        async loadImages(){
            this.shots.find("img").each(function(i, e){
                $.ajax({
                    url: $(e).prop("src"),
                    method: "GET"
                });
            });
        }

        transition(el, action){
            return new Promise(resolve => {
                if(el.length) {
                    const transitionEnded = e => {
                        el[0].removeEventListener('transitionend', transitionEnded);
                        el[0].removeEventListener('transitioncancel', transitionEnded);
                        resolve();
                    };
                    el[0].addEventListener('transitionend', transitionEnded);
                    el[0].addEventListener('transitioncancel', transitionEnded);
                    action(el);
                    setTimeout(transitionEnded, 200);
                }else{
                    resolve();
                }
            });
        }

        async showSpecific(index, withPush){
            let cleanedIndex = + (index + this.total) % this.total;
            await this.transition(this.shots, function(el){el.removeClass("selected")});

            this.index = cleanedIndex;
            if(withPush){
                history.pushState({image: this.index}, window.title, "?i=" + (this.index + 1));
            }

            this.shots.removeClass("showing");
            let $el = $(this.shots[this.index]);
            if($el.length){
                $el.addClass("showing");
                this.transition($el, function(el){el.addClass("selected")});
                this.monitor.empty().append(this.index+1  + "/" + this.total);
            }
        }

        async show(direction){
            let index = 0;
            if(direction === "next"){
                index = (this.index + 1);
            }else{
                index = (this.index - 1);
            }

            this.showSpecific(index, true);
        }
    }
});