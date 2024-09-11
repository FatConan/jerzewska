import {BaseClass} from "malicacid";

export default class SwipeHandler extends BaseClass{
    constructor(){
        super();
        this.touchX = null;
        this.touchY = null;
        this.addListeners();
    }

    addListeners(){
        this.eventHandler.addListenerOnEvent("touchstart", "html", (e, args) => {
            alert("TOUCH START");
            console.log("TOUCH_START", e, args);
        });
        this.eventHandler.addListenerOnEvent("touchmove", "html", (e, args) => {
            alert("TOUCH MOVE");
            console.log("TOUCH_MOVE", e, args);
        });
    }
}