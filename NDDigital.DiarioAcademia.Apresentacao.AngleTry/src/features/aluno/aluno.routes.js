(function () {
    'use strict';

    angular
        .module('app.aluno')
        .config(configRoutes);

    configRoutes.$inject = ['RouteHelpersProvider', "$stateProvider"];


    function configRoutes(helper, $stateProvider) {

        $stateProvider
         .state('app.aluno', {
             url: '/aluno',
             'abstract': true,
             redirect: '/aluno/list',
             templateUrl: 'src/common/templates/components/inner-view.html',
             resolve: helper.resolveFor('app.aluno')
         })
         .state('app.aluno.list', {
             url: '/list',
             controller: 'alunoListController as vm',
             templateUrl: 'src/features/aluno/views/aluno-list.html',
             authorization: "aluno_list"
         })
          .state('app.aluno.details', {
              url: '/details/:alunoId',
              controller: 'alunoDetailsController as vm',
              templateUrl: 'src/features/aluno/views/aluno-details.html',
              authorization: "aluno_edit"
          })
          .state('app.aluno.create', {
              url: '/create',
              controller: 'alunoCreateController as vm',
              templateUrl: 'src/features/aluno/views/aluno-create.html',
              authorization: "aluno_create"
          });
    }
})();