(function (angular) {
    'use strict';
    var KEYS = angular.injector(['common.module']).get('CONSTANT_KEYS');

    angular
        .module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES];

    function configRoutes(routes) {
        routes.push({
            name: 'app.manager',
            url: '/manager',
            templateUrl: 'app/views/manager/manager.html',
            redirect: '/manager/user'
        });
    }

})(window.angular);