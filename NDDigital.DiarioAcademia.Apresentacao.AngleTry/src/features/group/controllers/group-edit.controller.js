(function (angular) {
    angular.module('app.group')
        .controller('managerGroupEditController', managerGroupEditController);

    managerGroupEditController.$inject = ['groupService', '$state', '$stateParams', 'logger',  "$translate", "SweetAlert"];

    function managerGroupEditController(groupService, $state, $stateParams, log, $translate, SweetAlert) {
        var vm = this;
        vm.group = [];
        vm.hasChange = false;;

        vm.setAdmin = setAdmin;
        vm.save = save;
        vm.editPermission = editPermission;
       

        activate();
        function activate() {
            if (!$stateParams.groupId) {
                log.error('Grupo não informado !!');
                return;
            }
            groupService.getGroupById($stateParams.groupId).then(function (results) {
                vm.group = results;
                vm.name = results.name;
            });
        }

        // public methods
        function setAdmin() {
            vm.hasChange = true;
            vm.group.isAdmin = !vm.group.isAdmin;
            $('[data-toggle="tooltip"]').tooltip('hide').tooltip();
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

        function editPermission() {
            $state.go('app.group.permissionsEdit', { groupId: vm.group.id });
        }

        //private methods
        function actionEdit(isConfirm) {
            if (!isConfirm) {
                SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                                $translate.instant('info.GROUP_NOT_EDITED'), 'error');
                return;
            }
            groupService.edit(vm.group).then(function () {
                SweetAlert.swal($translate.instant('status.SUCCESS'),
                              $translate.instant('info.GROUP_EDITED'), "success");
                $state.go('app.group.list');
            });
        }
    }
})(window.angular);