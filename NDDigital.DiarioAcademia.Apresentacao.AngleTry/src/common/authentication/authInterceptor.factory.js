(function(angular) {
    'use strict';

    authInterceptorService.$inject = ['$q', '$location', 'localStorageService', 'logger', '$translate'];
    angular
        .module('app.authentication')
        .factory('authInterceptorService', authInterceptorService);
    
    function authInterceptorService($q, $location, localStorageService, logger, $translate) {
        var authInterceptorFactory = {};
        
        var request = function (config) {

            config.headers = config.headers || {};

            var autheData = localStorageService.get('authenticationData');
            if (autheData) {
                config.headers.Authorization = 'Bearer ' + autheData.token;
            }
            return config;
        };

        var responseError = function (rejection) {       
            if (!rejection.status || rejection.status == -1) {
                logger.warning($translate.instant('status.NOT_AVAILABLE'));
                $location.path('/');
            }

            if (rejection.status === 401) {
                logger.warning($translate.instant('status.UNAUTHORIZED'));
                $location.path('/login');
                return $q.reject();
            }
            return $q.reject(rejection);
        };

        authInterceptorFactory.request = request;
        authInterceptorFactory.responseError = responseError;

        return authInterceptorFactory;
    }

})(window.angular);