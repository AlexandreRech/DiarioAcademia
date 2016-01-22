/* @ngInject */
module.exports = function autheService($http, $q, localStorageService, logger, baseURL, storageKeys, resource, userService, $rootScope, authoFactory) {

    var authentication = {
        isAuth: false
    };

    activate();
    function activate() {
        fillAutheData();
    }

    return {
        saveRegistration: saveRegistration,
        login: login,
        logOut: logOut,
        authentication: authentication,

    }

    //public methods
    function saveRegistration(registration) {
        logOut();
        return $http.post(baseURL + 'api/accounts/create/', registration).then(function (response) {
            return response;
        });
    };

    function login(loginData) {
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password; //criptografar isto
        var deferred = $q.defer();
        var header = { 'Content-Type': 'application/x-www-form-urlencoded' };
        $http.post(baseURL + 'oauth/token', data, { headers: header }).success(function (response) {
            authentication.isAuth = true;
            authentication.userName = loginData.userName;
            authentication.token = response.access_token;
            localStorageService.set(storageKeys.autheData, authentication);

            userService.getUserByUsername(authentication.userName)
                     .then(function (result) {
                         authentication.fullName = result.fullName;
                         authentication.userId = result.id;
                         //set authentication
                         localStorageService.set(storageKeys.autheData, authentication);
                         //set authorization
                         authoFactory.setAutheData(result.isAdmin, result.claims);
                         $rootScope.$broadcast('login');
                         logger.success(resource.WELCOME + " " + (authentication.userName));
                         deferred.resolve(response);
                     });
        }).error(function (err, status) {
            logOut();
            deferred.reject(err);
        });
        return deferred.promise;
    };

    function logOut() {
        localStorageService.remove(storageKeys.autheData);
        authentication.isAuth = false;
        authentication.userName = "";
        authoFactory.clearAuthorize();
    };


    //private methods 
    function fillAutheData() {
        var autheData = localStorageService.get(storageKeys.autheData);
        if (autheData) {
            authentication.isAuth = true;
            authentication.userName = autheData.userName;
            authentication.fullName = autheData.fullName;
            authentication.userId = autheData.userId;
        }
    };
}