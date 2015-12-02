(function (angular) {

    'use strict';

    angular.module('app.authentication')
       .service('autheService', autheService);

    autheService.$inject = ['$http', '$q', 'localStorageService', 'logger', 'BASEURL', 'storageKeys',
        'resource', 'userService', "$rootScope", 'authoFactory'];



    function autheService($http, $q, localStorageService, logger, baseURL,
                            storageKeys, res, userService, $rootScope, authoFactory) {
        var self = this;

        var authentication = {
            isAuth: false
        };

        self.saveRegistration = saveRegistration;
        self.login = login;
        self.logOut = logOut;
        self.authentication = authentication;


        activate();
        function activate() {
            fillAutheData();
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
                             authoFactory.setAutheData(result.isAdmin, result.permissions);
                             $rootScope.$broadcast('login');
                             logger.success(res.WELCOME + " " + (authentication.userName));
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

})(window.angular);