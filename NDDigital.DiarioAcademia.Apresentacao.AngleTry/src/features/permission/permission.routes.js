(function (angular) {
    'use strict';

   angular
        .module('app.permission')
        .config(configRoutes);

    configRoutes.$inject = ['RouteHelpersProvider', '$stateProvider'];


    function configRoutes(helper, $stateProvider) {
        $stateProvider.state('app.permission', {
            url: '/permission',
            templateUrl: 'src/features/permission/manager-permission.html',
            controller: "managerPermissionController as vm"
        })
    }

})(window.angular);