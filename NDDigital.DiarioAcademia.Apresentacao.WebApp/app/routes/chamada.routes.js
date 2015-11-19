(function () {
    'use strict';
    var KEYS = angular.injector(['common.module']).get('CONSTANT_KEYS');

    angular
        .module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES];
    function configRoutes(routes) {
        routes.push({
            name: 'app.chamada',
            url: '/chamada',
            'abstract': true,
            redirect: '/chamada/list',
            templateUrl: 'app/templates/components/inner-view.html',
            displayName: 'Chamada',
            displayIcon: 'fa-check'
        }, {
            name: 'app.chamada.create',
            url: '/create',
            controller: 'chamadaCtrl as vm',
            templateUrl: 'app/views/chamada/chamada.html',
            displayName: 'Realizar Chamada',
            displayIcon: 'fa-plus',
            $$permissionId: "11"
        }
);
    }
})();