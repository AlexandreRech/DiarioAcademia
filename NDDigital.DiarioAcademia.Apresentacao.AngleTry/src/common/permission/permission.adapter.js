(function (angular) {
    angular.module("app.permission")
        .factory("permissionAdapter", adapter);

    adapter.$inject = ['permissions.factory'];

    function adapter(permissionsFactory) {
        var factory = {};

        var permissions;

        init();
        function init() {
        }

        //public methods
        factory.toPermission = function (permissionsApi) {
            var result = [];
            var permissions = permissionsFactory.getPermissions();
            if (!permissionsApi || permissionsApi.length == 0)
                return result;
            permissions.map(function (permission) {
                var required = permission.permissionId;
                if ($.isArray(required)) {
                    var valid = validateMultipleRequired(required, permissionsApi);
                    if (valid)
                        result.push(permission);
                } else {
                    for (var i = 0; i < permissionsApi.length; i++) {
                        if (required == permissionsApi[i].permissionId) {
                            result.push(permission);
                            break;
                        }
                    }
                }
            });

            return result;
        }

        //private methods
        function validateMultipleRequired(required, permissionsApi) {
            var result = [];
            for (var i = 0; i < required.length; i++) {
                var valid = false;
                for (var j = 0; j < permissionsApi.length; j++) {
                    if (required[i] == permissionsApi[j].permissionId) {
                        valid = true;
                        break;
                    }
                }
                if (!valid)
                    return false;
            }
            return true;
        }

        return factory;
    }


})(window.angular);