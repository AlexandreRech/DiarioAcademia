(function () {
    'use strict';
    var KEYS = angular.injector(['common.module']).get('CONSTANT_KEYS');

    angular
        .module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES];
    function configRoutes(routes) {
        routes.push({
            name: 'app.turma',
            url: '/turma',
            redirect: '/turma/list',
            templateUrl: 'app/templates/components/inner-view.html',
            displayName: "Turma",
            displayIcon: 'fa-university'
        }, {
            name: 'app.turma.list',
            url: '/list',
            controller: 'turmaListCtrl as vm',
            templateUrl: 'app/views/turma/turma-list.html',
            displayName: "Lista de Turmas",
            displayIcon: 'fa-bars'
        }, {
            name: 'app.turma.details',
            url: '/details/:turmaId',
            controller: 'turmaDetailsCtrl as vm',
            templateUrl: 'app/views/turma/turma-details.html',
            displayName: "Detalhes da Turma",
            displayIcon: 'fa-pencil'
        }, {
            name: 'app.turma.create',
            url: '/create',
            controller: 'turmaCreateCtrl as vm',
            templateUrl: 'app/views/turma/turma-create.html',
            displayName: "Criação da Turma",
            displayIcon: 'fa-plus'
        }
);
    }
})();