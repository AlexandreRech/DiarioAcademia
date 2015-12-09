(function (angular) {
    'use strict';
    var KEYS = angular.injector(['common.module']).get('CONSTANT_KEYS');

    angular .module('routes.module').config(configRoutes);
    configRoutes.$inject = [KEYS.APP_ROUTES];

    function configRoutes(routes) {
        routes.push(
        {
            name: 'app.authorization',
            url: '/authorization/claims',
            templateUrl: 'app/views/authorization/claims-list.html',
            controller: "claimListController as vm"
        })
    }

})(window.angular);