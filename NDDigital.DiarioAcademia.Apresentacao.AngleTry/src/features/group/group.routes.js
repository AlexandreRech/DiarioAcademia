(function (angular) {
    'use strict';

    angular
        .module('app.group')
        .config(configRoutes);

    configRoutes.$inject = ['RouteHelpersProvider', "$stateProvider"];


    function configRoutes(helper, $stateProvider) {

        $stateProvider
            .state('app.group', {
                url: '/group',
                templateUrl: 'src/common/templates/components/inner-view.html',
                controller: "shellController as vm",
                'abstract': true,
                redirect: '/group/list'
            })
            .state('app.group.list', {
                url: '/list',
                templateUrl: 'src/features/group/views/group-list.html',
                controller: "managerGroupListController as vm",
                resolve: helper.resolveFor('app.group')
            })
            .state('app.group.create', {
                url: '/create/:groupId',
                templateUrl: 'src/features/group/views/group-create.html',
                controller: "managerGroupCreateController as vm",
                resolve: helper.resolveFor('app.group')
            })
            .state('app.group.edit', {
                url: '/edit/:groupId',
                templateUrl: 'src/features/group/views/group-edit.html',
                controller: "managerGroupEditController as vm",
                resolve: helper.resolveFor('app.group')
            })
            .state('app.group.permissionsEdit', {
                url: '/group/edit/permissions/:groupId',
                templateUrl: 'src/features/group/views/group-permission-edit.html',
                controller: "managerGroupPermissionEditController as vm",
                resolve: helper.resolveFor('app.group')
            })
    }

})(window.angular);