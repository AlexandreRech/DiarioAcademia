(function () {
    'use strict';

    angular.module('routes.module').config(configRoutes);

    configRoutes.$inject = ['$stateProvider'];


    function configRoutes($stateProvider) {
        $stateProvider
            .state({
                name: 'app.turma',
                url: '/turma',
                'abstract': true,
                redirect: '/turma/list',
                templateUrl: 'app/templates/components/inner-view.html',
            })
            .state({
                name: 'app.turma.list',
                url: '/list',
                controller: 'turmaListCtrl as vm',
                templateUrl: 'app/views/turma/turma-list.html',
                authorization: "turma_list"
            })
            .state({
                name: 'app.turma.details',
                url: '/details/:turmaId',
                controller: 'turmaDetailsCtrl as vm',
                templateUrl: 'app/views/turma/turma-details.html',
                authorization: "turma_edit"
            })
            .state({
                name: 'app.turma.create',
                url: '/create',
                controller: 'turmaCreateCtrl as vm',
                templateUrl: 'app/views/turma/turma-create.html',
                authorization: "turma_create"
            });
    }
})();