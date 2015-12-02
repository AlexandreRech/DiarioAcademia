(function () {
    angular.module('app.permission')
        .factory('permissions.factory', permissionFactory);

    permissionFactory.$inject = ['$state', 'metadataService', '$log'];

    function permissionFactory($state, metadataService, $log) {

        var permissions = [];
        var permissionGroups = [];

        activate();
        function activate() {
            //Get list of permissions
            metadataService.getMetaDataPermissions().then(function (results) {
                permissions = results;
            });
        }

        return {
            getPermissions: getPermissions,
            getFilters: getFilters,
            getByName: getByName,
            containsByName: containsByName,
            filterPermissions: filterPermissions,
            comparePermissions: comparePermissions,
            indexOfPermission: indexOfPermission
        }

        //public methods
        function getPermissions() {
            return permissions;
        }

        function getFilters() {
            return permissionGroups;
        }

        function getByName(name) {
            for (var i = 0; i < permissions.length; i++) {
                if (permissions[i].name == name)
                    return permissions[i];
            }
            return undefined;
        }

        function containsByName(permissionsUser, name) {
            for (var i = 0; i < permissionsUser.length; i++) {
                if (permissionsUser[i].name == name)
                    return true;
            }
            return false;
        }

        function indexOfPermission(array, perm) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].name == perm.name)
                    return i;
            }
            return -1;
        }

        function comparePermissions(array, perm) {
            return indexOfPermission(array, perm) >= 0;
        }

        function filterPermissions(saved) {
            var result = [];
            permissions.map(function (permission) {
                var filter = permission.filter;
                if (!permissionGroups.contains(filter))
                    permissionGroups.push(filter);
                if (!result[filter])
                    result[filter] = [];
                result[filter].push(permission);
                if (comparePermissions(saved, permission))
                    result[filter].countSelected = result[filter].countSelected ? result[filter].countSelected + 1 : 1;
            })
            return result;
        }

    }
})(window.angular);


