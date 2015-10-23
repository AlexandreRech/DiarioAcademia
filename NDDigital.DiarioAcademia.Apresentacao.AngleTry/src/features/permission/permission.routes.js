(function (angular) {
    'use strict';
    var KEYS = angular.injector(['app.common']).get('CONSTANT_KEYS');

    angular
        .module('app.permission')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES, 'RouteHelpersProvider'];


    function configRoutes(routes, helper) {
        routes.push({
            name: 'app.permission',
            url: '/permission',
            templateUrl: 'src/features/permission/manager-permission.html',
            resolve: helper.resolveFor('managerPermissionController'),
            controller: "managerPermissionController as vm",
            displayName: "Permissões",
            $$permissionId: "22"
        })
    }

})(window.angular);