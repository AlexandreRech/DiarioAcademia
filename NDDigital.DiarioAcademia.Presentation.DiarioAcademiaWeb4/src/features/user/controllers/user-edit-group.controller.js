/* @ngInject */
module.exports = function userEditGroupController(userService, groupService, $stateParams, $translate, SweetAlert, $state) {
    var vm = this;
    vm.hasChange = false;
    vm.changes = [];

    vm.save = save;
    vm.onchange = onchange;

    activate();
    function activate() {
        userService.getUserById($stateParams.userId).then(function (results) {
            vm.user = results;

            groupService.getGroups().then(function (results) {
                vm.groups = results;

                groupService.getGroupByUsername(vm.user.userName).then(function (result) {
                    vm.user.groups = result ? result : [];
                });

            });
        });
    }

    //public methods
    function onchange(obj, check) {
        vm.hasChange = true;
        if (vm.changes.indexOfObject(obj) < 0)
            vm.changes.push(obj);
        obj.action = check;
    }

    function save() {
        SweetAlert.swal({
            title: $translate.instant('confirm.CONFIRM_EDIT'),
            text: $translate.instant('confirm.CONFIRM_EDIT_USER', { username: vm.user.firstName }),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: $translate.instant('action.OK').toUpperCase(),
            cancelButtonText: $translate.instant('action.CANCEL').toUpperCase(),
            closeOnConfirm: false,
            closeOnCancel: false
        }, actionEdit);
    }

    //private methods
    function actionEdit(isConfirm) {
        if (!isConfirm) {
            SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                            $translate.instant('info.USER_NOT_EDITED'), 'error');
            return;
        }
        saveChanges().then(function () {
            SweetAlert.swal($translate.instant('status.SUCCESS'),
                          $translate.instant('info.USER_EDITED'), "success");
            $state.go('app.user.list');
        });
    }

    function saveChanges() {
        var include = [], exclude = [];
        for (var i = 0; i < vm.changes.length; i++) {
            if (vm.changes[i].action)
                include.push(vm.changes[i].id);
            else
                exclude.push(vm.changes[i].id);
        }


        var needInclude = include.length > 0;
        var needExclude = exclude.length > 0;

        if (needInclude) {

            return userService.addUserGroup(vm.user, include).then(function () {

                if (needExclude) {
                    return userService.removeUserGroup(vm.user, exclude);
                }
            })

        } else if (needExclude) {
            return userService.removeUserGroup(vm.user, exclude);
        }
    }
}