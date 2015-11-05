(function (angular) {
    angular.module('app.group')
        .controller('managerGroupPermissionEditController', managerGroupPermissionEditController);

    managerGroupPermissionEditController.$inject = ['groupService', 'permissionsService', 'permissions.factory', 'compareState',
        '$state', '$stateParams', 'changes.factory'];

    function managerGroupPermissionEditController(groupService, permissionsService, permissionsFactory,
        compareState, $state, params, changesFactory) {

        var vm = this;

        //public functions
        vm.comparePermissions = compareState;
        vm.permissions = [];
        vm.modal = modal;
        vm.saveChanges = saveChanges;
        vm.onchange = onchange;
        vm.hasChange = false;
        vm.changes = [];
        vm.redirect = redirect;

        activate();
        function activate() {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });

            groupService.getGroupById(params.groupId).then(function (results) {
                if (results == undefined)
                    $state.go('app.group.list');
                vm.group = results;

                permissionsService.getPermissions().then(function (results) {
                    var permissionsDb = results;
                    for (var i = 0; i < permissionsDb.length; i++) {
                        var permission = permissionsFactory.getPermissionById(permissionsDb[i].permissionId);
                        if (!permission)
                            continue;
                        permission.id = permissionsDb[i].id;
                        vm.permissions.push(permission);
                    }
                });

            });
        }

        function onchange(obj, check) {
            vm.hasChange = true;
            if (compareState(vm.changes, obj) < 0)
                vm.changes.push(obj);
            obj.action = check;
        }

        function saveChanges() {
            vm.hasChange = false;

            if (vm.changes.length != 0) {
                var include = changesFactory.getInclude(vm.changes);
                var exclude = changesFactory.getExclude(vm.changes);

                var needInclude = include.length > 0;
                var needExclude = exclude.length > 0;

                if (needInclude) {

                    save(include).then(function () {

                        if (needExclude) {
                            remove(exclude);
                        }
                    })

                } else if (needExclude) {
                    remove(exclude);
                }


            }
        }

        function save(permission) {
            return groupService.addPermission(vm.group, permission);
        }

        function remove(permission) {
            return groupService.removePermission(vm.group, permission);
        }

        function modal() {
            vm.titleModalEdit = 'Edição';
            vm.bodyModalEdit = 'Editar ' + vm.group.name + ' ?';
        }

        function redirect() {
            $state.go('app.group.edit', { groupId: vm.group.id });
        }
    }
})(window.angular);