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
        function isAuthorized(state) {
            var authentication = localStorageService.get(storageKeys.autheData);
            if (!authentication.isAuth)
                return false;
            if (authorization.isAdmin)
                return true;
            if (state == "app.home")
                return true;
            return permissionFactory.containsPermissionByName(authorization.permissions, state);
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
            authorization.permissions = getPermissions(permissions);
            localStorageService.set(storageKeys.authoData, authorization);  //criptografar isto
        }

        function clearAuthorize() {
            localStorageService.remove(storageKeys.authoData);
            authorization.isAdmin = false;
            authorization.permissions = undefined;
        };

        //private methods
        function getPermissions(permissions) {
            var permission, result = [];
            for (var i = 0; i < permissions.length; i++) {
                permission = permissionFactory.getPermissionById(permissions[i].permissionId);
                result.push(permission.name);
            }
            return result;
        }
    }

})();

