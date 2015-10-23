(function () {
    'use strict';
    var KEYS = angular.injector(['app.common']).get('CONSTANT_KEYS');

    angular
        .module('app.turma')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES, 'RouteHelpersProvider'];

    function configRoutes(routes, helper) {
        routes.push({
            name: 'app.turma',
            url: '/turma',
            redirect: '/turma/list',
            templateUrl: 'src/common/templates/components/inner-view.html',
            displayName: "Turma",
            $$permissionId: "23"
        }, {
            name: 'app.turma.list',
            url: '/list',
            controller: 'turmaListCtrl as vm',
            resolve: helper.resolveFor('turmaListCtrl'),
            templateUrl: 'src/features/turma/views/turma-list.html',
            displayName: "Lista de Turmas",
            $$permissionId: "24"
        }, {
            name: 'app.turma.details',
            url: '/details/:turmaId',
            controller: 'turmaDetailsCtrl as vm',
            resolve: helper.resolveFor('turmaDetailsCtrl'),
            templateUrl: 'src/features/turma/views/turma-details.html',
            displayName: "Detalhes da Turma",
            parents: ["turma.list"],
            $$permissionId: "25"

        }, {
            name: 'app.turma.create',
            url: '/create',
            controller: 'turmaCreateCtrl as vm',
            resolve: helper.resolveFor('turmaCreateCtrl'),
            templateUrl: 'src/features/turma/views/turma-create.html',
            displayName: "Criação da Turma",
            $$permissionId: "26"
        }
);
    }
})();