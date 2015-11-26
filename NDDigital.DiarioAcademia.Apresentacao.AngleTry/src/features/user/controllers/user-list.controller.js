(function (angular) {

    angular
        .module('app.user')
        .controller('managerUserListController', managerUserListController);

    managerUserListController.$inject = ['$scope', 'userService', '$state', "$translate", "SweetAlert"];

    function managerUserListController($scope, managerService, $state, $translate, SweetAlert) {
        var vm = this;
    
        //public methods
        vm.remove = remove;
        vm.edit = edit;


        activate();
        function activate() {
            makeRequest();     
        }

        function makeRequest() {
            managerService.getUsers().then(function (results) {
                vm.users = results;
            });
        }

        function edit(user) {
            if (user)
                $state.go('app.user.edit', { userId: user.id });
        }

       
        function remove(user) {
            vm.user = user;
            SweetAlert.swal({
                title: $translate.instant('confirm.CONFIRM_DELETE'),
                text: $translate.instant('confirm.CONFIRM_DELETE_USER', { username: vm.user.fullName }),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: $translate.instant('action.OK').toUpperCase(),
                cancelButtonText: $translate.instant('action.CANCEL').toUpperCase(),
                closeOnConfirm: false,
                closeOnCancel: false
            }, actionRemove);
        }

        // Private Methods
        function actionRemove(isConfirm) {
            if (!isConfirm) {
                SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                                $translate.instant('info.USER_NOT_DELETED'), 'error');
                return;
            }
            managerService.delete(vm.user).then(function () {
                makeRequest();
                SweetAlert.swal($translate.instant('status.SUCCESS'),
                                $translate.instant('info.USER_DELETED'), "success");
                vm.user = undefined;
            });
        }
    }
})(window.angular);