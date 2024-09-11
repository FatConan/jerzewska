import "jquery";
import {BaseClass} from "malicacid";

export default class BioView extends BaseClass{
    constructor(){
        super();
        this.addListeners();
    }

    addListeners(){
        const bioEntryHandler = function(e, args){
            e.preventDefault();
            const roles = $("ol.roles li");
            if(args.$matchedEl.hasClass("open")){
                roles.removeClass("open");
            }else{
                roles.removeClass("open");
                args.$matchedEl.addClass("open");
            }
        };

        const formHandler = (e, args) => {
            e.preventDefault();
            let form = this.eventHandler.findParentTag(args.matchedEl, "form");
            if(form){
                form.submit();
            }
        };

        this.eventHandler.addNullListener("ol.roles li div.description");
        this.eventHandler.addListener("ol.roles li", bioEntryHandler);
        this.eventHandler.addListener("a.submit", formHandler);
    }
}