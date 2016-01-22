(function (angular) {
    'use strict';
    var KEYS = angular.injector(['common.module']).get('CONSTANT_KEYS');

    angular.module('routes.module').config(configRoutes);

    configRoutes.$inject = ['$stateProvider'];


    function configRoutes($stateProvider) {
        $stateProvider
            .state('app.group', {
                url: '/group',
                'abstract': true,
                redirect: 'app.group.list',
                templateUrl: 'app/templates/components/inner-view.html',
                controller: "shellController as vm"
            })
            .state('app.group.list', {
                url: '/list',
                templateUrl: 'app/views/group/group-list.html',
                controller: "groupListController as vm",
                authorization: "group_list"
            })
            .state('app.group.create', {
                url: '/create/:groupId',
                templateUrl: 'app/views/group/group-create.html',
                controller: "groupCreateController as vm",
                authorization: "group_create"
            })
            .state('app.group.details', {
                url: '/details/:groupId',
                templateUrl: 'app/views/group/group-details.html',
                controller: "groupEditController as vm"
            })
            .state('app.group.details.summary', {
                url: '/summary/:groupId',
                templateUrl: 'app/views/group/group-details-summary.html',
                authorization: "group_edit"
            })
            .state('app.group.details.authoedit', {
                url: '/authoedit/:groupId',
                templateUrl: 'app/views/group/group-details-authorize-edit.html',
                controller: "groupAuthoEditController as vm",
                authorization: "group_authoedit"
            });
    }

})(window.angular);