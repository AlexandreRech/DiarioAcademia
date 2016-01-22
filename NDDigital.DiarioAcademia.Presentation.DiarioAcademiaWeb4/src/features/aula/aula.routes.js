/* @ngInject */
module.exports = function configRoutes($stateProvider) {
    $stateProvider
        .state('app.aula', {
            url: '/aula',
            'abstract': true,
            redirect: '/aula/list',
            resolve: {
                lazyload: require("ndd-lazy!./aula.module")
            },
            template: require('../../common/templates/components/inner-view.html')
        })
        .state('app.aula.list', {
            url: '/list',
            template: '<aula-list></aula-list>',
            authorization: "aula_list"
        })
        .state('app.aula.create', {
            url: '/create',
            template: '<aula-create></aula-create>',
            authorization: "aula_create"
        });
}