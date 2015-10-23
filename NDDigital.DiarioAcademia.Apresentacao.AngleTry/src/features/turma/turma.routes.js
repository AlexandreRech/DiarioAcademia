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
            controller: 'turmaListController as vm',
            resolve: helper.resolveFor('turmaListController'),
            templateUrl: 'src/features/turma/views/turma-list.html',
            displayName: "Lista de Turmas",
            $$permissionId: "24"
        }, {
            name: 'app.turma.details',
            url: '/details/:turmaId',
            controller: 'turmaDetailsController as vm',
            resolve: helper.resolveFor('turmaDetailsController'),
            templateUrl: 'src/features/turma/views/turma-details.html',
            displayName: "Detalhes da Turma",
            parents: ["turma.list"],
            $$permissionId: "25"

        }, {
            name: 'app.turma.create',
            url: '/create',
            controller: 'turmaCreateController as vm',
            resolve: helper.resolveFor('turmaCreateController'),
            templateUrl: 'src/features/turma/views/turma-create.html',
            displayName: "Criação da Turma",
            $$permissionId: "26"
        }
);
    }
})();