(function(angular) {
    'use strict';

    authInterceptorService.$inject = ['$q', '$location', 'localStorageService','logger'];
    angular
        .module('app.auth')
        .factory('authInterceptorService', authInterceptorService);
    
    function authInterceptorService($q, $location, localStorageService, logger) {
        var authInterceptorFactory = {};
        
        var request = function (config) {

            config.headers = config.headers || {};

            var authoData = localStorageService.get('authorizationData');
            if (authoData) {
                config.headers.Authorization = 'Bearer ' + authoData.token;
            }

            return config;
        };

        var responseError = function (rejection) {
            
            if (!rejection.status) {
                logger.error("Servidor indisponível");
                $location.path('/');
            }

            if (rejection.status === 401) {
                $location.path('/login');
            }
            return $q.reject(rejection);
        };

        authInterceptorFactory.request = request;
        authInterceptorFactory.responseError = responseError;

        return authInterceptorFactory;
    }

})(window.angular);