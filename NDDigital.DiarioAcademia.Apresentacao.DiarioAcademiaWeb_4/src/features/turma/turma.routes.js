/* @ngInject */
module.exports = function configRoutes($stateProvider) {

    $stateProvider
       .state('app.turma', {
           url: '/turma',
           redirect: '/turma/list',
           'abstract': true,
           template: require("../../common/templates/components/inner-view.html"),
           resolve: {
               lazyload: require("ndd-lazy!./turma.module")
           },
       })
       .state('app.turma.list', {
           url: '/list',
           template: '<turma-list></turma-list>',        
           authorization: "turma_list"
       })
       .state('app.turma.create', {
           url: '/create',
           template: '<turma-create></turma-create>',
           authorization: "turma_create"
       })
       .state('app.turma.details', {
           url: '/details/:turmaId',
           template: '<turma-details></turma-details>',
           authorization: "turma_edit"
       });
}