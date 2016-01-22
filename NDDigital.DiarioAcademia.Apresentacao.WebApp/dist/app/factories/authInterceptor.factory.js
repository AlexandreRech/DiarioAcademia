(function(angular) {
    'use strict';

    authInterceptorService.$inject = ['$q', '$location', 'localStorageService','logger'];
    angular
        .module('services.module')
        .factory('authInterceptorService', authInterceptorService);
    
    function authInterceptorService($q, $location, localStorageService, logger) {
        var authInterceptorFactory = {};
        
        var request = function (config) {


            config.headers = config.headers || {};

            if (config.ignoreAuth)
                return config;

            var autheData = localStorageService.get('authenticationData');
            if (autheData) {
                config.headers.Authorization = 'Bearer ' + autheData.token;
            }

            return config;
        };

        var responseError = function (rejection) {         
            if (!rejection.status || rejection.status == -1) {
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