(function (angular) {
    'use strict';

    angular.module('routes.module').config(configRoutes);

    configRoutes.$inject = ['$stateProvider'];

    function configRoutes($stateProvider) {
        $stateProvider.state('app.authorization', {
            url: '/authorization/claims',
            templateUrl: 'app/views/authorization/claims-list.html',
            controller: "claimListController as vm",
            authorization: "authorization"
        })
    }

})(window.angular);