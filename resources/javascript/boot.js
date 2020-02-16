define("boot", ["common/HighLevelEventHandler"],
    function(HighLevelEventHandler){
        HighLevelEventHandler.hookup({target: document});
    }
);