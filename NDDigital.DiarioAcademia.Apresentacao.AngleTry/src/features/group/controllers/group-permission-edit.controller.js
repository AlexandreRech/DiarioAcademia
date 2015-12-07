(function (angular) {
    angular.module('app.group')
        .controller('managerGroupPermissionEditController', managerGroupPermissionEditController);

    managerGroupPermissionEditController.$inject = ['groupService', 'authoService', 'authoUtilFactory',
        '$state', '$stateParams', 'changes.factory', "$translate", "SweetAlert"];

    function managerGroupPermissionEditController(groupService, authoService, authoUtilFactory,
        $state, params, changesFactory, $translate, SweetAlert) {

        var vm = this;

        vm.compareAuthorizations = authoUtilFactory.indexOfAuthorization;
        vm.onchange = onchange;
        vm.save = save;

        vm.authorizations = [];
        vm.hasChange = false;
        vm.changes = [];

        activate();
        function activate() {
            groupService.getGroupById(params.groupId).then(function (results) {
                if (results == undefined)
                    $state.go('app.group.list');
                vm.group = results;

                authoService.getAuthorizations().then(function (results) {
                    vm.authorizations = results;
                });
            });
        }

        //public methods
        function onchange(obj, check) {
            vm.hasChange = true;
            if (!authoUtilFactory.containsByName(vm.changes, obj.name))
                vm.changes.push(obj);
            obj.action = check;
        }

        function save() {
            SweetAlert.swal({
                title: $translate.instant('confirm.CONFIRM_EDIT'),
                text: $translate.instant('confirm.CONFIRM_EDIT_GROUP', { groupname: vm.group.name }),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: $translate.instant('action.OK').toUpperCase(),
                cancelButtonText: $translate.instant('action.CANCEL').toUpperCase(),
                closeOnConfirm: false,
                closeOnCancel: false
            }, actionEdit);
        }

        function saveChanges() {
            vm.hasChange = false;

            if (vm.changes.length != 0) {
                var include = changesFactory.getInclude(vm.changes);
                var exclude = changesFactory.getExclude(vm.changes);

                var needInclude = include.length > 0;
                var needExclude = exclude.length > 0;

                if (needInclude) {

                    return authoService.addAuthorize(vm.group, include).then(function () {
                        if (needExclude) {
                            return authoService.removePermission(vm.group, exclude);
                        }
                    })

                } else if (needExclude) {
                    return authoService.removeAuthorize(vm.group, exclude);
                }
            }
        }

        //private methods
        function actionEdit(isConfirm) {
            if (!isConfirm) {
                SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                                $translate.instant('info.GROUP_NOT_EDITED'), 'error');
                return;
            }
            saveChanges().then(function () {
                SweetAlert.swal($translate.instant('status.SUCCESS'),
                              $translate.instant('info.GROUP_EDITED'), "success");
                $state.go('app.group.list');
            });
        }
    }
})(window.angular);