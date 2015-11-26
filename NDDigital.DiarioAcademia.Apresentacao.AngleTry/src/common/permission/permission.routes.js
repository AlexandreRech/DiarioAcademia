(function (angular) {
    'use strict';

   angular
        .module('app.permission')
        .config(configRoutes);

    configRoutes.$inject = ['RouteHelpersProvider', '$stateProvider'];


    function configRoutes(helper, $stateProvider) {
        $stateProvider.state('app.permission', {
            url: '/permission',
            templateUrl: 'src/common/permission/permission-list.html',
            controller: "managerPermissionController as vm",
            resolve: helper.resolveFor('app.permission')
        })
    }

})(window.angular);