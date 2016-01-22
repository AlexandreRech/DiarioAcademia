(function () {
    'use strict';

    angular
        .module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider'];

    function configRoutes($stateProvider) {
        $stateProvider
            .state('app.aula', {
                url: '/aula',
                'abstract': true,
                redirect: 'app.aula.list',
                templateUrl: 'app/templates/components/inner-view.html'
            })
            .state('app.aula.list', {
                url: '/list',
                controller: 'aulaListCtrl as vm',
                templateUrl: 'app/views/aula/aula-list.html',
                authorization: "aula_list"
            })
            .state('app.aula.create', {
                url: '/create',
                controller: 'aulaCreateCtrl as vm',
                templateUrl: 'app/views/aula/aula-create.html',
                authorization: "aula_create"
            });
    }
})();