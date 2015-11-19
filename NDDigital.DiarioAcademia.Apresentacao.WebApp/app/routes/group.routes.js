(function (angular) {
    'use strict';
    var KEYS = angular.injector(['common.module']).get('CONSTANT_KEYS');

    angular
        .module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES];

    function configRoutes(routes) {
        routes.push( {
            name: 'app.group',
            url: '/group',
            templateUrl: 'app/templates/components/inner-view.html',
            controller: "shellController as vm"
        },
        {
            name: 'app.group.list',
            url: '/list',
            templateUrl: 'app/views/group/group-list.html',
            controller: "groupListController as vm"
        },
        {
            name: 'app.group.create',
            url: '/create/:groupId',
            templateUrl: 'app/views/group/group-create.html',
            controller: "groupCreateController as vm"
        },
        {
            name: 'app.group.edit',
            url: '/edit/:groupId',
            templateUrl: 'app/views/group/group-edit.html',
            controller: "groupEditController as vm"
        }, {
            name: 'app.group.permissionsEdit',
            url: '/group/edit/permissions/:groupId',
            templateUrl: 'app/views/group/group-permission-edit.html',
            controller: "groupPermissionEditController as vm"
        });
    }

})(window.angular);