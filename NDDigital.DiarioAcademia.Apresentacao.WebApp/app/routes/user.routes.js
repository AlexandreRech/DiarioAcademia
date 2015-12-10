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
            controller: "userDetailsController as vm"
        },
         {
             name: 'app.user.details.summary',
             url: '/summary/:userId',
             templateUrl: 'app/views/user/user-details-summary.html',
             controller: "userDetailsController as vm"
         },
        {
            name: 'app.user.details.groupedit',
            url: '/groupedit/:userId',
            templateUrl: 'app/views/user/user-details-edit-group.html',
            controller: "userDetailsGroupController as vm"
        });




    }

})(window.angular);