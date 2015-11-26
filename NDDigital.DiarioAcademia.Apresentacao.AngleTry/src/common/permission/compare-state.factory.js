(function (angular) {
    angular.module("app.permission")
        .factory("compareState", compareState);

    function compareState() {
        return function (array, obj) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].permissionId == obj.permissionId )
                    return i;
            }
            return -1;
        }
    }
})(window.angular);