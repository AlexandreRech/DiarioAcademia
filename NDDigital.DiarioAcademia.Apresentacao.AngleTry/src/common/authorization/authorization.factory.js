(function () {

    'use strict';

    angular.module('app.authorization')
       .service('authoFactory', authoFactory);

    authoFactory.$inject = ['storageKeys', 'localStorageService', 'authoUtilFactory'];

    function authoFactory(storageKeys, localStorageService, authoUtilFactory) {
        var self = this;

        var authorization = {
            isAuthorized: isAuthorized,
            role: null,
            authorizations: []
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
            return authoUtilFactory.containsByName(authorization.authorizations, namePermission);
        }

        function fillAuthoData() {
            var authoData = localStorageService.get(storageKeys.authoData);
            if (authoData) {
                authorization.isAdmin = authoData.isAdmin;
                authorization.authorizations = authoData.authorizations;
            }
        };

        function setAutheData(isAdmin, authorizations) {
            authorization.isAdmin = isAdmin;
            authorization.authorizations = authorizations;
            localStorageService.set(storageKeys.authoData, authorization);  
        }

        function clearAuthorize() {
            localStorageService.remove(storageKeys.authoData);
            authorization.isAdmin = false;
            authorization.authorizations = undefined;
        };
    }

})();

