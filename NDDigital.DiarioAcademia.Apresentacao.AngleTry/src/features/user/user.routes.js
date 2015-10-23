(function (angular) {
    'use strict';
    var KEYS = angular.injector(['app.common']).get('CONSTANT_KEYS');

    angular
        .module('app.user')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES, 'RouteHelpersProvider'];


    function configRoutes(routes, helper) {
        routes.push({
            name: 'app.user',
            url: '/user',
            'abstract': true,
            redirect: '/user/list',
            templateUrl: 'src/common/templates/components/inner-view.html',
            controller: "shellController as vm",
            displayName: "Usuario"
        },
         {
             name: 'app.user.list',
             url: '/list',
             templateUrl: 'src/features/user/views/manager-user-list.html',
             resolve: helper.resolveFor('managerUserListController'),
             controller: "managerUserListController as vm",
             displayName: "Lista de Usuario",
             $$permissionId: "14"
         },
        {
            name: 'app.user.edit',
            url: '/edit/:userId',
            templateUrl: 'src/features/user/views/manager-user-edit.html',
            resolve: helper.resolveFor('managerUserEditController'),
            controller: "managerUserEditController as vm",
            displayName: "Edição de Usuário",
            $$permissionId: "15"
        }, {
            name: 'app.user.groupEdit',
            url: '/edit/group/:userId',
            resolve: helper.resolveFor('managerUserEditGroupController'),
            templateUrl: 'src/features/user/views/manager-user-edit-group.html',
            controller: "managerUserEditGroupController as vm",
            displayName: "Edição de Grupos de Usuário",
            $$permissionId: "16"
        });

    }

})(window.angular);