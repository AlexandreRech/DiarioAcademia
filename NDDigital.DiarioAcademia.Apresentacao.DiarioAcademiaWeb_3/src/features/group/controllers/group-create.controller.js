(function (angular) {

    managerGroupCreateController.$inject = ['groupService', '$state', "$translate", "SweetAlert"];

    angular.module('app.group')
        .controller('managerGroupCreateController', managerGroupCreateController);


    function managerGroupCreateController(groupService, $state, $translate, SweetAlert) {
        var vm = this;

        //public methods
        vm.save = save;
        vm.setAdmin = setAdmin;
        vm.group = {};

        function save() {
            if (!vm.group.name)
                return;

            SweetAlert.swal({
                title: $translate.instant('confirm.CONFIRM_CREATE'),
                text: $translate.instant('confirm.CONFIRM_CREATE_GROUP', { groupname: vm.group.name }),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: $translate.instant('action.OK').toUpperCase(),
                cancelButtonText: $translate.instant('action.CANCEL').toUpperCase(),
                closeOnConfirm: false,
                closeOnCancel: false
            }, actionCreate);
        }

        function setAdmin() {
            vm.group.isAdmin = !vm.group.isAdmin;
        }


        //private methods
        function actionCreate(isConfirm) {
            if (!isConfirm) {
                SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                                $translate.instant('info.GROUP_NOT_CREATE'), 'error');
                return;
            }
            groupService.save(vm.group).then(function () {
                SweetAlert.swal($translate.instant('status.SUCCESS'),
                              $translate.instant('info.GROUP_CREATE'), "success");
                $state.go('app.group.list');
            });
        }     
    }

})(window.angular);