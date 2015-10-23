(function () {
    'use strict';
    var KEYS = angular.injector(['app.common']).get('CONSTANT_KEYS');

    angular
        .module('app.chamada')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES, 'RouteHelpersProvider'];

    function configRoutes(routes, helper) {
        routes.push({
            name: 'app.chamada',
            url: '/create',
            resolve: helper.resolveFor('chamadaCtrl'),
            controller: 'chamadaCtrl as vm',
            templateUrl: 'src/features/chamada/chamada.html',
            displayName: 'Realizar Chamada',
            $$permissionId: "11"
        }
);
    }
})();