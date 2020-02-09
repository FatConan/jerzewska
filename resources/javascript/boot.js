define("boot", ["common/HighLevelEventHandler"],
    function(HighLevelEventHandler){
        if(!window.eventHandler){
            window.eventHandler = new HighLevelEventHandler({target: document});
        }
    }
);