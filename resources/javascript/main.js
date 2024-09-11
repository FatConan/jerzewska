import "jquery";
import {BaseClass, Dispatcher} from "malicacid";
import HomeView from "./home/homeView.js";
import BioView from "./bio/bioView.js";
import PortfolioView from "./portfolio/portfolioView.js";

const VIEWS = new Map();
VIEWS.set("home", HomeView);
VIEWS.set("bio", BioView);
VIEWS.set("portfolio", PortfolioView)

class StartUp extends BaseClass{
    constructor(){
        super();

        const view = $("html").data("view");
        let instantiatedView;
        if(VIEWS.has(view)){
            let ViewClass = VIEWS.get(view);
            instantiatedView = new ViewClass();
        }

        const host = window.location.hostname;
        const $body = $("body");

        if(!host.includes("jerzewska.pl")){
            $body.addClass("dev");
            this.eventHandler.addListener("footer a.debugger", (e, args) => {
                e.preventDefault();
                if($body.hasClass("debug")){
                    $body.removeClass("debug");
                }else{
                    $body.addClass("debug");
                }
            });
        }
    }
}

new StartUp();