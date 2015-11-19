(function (angular) {
    angular.module('controllers.module')
        .controller('permissionController', permissionController);

   permissionController.$inject = ['permissionsService', 'comparePermission', 'permissions.factory', '$state', '$rootScope', 'changes.factory'];

   function permissionController(permissionService, comparePermission, permissionsFactory, $state, $rootScope, changesFactory) {
        var vm = this;

        vm.filters = permissionsFactory.getFilters();
        vm.showRoutes = [];
        vm.hasChange = false;
        vm.changes = [];

        vm.comparePermission = comparePermission;
        vm.onchange = onchange;
        vm.saveChanges = saveChanges;
        vm.modifyGroupPermissions = modifyGroupPermissions;
        vm.verifyPanelSuccess = verifyPanelSuccess;
        vm.modifyAll = modifyAll;

        activate();
        function activate() {
            permissionService.getPermissions().then(function (results) {
                if (!results)
                    return;
                vm.routes = results;
                vm.showRoutes = vm.routes.slice();
                vm.permission = permissionsFactory.filterPermissions(vm.showRoutes);
                vm.allPermissions = permissionsFactory.getPermissions();

            });
        }

        //public methods
        function onchange(obj, check) {
            vm.hasChange = true;
            if (comparePermission(vm.changes, obj) < 0)
                vm.changes.push(obj);
            obj.action = check;
            vm.permission = permissionsFactory.filterPermissions(vm.showRoutes);
        }

        function saveChanges() {
            vm.hasChange = false;
            if (vm.changes.length == 0)
                return;
            var include = changesFactory.getInclude(vm.changes),
                exclude = changesFactory.getExclude(vm.changes);
            if (include.length != 0)
                save(include);
            if (exclude.length != 0)
                remove(exclude);
            vm.changes = [];
        }

        function modifyGroupPermissions(isAll, filter) {
            var isShow, index, array = vm.permission[filter];
            for (var i = 0; i < array.length; i++) {
                index = comparePermission(vm.showRoutes, array[i]);
                isShow = index >= 0;
                if (isAll && !isShow) {
                    vm.showRoutes.push(array[i]);
                    onchange(array[i], isAll);

                } else if (!isAll && isShow) {
                    vm.showRoutes.splice(index, 1);
                    onchange(array[i], isAll);
                }
            }
        }

        // private methods
        function save(array) {
            cleanRepeatedPermissions(array, true);
            if (array.length == 0)
                return;
            permissionService.save(array).then(function (results) {
                    vm.routes = vm.routes.concat(results);
                    vm.permission = permissionsFactory.filterPermissions(vm.showRoutes);
                });
        }

        function remove(array) {
            cleanRepeatedPermissions(array, false);
            if (array.length == 0)
                return;
            permissionService.delete(array);
        }

        function cleanRepeatedPermissions(array, isSaved) {
            var index;
            for (var i = 0; i < array.length; i++) {
                index = comparePermission(vm.routes, array[i]);
                if (isSaved ? index >= 0 : index < 0) {
                    array.splice(i, 1);
                    i--;
                }
            }
        }
 
        //GUI Helpers 
        function verifyPanelSuccess(filter) {
            if (vm.permission && vm.permission[filter])
                return vm.permission[filter].countSelected == vm.permission[filter].length;
        }

        function modifyAll(action) {
            if (action && vm.showRoutes.length == vm.allPermissions.length)
                return;
            if (!action && vm.showRoutes.length <= 0)
                return;
            var permission, index = 0;
            for (var i = 0; i < vm.allPermissions.length; i++) {
                permission = vm.allPermissions[i];
                index = comparePermission(vm.showRoutes, permission);
                if (action && index < 0) {
                    vm.showRoutes.push(permission);
                    onchange(permission, action);
                } else if (!action && index >= 0) {
                    vm.showRoutes.splice(index, 1);
                    onchange(permission, action);
                }
            }
        }
    }
})(window.angular);