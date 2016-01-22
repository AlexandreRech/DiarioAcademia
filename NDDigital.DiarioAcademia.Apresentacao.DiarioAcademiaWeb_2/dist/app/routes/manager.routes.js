(function (angular) {
    'use strict';

    angular.module('routes.module').config(configRoutes);

    configRoutes.$inject = ['$stateProvider'];


    function configRoutes($stateProvider) {
        $stateProvider.state({
            name: 'app.manager',
            url: '/manager',
            templateUrl: 'app/views/manager/manager.html'
        });
    }

})(window.angular);