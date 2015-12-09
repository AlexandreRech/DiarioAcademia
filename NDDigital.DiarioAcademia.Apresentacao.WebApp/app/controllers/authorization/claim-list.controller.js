(function (angular) {
    angular.module('controllers.module')
        .controller('claimListController', claimListController);

    claimListController.$inject = ['claimService', 'authoUtilFactory', 'metadataService',
        'changes.factory', "$translate"];

    function claimListController(claimService, authoUtilFactory, metadataService,
        changesFactory, $translate) {

        var vm = this;

        vm.showClaims = [];
        vm.hasChange = false;
        vm.changes = [];

        vm.compareAuthorization = authoUtilFactory.indexOfAuthorization;
        vm.onchange = onchange;
        vm.saveChanges = saveChanges
        vm.changeClaims = changeClaims;
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
            vm.claims = authoUtilFactory.filterAuthorizations(vm.showClaims);
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
        function changeClaims(isAll, filter) {
            var isShow, index, array = vm.claims[filter];
            for (var i = 0; i < array.length; i++) {
                index = authoUtilFactory.indexOfAuthorization(vm.showClaims, array[i]);
                isShow = index >= 0;
                if (isAll && !isShow) {
                    vm.showClaims.push(array[i]);
                    onchange(array[i], isAll);
                } else if (!isAll && isShow) {
                    vm.showClaims.splice(index, 1);
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
                vm.showClaims = vm.routes.slice();
                vm.claims = authoUtilFactory.filterAuthorizations(vm.showClaims);

                metadataService.getMetaDataClaims().then(function (results) {
                    vm.allClaims = results;
                });
            });
        }

        function saveClaims(array) {
            cleanRepeatedClaims(array, true);
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
            cleanRepeatedClaims(array, false);
            if (array.length == 0)
                return;
            claimService.delete(array).then(makeRequest);
        }

        function cleanRepeatedClaims(array, isSaved) {
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
            if (vm.claims && vm.claims[filter])
                return vm.claims[filter].countSelected == vm.claims[filter].length;
        }

        function modifyAll(action) {
            if (action && vm.showClaims.length == vm.allClaims.length)
                return;
            if (!action && vm.showClaims.length <= 0)
                return;
            var claims, index = 0;
            for (var i = 0; i < vm.allClaims.length; i++) {
                claims = vm.allClaims[i];
                index = authoUtilFactory.indexOfAuthorization(vm.showClaims, claims);
                if (action && index < 0) {
                    vm.showClaims.push(claims);
                    onchange(claims, action);
                } else if (!action && index >= 0) {
                    vm.showClaims.splice(index, 1);
                    onchange(claims, action);
                }
            }
        }


    }
})(window.angular);