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
                displayName: "Usuario"
            })
            .state('app.user.list', {
                url: '/list',
                templateUrl: 'src/features/user/views/manager-user-list.html',
                controller: "managerUserListController as vm",
                resolve: helper.resolveFor('app.user')
            })
            .state('app.user.edit', {
                url: '/edit/:userId',
                templateUrl: 'src/features/user/views/manager-user-edit.html',
                controller: "managerUserEditController as vm",
                resolve: helper.resolveFor('app.user')
            })
            .state('app.user.groupEdit', {
                url: '/edit/group/:userId',
                templateUrl: 'src/features/user/views/manager-user-edit-group.html',
                controller: "managerUserEditGroupController as vm",
                resolve: helper.resolveFor('app.user')
            });
    }

})(window.angular);