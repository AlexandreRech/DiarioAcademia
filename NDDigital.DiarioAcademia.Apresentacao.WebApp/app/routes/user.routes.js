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
            controller: "shellController as vm",
            'abstract': true
        },
         {
             name: 'app.user.list',
             url: '/user',
             templateUrl: 'app/views/user/user-list.html',
             controller: "userListController as vm"
         },
        {
            name: 'app.user.details',
            url: '/details/user/:userId',
            templateUrl: 'app/views/user/user-details.html',
            controller: "userEditController as vm"
        }, {
            name: 'app.user.groupEdit',
            url: '/group/edit/user/:userId',
            templateUrl: 'app/views/user/user-edit-group.html',
            controller: "userEditGroupController as vm"
        });
    }

})(window.angular);