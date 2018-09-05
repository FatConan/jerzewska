requirejs(["build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "./portfolio/PortfolioImageViewer", "jquery-fancybox"], function ($, domReady, PortfolioImageViewer) {
        domReady(function(){
            new PortfolioImageViewer();
        });
    });
});