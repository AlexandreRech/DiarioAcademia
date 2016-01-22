(function() {
    'use strict';

    var KEYS = angular.injector(['common.module']).get('CONSTANT_KEYS');

    angular.module('routes.module', ['common.module'])
        .provider('routeConfig', [KEYS.APP_ROUTES, function (routes) {
            this.$get = function () {
                return routes;
            };

        }]);;


})();