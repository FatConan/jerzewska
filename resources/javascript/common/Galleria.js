define(["underscore", "jquery"], function(_, $){
    return class Galleria{
        constructor(){
            this.index = 0;
            this.events = window.eventHandler;
            this.galleria = $("ul.galleria");
            this.galleriaNav = $(".galleria-nav");
            this.shots = this.galleria.find("li");
            this.total = this.shots.length;

            this.monitor = this.galleriaNav.find(".monitor");

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
                    setTimeout(transitionEnded, 500);
                }else{
                    console.log("No element o track");
                    resolve();
                }
            });
        }

        async show(direction){
            let index = 0;
            if(direction === "next"){
                index = (this.index + 1) % this.total;
            }else{
                index = ((this.index - 1) + this.total) % this.total;
            }

            await this.transition(this.shots, function(el){el.removeClass("selected")});

            this.index = index;
            this.shots.removeClass("showing");
            let $el = $(this.shots[this.index]);
            if($el.length){
                $el.addClass("showing");
                this.transition($el, function(el){el.addClass("selected")});
                this.monitor.empty().append(this.index+1  + "/" + this.total);
            }
        }
    }
});