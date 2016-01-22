/* @ngInject */
module.exports = function authoUtilFactory(metadataService) {

    var authorizations = [];
    var authorizationsGroups = [];

    activate();
    function activate() {
        //Get list of authorizations
        metadataService.getMetaDataClaims().then(function (results) {
            authorizations = results;
        });
    }

    return {
        compareAuthorizations: compareAuthorizations,
        indexOfAuthorization: indexOfAuthorization,
        containsByName: containsByName,
        filterAuthorizations: filterAuthorizations,
        getFilters: getFilters,
        getByName: getByName,
    }

    //public methods
    function compareAuthorizations(array, perm) {
        return indexOfAuthorization(array, perm) >= 0;
    }

    function indexOfAuthorization(array, perm) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].name == perm.name)
                return i;
        }
        return -1;
    }

    function containsByName(authorizationsUser, name) {
        for (var i = 0; i < authorizationsUser.length; i++) {
            if (authorizationsUser[i].name == name)
                return true;
        }
        return false;
    }

    function filterAuthorizations(saved) {
        var result = [];
        var index;
        authorizations.map(function (permission) {
            var filter = permission.filter;
            if (!authorizationsGroups.contains(filter))
                authorizationsGroups.push(filter);
            if (!result[filter])
                result[filter] = [];
            index = indexOfAuthorization(saved, permission);
            if (index >= 0)
                permission.id = saved[index].id;
            result[filter].push(permission);
            if (compareAuthorizations(saved, permission))
                result[filter].countSelected = result[filter].countSelected ? result[filter].countSelected + 1 : 1;
        })
        return result;
    }

    function getByName(name) {
        for (var i = 0; i < authorizations.length; i++) {
            if (authorizations[i].name == name)
                return authorizations[i];
        }
        return undefined;
    }

    function getFilters() {
        return authorizationsGroups;
    }

}