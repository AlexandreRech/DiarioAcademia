(function () {
    'use strict';

    angular
        .module('app.chamada')
        .config(configRoutes);

    configRoutes.$inject = ['RouteHelpersProvider', '$stateProvider'];

    function configRoutes(helper, $stateProvider) {
        $stateProvider.state('app.chamada', {
            url: '/create',
            controller: 'chamadaController as vm',
            templateUrl: 'src/features/chamada/chamada.html',
            resolve: helper.resolveFor('app.chamada')
        });
    }
})();