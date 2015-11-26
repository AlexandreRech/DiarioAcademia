(function () {
    angular.module('app.permission')
        .factory('permissions.factory', permissionFactory);

    permissionFactory.$inject = ['$state', 'compareState', 'permissionsService', '$log'];

    function permissionFactory($state, compareState, permissionsService, $log) {

        var permissions = [];
        var permissionGroups = [];


        activate();
        function activate() {
            //Get list of permissions
            permissionsService.getMetaDataPermissions().then(function (results) {
                permissions = results;
            });
        }

        return {
            getPermissions: getPermissions,
            getPermissionById: getPermissionById,
            getFilters: getFilters,
            filterPermissions: filterPermissions,
            containsPermissionByName: containsPermissionByName,
            getByName: getByName,
            getStateByName: getStateByName
        };

        //public methods
        function getPermissions() {
            return permissions; // all permissions
        }


        function getPermissionById(id) {
            for (var i in permissions) {
                if (permissions[i].permissionId == id)
                    return permissions[i];
            }
            return undefined;
        }

        function filterPermissions(permissionDb) {
            var filtered = [];
            var countCheck = 0;
            var filter;
            var permission;

            for (var i in permissions) {
                permission = permissions[i];
                filter = permission.filter;
                if (!filter)
                    continue;
                if (!filtered[filter])
                    filtered[filter] = [];
                filtered[filter].push(permission);
                if (compareState(permissionDb, permission) >= 0)
                    filtered[filter].countSelected = filtered[filter].countSelected ? filtered[filter].countSelected + 1 : 1;
                if (!permissionGroups.contains(filter))
                    permissionGroups.push(filter);
            }
            return filtered;
        }

        function getFilters() {
            return permissionGroups;
        }

        function getByName(permissionsCustom, name) {
            if (!permissionsCustom)
                return undefined;
            for (var i = 0; i < permissionsCustom.length; i++) {
                if (permissionsCustom[i].indexOf(name) >= 0)
                    return permissionsCustom[i];
            }
            return undefined;
        }

        function getStateByName(name) {
            for (var i = 0; i < permissions.length; i++) {
                if (permissions[i].name.indexOf(name) >= 0)
                    return permissions[i];
            }
            return undefined;
        }

        function containsPermissionByName(permissionsCustom, name) {
            return getByName(permissionsCustom, name) != undefined;
        }

    }
})(window.angular);


