(function () {
    'use strict';

    angular
        .module('app.turma')
        .config(configRoutes);

    configRoutes.$inject = ['RouteHelpersProvider', '$stateProvider'];

    function configRoutes(helper, $stateProvider) {

        $stateProvider
           .state('app.turma', {
               url: '/turma',
               redirect: '/turma/list',
               'abstract': true,
               templateUrl: 'src/common/templates/components/inner-view.html',
               resolve: helper.resolveFor('app.turma')
           })
           .state('app.turma.list', {
               url: '/list',
               controller: 'turmaListController as vm',
               templateUrl: 'src/features/turma/views/turma-list.html',
               authorization: "turma_list"
           })
           .state('app.turma.create', {
               url: '/create',
               controller: 'turmaCreateController as vm',
               templateUrl: 'src/features/turma/views/turma-create.html',
               authorization: "turma_create"
           })
           .state('app.turma.details', {
               url: '/details/:turmaId',
               controller: 'turmaDetailsController as vm',
               templateUrl: 'src/features/turma/views/turma-details.html',
               authorization: "turma_edit"
           });
    }
})();