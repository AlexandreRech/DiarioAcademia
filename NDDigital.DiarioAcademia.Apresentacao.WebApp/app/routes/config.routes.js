(function () {
    'use strict';

    angular.module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'routeConfigProvider'];
    function configRoutes($stateProvider, $urlRouterProvider, $locationProvider, routeConfigProvider) {
        var routes = routeConfigProvider.$get();

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("home");
        });

        //register all states
        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            $stateProvider
                .state(route.name, {
                    url: route.url,
                    templateUrl: route.templateUrl,
                    controller: route.controller,
                    abstract: route.abstract,
                    data: {
                        displayName: route.displayName,
                        allowAnnonymous: route.allowAnnonymous
                    },
                    ncyBreadcrumb: {
                        label: route.displayName,
                        icon: route.displayIcon,
                    },
                });
            if (route.abstract && route.redirect)
                $urlRouterProvider.when(route.url, route.redirect);
        }

       
    }
})();