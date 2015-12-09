(function (angular) {
    angular.module('controllers.module')
        .controller('claimListController', claimListController);

    claimListController.$inject = ['claimService', 'authoUtilFactory', 'metadataService',
        'changes.factory', "$translate"];

    function claimListController(claimService, authoUtilFactory, metadataService,
        changesFactory, $translate) {

        var vm = this;

        vm.showRoutes = [];
        vm.hasChange = false;
        vm.changes = [];

        vm.compareAuthorization = authoUtilFactory.indexOfAuthorization;
        vm.onchange = onchange;
        vm.saveChanges = saveChanges
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


        function saveChanges() {
            vm.hasChange = false;
            if (vm.changes.length == 0)
                return;
            var include = changesFactory.getInclude(vm.changes);
            if (include.length != 0)
                saveClaims(include);
            else {
                var exclude = changesFactory.getExclude(vm.changes);
                if (exclude.length != 0)
                    removeClaims(exclude);
                vm.changes = [];

            }
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
            claimService.getClaims().then(function (results) {
                if (!results)
                    return;
                vm.routes = results;
                vm.showRoutes = vm.routes.slice();
                vm.permission = authoUtilFactory.filterAuthorizations(vm.showRoutes);

                metadataService.getMetaDataClaims().then(function (results) {
                    vm.allPermissions = results;
                });
            });
        }

        function saveClaims(array) {
            cleanRepeatedPermissions(array, true);
            if (array.length == 0)
                return;
            claimService.save(array).then(function () {
                exclude = changesFactory.getExclude(vm.changes);
                if (exclude.length != 0)
                    remove(exclude);
                else
                    makeRequest();
                vm.changes = [];
            });
        }

        function removeClaims(array) {
            cleanRepeatedPermissions(array, false);
            if (array.length == 0)
                return;
            claimService.delete(array).then(makeRequest);
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