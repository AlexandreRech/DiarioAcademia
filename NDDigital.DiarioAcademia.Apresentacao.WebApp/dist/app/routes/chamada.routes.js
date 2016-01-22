(function () {
    'use strict';

    angular
        .module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider'];


    function configRoutes($stateProvider) {
        $stateProvider.state('app.chamada', {
            url: '/chamada',
            controller: 'chamadaController as vm',
            templateUrl: 'app/views/chamada/chamada.html',
            authorization: "chamada"
        });
    }
})();