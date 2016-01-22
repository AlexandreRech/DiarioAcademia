(function () {
    'use strict';

    var KEYS = angular.injector(['app.common']).get('CONSTANT_KEYS');

    angular
        .module('app.routes')
        .provider('routeConfig', [KEYS.APP_ROUTES, function (routes) {  //Inject 'APP_ROUTES'
            this.$get = function () {
                return routes;
            };
        }]);
})();