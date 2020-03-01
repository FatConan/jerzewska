define("boot", ["jquery", "common/HighLevelEventHandler"],
    function($, HighLevelEventHandler){
        //Set up the event listener
        HighLevelEventHandler.hookup({target: document});

        const host = window.location.hostname;
        const $body = $("body");

        if(!host.includes("jerzewska.pl")){
            $body.addClass("dev");
            window.eventHandler.addListener("footer a.debugger", function(e, args){
                e.preventDefault();
                if($body.hasClass("debug")){
                    $body.removeClass("debug");
                }else{
                    $body.addClass("debug");
                }
            });
        }
    }
);