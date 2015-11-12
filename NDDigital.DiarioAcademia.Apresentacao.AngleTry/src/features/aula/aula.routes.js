(function () {
    'use strict';

    angular
        .module('app.aula')
        .config(configRoutes);

    configRoutes.$inject = ['RouteHelpersProvider', "$stateProvider"];

    function configRoutes(helper, $stateProvider) {

        $stateProvider
            .state('app.aula', {
                url: '/aula',
                redirect: '/aula/list',
                templateUrl: 'src/common/templates/components/inner-view.html',
                displayName: 'Aula',
                resolve: helper.resolveFor('app.aula')
            })
            .state('app.aula.list', {
                url: '/list',
                controller: 'aulaListController as vm',
                templateUrl: 'src/features/aula/views/aula-list.html'
            })
            .state('app.aula.create', {
                url: '/create',
                controller: 'aulaCreateController as vm',
                templateUrl: 'src/features/aula/views/aula-create.html'
            });
    }
})();