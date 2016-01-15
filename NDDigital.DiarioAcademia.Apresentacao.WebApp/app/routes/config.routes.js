(function () {
    'use strict';

    angular.module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = ['$urlRouterProvider'];
    function configRoutes($urlRouterProvider) {

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go("home");
        });      
    }
})();