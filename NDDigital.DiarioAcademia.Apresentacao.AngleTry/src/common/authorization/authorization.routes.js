(function (angular) {
    'use strict';

   angular
        .module('app.authorization')
        .config(configRoutes);

    configRoutes.$inject = ['RouteHelpersProvider', '$stateProvider'];


    function configRoutes(helper, $stateProvider) {
        $stateProvider.state('app.authorization', {
            url: '/authorization',
            templateUrl: 'src/common/authorization/views/authorization-list.html',
            controller: "authorizationListController as vm",
            resolve: helper.resolveFor('app.authorization')
        })
    }

})(window.angular);