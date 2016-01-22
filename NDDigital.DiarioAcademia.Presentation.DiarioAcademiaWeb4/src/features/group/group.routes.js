/* @ngInject */
module.exports = function configRoutes($stateProvider) {
    $stateProvider
        .state('app.group', {
            url: '/group',
            template: require('../../common/templates/components/inner-view.html'),
            'abstract': true,
            redirect: '/group/list',
            require: {
                lazyload: require("ndd-lazy!./group.module")
            }
        })
        .state('app.group.list', {
            url: '/list',
            template: "<group-list></group-list>",
            authorization: "group_list"
        })
        .state('app.group.create', {
            url: '/create/:groupId',
            template: "<group-create></group-create>",
            authorization: "group_create"
        })
        .state('app.group.edit', {
            url: '/edit/:groupId',
            template: "<group-edit></group-edit>",
            authorization: "group_edit"
        })
        .state('app.group.permissionsEdit', {
            url: '/edit/permissions/:groupId',
            template: "<group-edit-permission></group-edit-permission>",
            authorization: "group_permissionsedit"
        });
}