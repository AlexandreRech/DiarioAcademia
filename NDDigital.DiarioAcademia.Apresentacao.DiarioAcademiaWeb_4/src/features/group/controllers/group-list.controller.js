/* @ngInject */
module.exports = function groupListController(groupService, $state, $translate, SweetAlert) {
    var vm = this;
    vm.groups = [];

    vm.remove = remove;
    vm.edit = edit;


    activate();
    function activate() {
        makeRequest();
    }

    function makeRequest() {
        groupService.getGroups().then(function (results) {
            vm.groups = results;
        });
    }

    // public methods
    function edit(group) {
        if (!group)
            return;
        $state.go('app.group.edit', { groupId: group.id })
    }

    function remove(group) {
        vm.group = group;

        SweetAlert.swal({
            title: $translate.instant('confirm.CONFIRM_DELETE'),
            text: $translate.instant('confirm.CONFIRM_DELETE_GROUP', { studentName: vm.group.name }),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: $translate.instant('action.OK').toUpperCase(),
            cancelButtonText: $translate.instant('action.CANCEL').toUpperCase(),
            closeOnConfirm: false,
            closeOnCancel: false
        }, actionRemove);
    }

    // private methods
    function actionRemove(isConfirm) {
        if (!isConfirm) {
            SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                            $translate.instant('info.GROUP_NOT_DELETED'), 'error');
            return;
        }
        groupService.delete(vm.group).then(function () {
            makeRequest();
            SweetAlert.swal($translate.instant('status.SUCCESS'),
                            $translate.instant('info.GROUP_DELETED'), "success");
            vm.group = {};
        });
    }

}