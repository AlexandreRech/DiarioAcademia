(function (angular) {
    'use strict';

   angular
        .module('app.authorization')
        .config(configRoutes);

    configRoutes.$inject = ['RouteHelpersProvider', '$stateProvider'];


    function configRoutes(helper, $stateProvider) {
        $stateProvider.state('app.authorization', {
            url: '/authorization/claims',
            templateUrl: 'src/common/authorization/views/claim-list.html',
            controller: "claimListController as vm",
            resolve: helper.resolveFor('app.authorization')
        })
    }

})(window.angular);