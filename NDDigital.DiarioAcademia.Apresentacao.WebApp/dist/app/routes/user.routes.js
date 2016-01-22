(function (angular) {
    'use strict';

    angular.module('routes.module').config(configRoutes);

    configRoutes.$inject = ['$stateProvider'];

    function configRoutes($stateProvider) {
        $stateProvider
            .state('app.user', {
                url: '/user',
                'abstract': true,
                redirect: "app.user.list",
                templateUrl: 'app/templates/components/inner-view.html',
                controller: "shellController as vm",
            })
            .state('app.user.list', {
                url: '/user',
                templateUrl: 'app/views/user/user-list.html',
                controller: "userListController as vm",
                authorization: "user_list"
            })
            .state('app.user.details', {
                url: '/details/user/:userId',
                templateUrl: 'app/views/user/user-details.html',
                controller: "userDetailsController as vm",
            })
            .state('app.user.details.summary', {
                url: '/summary/:userId',
                templateUrl: 'app/views/user/user-details-summary.html',
                controller: "userDetailsController as vm",
                authorization: "user_edit"
            })
            .state('app.user.details.groupedit', {
                url: '/groupedit/:userId',
                templateUrl: 'app/views/user/user-details-edit-group.html',
                controller: "userDetailsGroupController as vm",
                authorization: "user_groupedit"
            });
    }

})(window.angular);