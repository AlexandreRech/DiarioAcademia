(function () {
    'use strict';

    angular.module('app.routes')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'routeConfigProvider'];
    function configRoutes($stateProvider, $urlRouterProvider, $locationProvider, routeConfigProvider) {

        $locationProvider.html5Mode(false);

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("app.home");
        });
    }
})();