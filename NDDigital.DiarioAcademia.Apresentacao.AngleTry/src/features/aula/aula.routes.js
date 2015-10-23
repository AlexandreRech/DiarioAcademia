(function () {
    'use strict';
    var KEYS = angular.injector(['app.common']).get('CONSTANT_KEYS');

    angular
        .module('app.aula')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES, 'RouteHelpersProvider'];

    function configRoutes(routes, helper) {
        routes.push({
            name: 'app.aula',
            url: '/aula',
            redirect: '/aula/list',
            templateUrl: 'src/common/templates/components/inner-view.html',
            displayName: 'Aula',
            $$permissionId: "06"
        }, {
            name: 'app.aula.list',
            url: '/list',
            controller: 'aulaListCtrl as vm',
            templateUrl: 'src/features/aula/views/aula-list.html',
            resolve: helper.resolveFor('aulaListCtrl'),
            displayName: 'Lista de Aulas',
            $$permissionId: "07"
        }, {
            name: 'app.aula.create',
            url: '/create',
            controller: 'aulaCreateCtrl as vm',
            templateUrl: 'src/features/aula/views/aula-create.html',
            resolve: helper.resolveFor('aulaCreateCtrl'),
            displayName: 'Criação de Aulas',
            $$permissionId: "08"
        });
    }
})();