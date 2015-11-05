(function (angular) {

    'use strict';

    angular.module('app.auth')
       .service('authService', authService);

    authService.$inject = ['$http', '$q', 'localStorageService', 'logger', 'BASEURL',
        'groupService', 'storageKeys', 'resource', 'userService', 'permissions.factory', "$rootScope"];



    function authService($http, $q, localStorageService, logger, serviceBase, groupService,
                            storageKeys, res, userService, permissionFactory, $rootScope) {
        var self = this;

        var redirectState = "home";
        var _username = "";
        var _fullname = "";

        var authentication = {
            isAuth: false,
        };

        var userNameProperty = {
            get: function () {
                return _username;
            },
            set: function (value) {
                _username = value;
            }

        };

        var fullNameProperty = {
            get: function () {
                return _fullname;
            },
            set: function (value) {
                _fullname = value;
            }

        };

        Object.defineProperty(authentication, "userName", userNameProperty);
        Object.defineProperty(authentication, "fullName", fullNameProperty);


        var _lastState = redirectState;

        var authorization = {
            //used for control menus on sidebars
            isAuthorized: function (state) {
                if (!authentication.isAuth)
                    return false;
                if (authorization.isAdmin)
                    return true;
                if (state == "app.home")
                    return true;
                return permissionFactory.containsPermissionByName(authorization.permissions, state);
            },
            role: null
        };

        activate();
        function activate() {
            fillAuthData();
        }

        var saveRegistration = function (registration) {

            logOut();

            return $http.post(serviceBase + 'api/accounts/create/', registration).then(function (response) {
                return response;
            });

        };

        var login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            var deferred = $q.defer();

            var header = { 'Content-Type': 'application/x-www-form-urlencoded' };

            $http.post(serviceBase + 'oauth/token', data, { headers: header }).success(function (response) {
                authentication.isAuth = true;
                authentication.userName = loginData.userName;
                localStorageService.set(storageKeys.authoData, { token: response.access_token });
                userService.getUserByUsername(authentication.userName)
                         .then(function (result) {
                             authentication.fullName = result.fullName;
                             authentication.userId = result.id;
                             authorization.isAdmin = result.isAdmin;
                             authorization.permissions = getPermissions(result.permissions);
                             //criptografar isto
                             localStorageService.set(storageKeys.authoData, {
                                 token: response.access_token,
                                 userName: loginData.userName,
                                 fullName: authentication.fullName,
                                 userId: authentication.userId
                             });
                             $rootScope.$broadcast('login');

                             localStorageService.set(storageKeys.autheData, authorization);
                         });
                logger.success(res.WELCOME + " " + (authentication.userName));
                deferred.resolve(response);

            }).error(function (err, status) {
                if (!status)
                    logger.error(res.UNAVAILABLE_SERVER);
                else
                    logger.error(err.error_description);
                logOut();
                deferred.reject(err);

            });

            return deferred.promise;

        };

        function getPermissions(permissions) {
            var permission, result = [];
            for (var i = 0; i < permissions.length; i++) {
                permission = permissionFactory.getPermissionById(permissions[i].permissionId);
                result.push(permission.name);
            }
            return result;
        }

        var logOut = function () {

            localStorageService.remove(storageKeys.authoData);
            localStorageService.remove(storageKeys.autheData);

            authentication.isAuth = false;
            authentication.userName = "";
            authorization.isAdmin = false;

            authorization.permissions = undefined;

        };

        function fillAuthData() {

            var authoData = localStorageService.get(storageKeys.authoData);
            var autheData = localStorageService.get(storageKeys.autheData);
            if (authoData) {
                authentication.isAuth = true;
                authentication.userName = authoData.userName;
                authentication.fullName = authoData.fullName;
                authentication.userId = authoData.userId;
            }
            if (autheData) {
                authorization.isAdmin = autheData.isAdmin;
                authorization.permissions = autheData.permissions;
            }

        };

        //used for authorize the access to view
        var checkAuthorize = function (toState) {
            if (authorization.isAdmin)
                return true;
            if (toState == "app.home")
                return true;
            if (authorization.permissions)
                return permissionFactory.containsPermissionByName(authorization.permissions, toState);
        };


        self.saveRegistration = saveRegistration;
        self.login = login;
        self.logOut = logOut;
        self.fillAuthData = fillAuthData;
        self.authentication = authentication;
        self.authorization = authorization;
        self.checkAuthorize = checkAuthorize;


        var lastStateProperty = {
            get: function () {
                var value = _lastState;
                _lastState = redirectState;
                return value;
            },
            set: function (value) {
                _lastState = value;
            }

        };

        Object.defineProperty(self, "lastState", lastStateProperty);

    }

})(window.angular);