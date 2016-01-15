(function () {
    'use strict';

    angular
        .module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider'];


    function configRoutes($stateProvider) {
        $stateProvider.state('app.aluno', {
            url: '/aluno',
            'abstract': true,
            redirect: '/aluno/list',
            templateUrl: 'app/templates/components/inner-view.html'
        })
        .state('app.aluno.list', {
            url: '/list',
            controller: 'alunoListCtrl as vm',
            templateUrl: 'app/views/aluno/aluno-list.html',
            authorization: "aluno_list"
        })
        .state('app.aluno.details', {
            url: '/details/:alunoId',
            controller: 'alunoDetailsCtrl as vm',
            templateUrl: 'app/views/aluno/aluno-details.html',
            authorization: "aluno_edit"
        })
        .state('app.aluno.create', {
            url: '/create',
            controller: 'alunoCreateCtrl as vm',
            templateUrl: 'app/views/aluno/aluno-create.html',
            authorization: "aluno_create"
        });
    }
})();