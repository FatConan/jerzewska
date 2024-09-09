requirejs(["../build"], function(){
    'use strict';
    boot(["jquery", "domReady", "./common/Galleria"], function ($, domReady, Galleria) {
        domReady(function(){
            new Galleria();
        });
    });
});