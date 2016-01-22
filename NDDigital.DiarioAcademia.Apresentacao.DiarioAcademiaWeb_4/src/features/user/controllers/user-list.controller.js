/* @ngInject */
module.exports = function userListController($scope, userService, $state, $translate, SweetAlert) {
    var vm = this;

    vm.remove = remove;
    vm.edit = edit;

    activate();
    function activate() {
        makeRequest();
    }

    //public methods
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

    // private Methods
    function makeRequest() {
        userService.getUsers().then(function (results) {
            vm.users = results;
        });
    }

    function actionRemove(isConfirm) {
        if (!isConfirm) {
            SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                            $translate.instant('info.USER_NOT_DELETED'), 'error');
            return;
        }
        userService.delete(vm.user).then(function () {
            makeRequest();
            SweetAlert.swal($translate.instant('status.SUCCESS'),
                            $translate.instant('info.USER_DELETED'), "success");
            vm.user = undefined;
        });
    }
}