(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'LocalStorageModule',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngResource',
            'oitozero.ngSweetAlert',
            //ui-bootstrap
            'ui.bootstrap.collapse',
            'ui.bootstrap.paging',
            'ui.bootstrap.pager',
            'ui.bootstrap.tabs',
            //ui-bootstrap templates
            "uib/template/pager/pager.html",
            "uib/template/tabs/tab.html",
            "uib/template/tabs/tabset.html"
        ])
})();