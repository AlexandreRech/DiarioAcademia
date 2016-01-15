(function (angular) {
    'use strict';

    angular
        .module('app.user')
        .config(configRoutes);

    configRoutes.$inject = ['RouteHelpersProvider', "$stateProvider"];


    function configRoutes(helper, $stateProvider) {

        $stateProvider
            .state('app.user', {
                url: '/user',
                'abstract': true,
                redirect: '/user/list',
                templateUrl: 'src/common/templates/components/inner-view.html',
                controller: "shellController as vm",
            })
            .state('app.user.list', {
                url: '/list',
                templateUrl: 'src/features/user/views/user-list.html',
                controller: "managerUserListController as vm",
                resolve: helper.resolveFor('app.user'),
                authorization: "user_list"
            })
            .state('app.user.edit', {
                url: '/edit/:userId',
                templateUrl: 'src/features/user/views/user-edit.html',
                controller: "managerUserEditController as vm",
                resolve: helper.resolveFor('app.user'),
                authorization: "user_edit"
            })
            .state('app.user.groupEdit', {
                url: '/edit/group/:userId',
                templateUrl: 'src/features/user/views/user-edit-group.html',
                controller: "managerUserEditGroupController as vm",
                resolve: helper.resolveFor('app.user'),
                authorization: "user_groupedit"
            });
    }

})(window.angular);