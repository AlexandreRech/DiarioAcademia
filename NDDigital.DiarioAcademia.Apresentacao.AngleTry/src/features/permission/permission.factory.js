(function () {
    angular.module('app.permission')
        .factory('permissions.factory', permissionFactory);

    permissionFactory.$inject = ['$state', 'compareState', 'permissionGroups', 'permissionsService', '$log'];

    function permissionFactory($state, compareState, permissionGroups, permissionsService, $log) {

        var permissions = [];

        activate();
        function activate() {
            //Get list of permissions
            permissionsService.getStates().then(function (results) {
                if (!results) {
                    return;
                }
                for (var i = 0; i < results.length; i++) {
                    var permission = {
                        name: results[i].name,
                        displayName: results[i].displayName,
                        permissionId: results[i].id
                    }
                    permissions.push(permission);
                }
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
                filter = getFilter(permission.name);
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

        //private methods
        function getFilter(name) {
            if (permissionGroups.contains(name))
                return name;
            var filter = name.replace("app.", "").split(".");      
            return filter[0];
        }

    }
})(window.angular);


