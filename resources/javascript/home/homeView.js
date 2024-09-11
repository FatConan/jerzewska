import "underscore";
import "jquery";
import {BaseClass} from "malicacid";

export default class HomeView extends BaseClass{
    constructor(){
        super();
        this.$overlay = $("div.home>div");
        this.addListeners();
    }

    addListeners(){
        const updateOverlay = (e, args) => {
            e.preventDefault();
            this.$overlay.removeClass().addClass(args.$matchedEl.data("clazz"));
        };
        this.eventHandler.addListenerOnEvent("mouseover", "a.cs-link", updateOverlay);
    }
}