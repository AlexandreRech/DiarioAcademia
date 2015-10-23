(function () {
    'use strict';
    var KEYS = angular.injector(['app.common']).get('CONSTANT_KEYS');

    angular
        .module('app.auth')
        .config(configRoutes);


    configRoutes.$inject = [KEYS.APP_ROUTES, 'RouteHelpersProvider'];

    function configRoutes(routes, helper) {

        routes.push({
            name: 'login',
            url: '/login',
            controller: 'loginController as vm',
            templateUrl: 'src/features/authentication/views/login.html',
            allowAnnonymous: true,
            resolve: helper.resolveFor('loginController'),
            displayName: 'Login',
            $$permissionId: "09"
        }, {
            name: 'signup',
            url: '/signup',
            controller: 'signupController as vm',
            resolve: helper.resolveFor('signupController'),
            templateUrl: 'src/features/authentication/views/signup.html',
            allowAnnonymous: true,
            displayName: "Registre-se",
            $$permissionId: "10"
        });

    }

})();