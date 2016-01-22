module.exports = function authInterceptorService($q, $location, localStorageService, logger, $translate) {
    return {
        request: request,
        responseError: responseError
    }

    //public methods
    function request(config) {

        config.headers = config.headers || {};

        var autheData = localStorageService.get('authenticationData');
        if (autheData) {
            config.headers.Authorization = 'Bearer ' + autheData.token;
        }
        return config;
    };

    function responseError(rejection) {
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
}