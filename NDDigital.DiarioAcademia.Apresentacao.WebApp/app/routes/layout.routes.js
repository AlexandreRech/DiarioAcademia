(function () {
    'use strict';

    angular
        .module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider'];

    function configRoutes($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                controller: 'homeController as vm',
                templateUrl: 'app/views/layout/home.html',
                allowAnnonymous: true,
            })
            .state('app', {
                url: '/app',
                'abstract': true,
                redirect: "home",
                templateUrl: 'app/views/layout/app.html',
            })
            .state('app.homeapp', {
                url: '/homeapp',
                controller: 'homeAppController as vm',
                templateUrl: 'app/views/layout/home-app.html',
            });
    }
})();