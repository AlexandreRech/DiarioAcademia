(function (angular) {
    'use strict';
    var KEYS = angular.injector(['common.module']).get('CONSTANT_KEYS');

    angular
        .module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES];

    function configRoutes(routes) {
        routes.push({
            name: 'app.user',
            url: '/user',
            templateUrl: 'app/templates/components/inner-view.html',
            controller: "shellController as vm"
        },
         {
             name: 'app.user.list',
             url: '/user',
             templateUrl: 'app/views/user/manager-user-list.html',
             controller: "userListController as vm"
         },
        {
            name: 'app.user.edit',
            url: '/edit/user/:userId',
            templateUrl: 'app/views/user/manager-user-edit.html',
            controller: "userEditController as vm"
        }, {
            name: 'app.user.groupEdit',
            url: '/group/edit/user/:userId',
            templateUrl: 'app/views/user/manager-user-edit-group.html',
            controller: "userEditGroupController as vm"
        });
    }

})(window.angular);