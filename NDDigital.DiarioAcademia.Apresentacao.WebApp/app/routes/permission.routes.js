(function (angular) {
    'use strict';
    var KEYS = angular.injector(['common.module']).get('CONSTANT_KEYS');

    angular
        .module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES];

    function configRoutes(routes) {
        routes.push(
        {
            name: 'app.permissions',
            url: '/permissions',
            templateUrl: 'app/views/permission/permission.html',
            controller: "permissionController as vm"
        })
    }

})(window.angular);