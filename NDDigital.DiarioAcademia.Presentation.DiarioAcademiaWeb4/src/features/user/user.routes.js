/* @ngInject */
module.exports = function configRoutes($stateProvider) {

    $stateProvider
        .state('app.user', {
            url: '/user',
            'abstract': true,
            redirect: '/user/list',
            template: require('../../common/templates/components/inner-view.html'),
           
        })
        .state('app.user.list', {
            url: '/list',
            template: '<user-list></user-list>',
            authorization: "user_list"
        })
        .state('app.user.edit', {
            url: '/edit/:userId',
            template: '<user-details></user-details>',
            authorization: "user_edit"
        })
        .state('app.user.groupEdit', {
            url: '/edit/group/:userId',
            template: '<user-groupedit></user-groupedit>',
            authorization: "user_groupedit"
        });
}