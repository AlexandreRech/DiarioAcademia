(function (angular) {
    'use strict';
    var KEYS = angular.injector(['app.common']).get('CONSTANT_KEYS');

    angular
        .module('app.group')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES, 'RouteHelpersProvider'];


    function configRoutes(routes, helper) {
        routes.push({
            name: 'app.group',
            url: '/group',
            templateUrl: 'src/common/templates/components/inner-view.html',
            controller: "shellController as vm",
            'abstract': true,
            redirect: '/group/list',
            displayName: "Grupo",
            $$permissionId: "17"
        },
        {
            name: 'app.group.list',
            url: '/list',
            templateUrl: 'src/features/group/views/manager-group-list.html',
            controller: "managerGroupListController as vm",
            resolve: helper.resolveFor('managerGroupListController'),
            displayName: "Lista de Grupo",
            $$permissionId: "18"
        },
        {
            name: 'app.group.create',
            url: '/create/:groupId',
            templateUrl: 'src/features/group/views/manager-group-create.html',
            controller: "managerGroupCreateController as vm",
            resolve: helper.resolveFor('managerGroupCreateController'),
            displayName: "Criação de Grupo",
            $$permissionId: "19"
        },
        {
            name: 'app.group.edit',
            url: '/edit/:groupId',
            templateUrl: 'src/features/group/views/manager-group-edit.html',
            controller: "managerGroupEditController as vm",
            resolve: helper.resolveFor('managerGroupEditController'),
            displayName: "Edição de Grupo",
            $$permissionId: "20"
        }, {
            name: 'app.group.permissionsEdit',
            url: '/group/edit/permissions/:groupId',
            templateUrl: 'src/features/group/views/manager-group-permission-edit.html',
            controller: "managerGroupPermissionEditController as vm",
            resolve: helper.resolveFor('managerGroupPermissionEditController'),
            displayName: "Edição de Permissões de Grupo",
            $$permissionId: "21"
        });
    }

})(window.angular);