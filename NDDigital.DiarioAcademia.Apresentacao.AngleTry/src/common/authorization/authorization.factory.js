(function () {

    'use strict';

    angular.module('app.authorization')
       .service('authoFactory', authoFactory);

    authoFactory.$inject = ['storageKeys', 'localStorageService', 'permissions.factory'];

    function authoFactory(storageKeys, localStorageService, permissionFactory) {
        var self = this;

        var authorization = {
            isAuthorized: isAuthorized,
            role: null,
            permissions: []
        };


        self.authorization = authorization;
        self.clearAuthorize = clearAuthorize;
        self.setAutheData = setAutheData;

        activate();
        function activate() {
            fillAuthoData();
        }

        //public methods
        function isAuthorized(namePermission) {
            var authentication = localStorageService.get(storageKeys.autheData);
            if (!authentication.isAuth)
                return false;
            if (authorization.isAdmin)
                return true;
            if (namePermission == "app.home")
                return true;
            return permissionFactory.containsByName(authorization.permissions, namePermission);
        }

        function fillAuthoData() {
            var authoData = localStorageService.get(storageKeys.authoData);
            if (authoData) {
                authorization.isAdmin = authoData.isAdmin;
                authorization.permissions = authoData.permissions;
            }
        };

        function setAutheData(isAdmin, permissions) {
            authorization.isAdmin = isAdmin;
            authorization.permissions = permissions;
            localStorageService.set(storageKeys.authoData, authorization);  
        }

        function clearAuthorize() {
            localStorageService.remove(storageKeys.authoData);
            authorization.isAdmin = false;
            authorization.permissions = undefined;
        };
    }

})();

