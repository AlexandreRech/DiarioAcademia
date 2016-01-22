/* @ngInject */
module.exports = function alunoRoutes($stateProvider) {
    $stateProvider
     .state('app.aluno', {
         url: '/aluno',
         'abstract': true,
         redirect: '/aluno/list',
         template: require('../../common/templates/components/inner-view.html'),
         resolve: {
             lazyload: require("ndd-lazy!./aluno.module")
         }
     })
     .state('app.aluno.list', {
         url: '/list',
         template: "<aluno-list></aluno-list>",
         authorization: "aluno_list"
     })
      .state('app.aluno.details', {
          url: '/details/:alunoId',
          template: "<aluno-details></aluno-details>",
          authorization: "aluno_edit"
      })
      .state('app.aluno.create', {
          url: '/create',
          template: "<aluno-create></aluno-create>",
          authorization: "aluno_create"
      });
}