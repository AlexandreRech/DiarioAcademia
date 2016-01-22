
(function () {
    'use strict';

    angular
        .module('app.layout')
        .config(configRoutes);

    configRoutes.$inject = ['RouteHelpersProvider', "$stateProvider"];

    function configRoutes(helper, $stateProvider) {

        $stateProvider
            .state("app", {
                url: '/app',
                abstract: true,
                redirect: "app.home",
                templateUrl: 'src/common/layout/views/app.html',
                resolve: helper.resolveFor('icons')
            })
            .state('app.home', {
                name: 'app.home',
                url: '/home',
                title: 'Home',
                templateUrl: 'src/common/layout/views/home.html'
            });
    }
})();