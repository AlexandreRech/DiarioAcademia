(function () {
    'use strict';
    var KEYS = angular.injector(['common.module']).get('CONSTANT_KEYS');

    angular
        .module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES];
    function configRoutes(routes) {

        routes.push({
            name: 'home',
            url: '/home',
            controller: 'homeController as vm',
            templateUrl: 'app/views/layout/home.html',
            displayName: "Inicio",
            displayIcon: "fa-home",
            allowAnnonymous: true,
        },
        {
            name: 'app',
            url: '/app',
            'abstract': true,
            templateUrl: 'app/views/layout/app.html',
            allowAnnonymous: true,
        },
        {
            name: 'app.homeapp',
            url: '/homeapp',
            controller: 'homeAppController as vm',
            templateUrl: 'app/views/layout/home-app.html',
            displayName: "Inicio App",
            displayIcon: "fa-home",
            allowAnnonymous: false
        });
    }

})();