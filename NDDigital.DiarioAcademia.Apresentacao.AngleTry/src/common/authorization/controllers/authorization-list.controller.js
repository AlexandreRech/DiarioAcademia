(function (angular) {
    angular.module('app.authorization')
        .controller('authorizationListController', authorizationListController);

    authorizationListController.$inject = ['authoService', 'authoUtilFactory', 'metadataService',
        'changes.factory', "$translate", "SweetAlert"];

    function authorizationListController(authoService, authoUtilFactory, metadataService, 
        changesFactory, $translate, SweetAlert) {

        var vm = this;

        vm.showRoutes = [];
        vm.hasChange = false;
        vm.changes = [];

        vm.compareState = authoUtilFactory.indexOfAuthorization;
        vm.onchange = onchange;
        vm.save = save;
        vm.modifyGroupPermissions = modifyGroupPermissions;
        vm.verifyPanelSuccess = verifyPanelSuccess;
        vm.modifyAll = modifyAll;

        activate();
        function activate() {
            vm.filters = authoUtilFactory.getFilters();
            makeRequest();
        }

        //public methods
        function onchange(obj, check) {
            vm.hasChange = true;
            if (!authoUtilFactory.containsByName(vm.changes, obj.name))
                vm.changes.push(obj);
            obj.action = check;
            vm.permission = authoUtilFactory.filterAuthorizations(vm.showRoutes);
        }

        function save() {
            SweetAlert.swal({
                title: $translate.instant('confirm.CONFIRM_CREATE'),
                text: $translate.instant('confirm.CONFIRM_MODIFY_AUTHORIZATION'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: $translate.instant('action.OK').toUpperCase(),
                cancelButtonText: $translate.instant('action.CANCEL').toUpperCase(),
                closeOnConfirm: true,
                closeOnCancel: true
            }, saveChanges);
        }


        function modifyGroupPermissions(isAll, filter) {
            var isShow, index, array = vm.permission[filter];
            for (var i = 0; i < array.length; i++) {
                index = authoUtilFactory.indexOfAuthorization(vm.showRoutes, array[i]);
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
        function makeRequest() {
            authoService.getAuthorizations().then(function (results) {
                if (!results)
                    return;
                vm.routes = results;
                vm.showRoutes = vm.routes.slice();
                vm.permission = authoUtilFactory.filterAuthorizations(vm.showRoutes);

                metadataService.getMetaDataAuthorization().then(function (results) {
                    vm.allPermissions = results;

                });
            });
        }

        function saveChanges(isConfirm) {
            if (!isConfirm)
                return;
            vm.hasChange = false;
            if (vm.changes.length == 0)
                return;
            var include = changesFactory.getInclude(vm.changes);
            if (include.length != 0)
                savePermission(include);
            else {
                var exclude = changesFactory.getExclude(vm.changes);
                if (exclude.length != 0)
                    remove(exclude);
                vm.changes = [];

            }
        }

        function savePermission(array) {
            cleanRepeatedPermissions(array, true);
            if (array.length == 0)
                return;
            authoService.save(array).then(function () {
                exclude = changesFactory.getExclude(vm.changes);
                if (exclude.length != 0)
                    remove(exclude);
                else
                    makeRequest();
                vm.changes = [];
            });
        }

        function remove(array) {
            cleanRepeatedPermissions(array, false);
            if (array.length == 0)
                return;
            authoService.delete(array).then(makeRequest);
        }

        function cleanRepeatedPermissions(array, isSaved) {
            var index;
            for (var i = 0; i < array.length; i++) {
                index = authoUtilFactory.indexOfAuthorization(vm.routes, array[i]);
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
                index = authoUtilFactory.indexOfAuthorization(vm.showRoutes, permission);
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