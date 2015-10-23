(function () {
    'use strict';
    var KEYS = angular.injector(['app.common']).get('CONSTANT_KEYS');

    angular
        .module('app.aluno')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES, 'RouteHelpersProvider'];


    function configRoutes(routes, helper) {
        routes.push({
            name: 'app.aluno',
            url: '/aluno',
            'abstract': true,
            redirect: '/aluno/list',
            templateUrl: 'src/common/templates/components/inner-view.html',
            displayName: "Aluno"
        }, {
            name: 'app.aluno.list',
            url: '/list',
            resolve: helper.resolveFor('alunoListCtrl'),
            controller: 'alunoListCtrl as vm',
            templateUrl: 'src/features/aluno/views/aluno-list.html',
            displayName: "Lista de Aluno",
            $$permissionId: "03"
        }, {
            name: 'app.aluno.details',
            url: '/details/:alunoId',
            resolve: helper.resolveFor('alunoDetailsCtrl'),
            controller: 'alunoDetailsCtrl as vm',
            templateUrl: 'src/features/aluno/views/aluno-details.html',
            displayName: "Detalhes do Aluno",
            $$permissionId: "04"
        }, {
            name: 'app.aluno.create',
            url: '/create',
            resolve: helper.resolveFor('alunoCreateCtrl'),
            controller: 'alunoCreateCtrl as vm',
            templateUrl: 'src/features/aluno/views/aluno-create.html',
            displayName: "Criação de Aluno",
            $$permissionId: "05"
        });
    }
})();