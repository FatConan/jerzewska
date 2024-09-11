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
            const firstTouch = e.touches[0];
            this.touchX = firstTouch.clientX;
            this.touchY = firstTouch.clientY;
        });
        this.eventHandler.addListenerOnEvent("touchend", "html", (e, args) => {
            this.touchX = null;
            this.touchY = null;
        });
        this.eventHandler.addListenerOnEvent("touchmove", "html", (e, args) => {
            if(this.touchX === null || this.touchY === null){
                return;
            }

            const xTo = e.touches[0].clientX;
            const yTo = e.touches[0].clientY;

            const xDiff = this.touchX - xTo;
            const yDiff = this.touchY - yTo;
            const xDistance = Math.abs(xDiff);
            const yDistance = Math.abs(yDiff);

            if(xDistance > yDistance){
                if(xDiff > 0){
                    this.trigger("touchSwipeLeft", {distance: xDistance});
                }else{
                   this.trigger("touchSwipeRight", {distance: xDistance});
                }
            }else{
                if(yDiff > 0){
                    this.trigger("touchSwipeUp", {distance: yDistance});
                }else{
                   this.trigger("touchSwipeLeft", {distance: yDistance});
                }
            }
            /* reset values */
        });
    }
}