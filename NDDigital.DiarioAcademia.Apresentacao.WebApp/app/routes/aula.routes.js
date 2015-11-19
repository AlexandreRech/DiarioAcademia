(function () {
    'use strict';
    var KEYS = angular.injector(['common.module']).get('CONSTANT_KEYS');

    angular
        .module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES];
    function configRoutes(routes) {
        routes.push({
            name: 'app.aula',
            url: '/aula',
            redirect: '/aula/list',
            templateUrl: 'app/templates/components/inner-view.html',
            displayName: 'Aula',
            displayIcon: "fa-calendar",
            $$permissionId: "06"
        }, {
            name: 'app.aula.list',
            url: '/list',
            controller: 'aulaListCtrl as vm',
            templateUrl: 'app/views/aula/aula-list.html',
            displayName: 'Lista de Aulas',
            displayIcon: "fa-calendar-check-o",
            $$permissionId: "07"
        }, {
            name: 'app.aula.create',
            url: '/create',
            controller: 'aulaCreateCtrl as vm',
            templateUrl: 'app/views/aula/aula-create.html',
            displayName: 'Criação de Aulas',
            displayIcon: "fa-calendar-plus-o",
            $$permissionId: "08"
        }
);
    }
})();