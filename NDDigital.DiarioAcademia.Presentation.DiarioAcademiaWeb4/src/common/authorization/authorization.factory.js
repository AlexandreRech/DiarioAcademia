/* @ngInject */
module.exports = function authoFactory(storageKeys, localStorageService, authoUtilFactory) {
    var authorization = {
        isAuthorized: isAuthorized,
        role: null,
        claims: []
    };

    activate();
    function activate() {
        fillAuthoData();
    }

    return {
        authorization: authorization,
        clearAuthorize: clearAuthorize,
        setAutheData: setAutheData
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
        return authoUtilFactory.containsByName(authorization.claims, namePermission);
    }

    function setAutheData(isAdmin, claims) {
        authorization.isAdmin = isAdmin;
        authorization.claims = claims;
        localStorageService.set(storageKeys.authoData, authorization);
    }

    function clearAuthorize() {
        localStorageService.remove(storageKeys.authoData);
        authorization.isAdmin = false;
        authorization.claims = undefined;
    };

    //private methods
    function fillAuthoData() {
        var authoData = localStorageService.get(storageKeys.authoData);
        if (authoData) {
            authorization.isAdmin = authoData.isAdmin;
            authorization.claims = authoData.claims;
        }
    };
}