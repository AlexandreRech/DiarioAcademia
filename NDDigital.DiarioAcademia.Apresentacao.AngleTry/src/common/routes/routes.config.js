(function () {
    'use strict';

    angular.module('app.routes.config', [])
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'routeConfigProvider'];
    function configRoutes($stateProvider, $urlRouterProvider, $locationProvider, routeConfigProvider) {

        $locationProvider.html5Mode(false);

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("app.home");
        });

        var routes = routeConfigProvider.$get();

        //register all states
        //for (var i = 0; i < routes.length; i++) {
        //    var route = routes[i];
        //    $stateProvider
        //        .state(route.name, {
        //            url: route.url,
        //            templateUrl: route.templateUrl,
        //            controller: route.controller,
        //            abstract: route.abstract,
        //            resolve: route.resolve,
        //            data: {
        //                displayName: route.displayName,
        //                allowAnnonymous: route.allowAnnonymous,
        //                $$permissionId: verifyPermission(routes, i, route)
        //            }
        //        });
        //    if (route.abstract)
        //        $urlRouterProvider.when(route.url, route.redirect);
        //}

        //function verifyPermission(routes, startIndex, route) {
        //    var exclude = ['home', 'app.home'];
        //    var errorIdUndefined = " can't have the attribute $$permissionId to be undefined",
        //        errorIdAlreadyExists = " can't have the attribute $$permissionId because already exists";
        //    if (route.abstract)
        //        return;
        //    for (var i = startIndex + 1; i < routes.length; i++) {
        //        var other = routes[i];
        //        if (other.abstract || exclude.contains(other.name))
        //            continue;
        //        if (!other.$$permissionId)
        //            throwRouteError(routes[i].name, errorIdUndefined);
        //        if (other.$$permissionId == route.$$permissionId)
        //            throwRouteError(routes[i].name, errorIdAlreadyExists);
        //    }
        //    return route.$$permissionId;
        //}

        //function throwRouteError(route, msg) {
        //    throw new Error("The route " + route + msg);
        //}

    }
})();