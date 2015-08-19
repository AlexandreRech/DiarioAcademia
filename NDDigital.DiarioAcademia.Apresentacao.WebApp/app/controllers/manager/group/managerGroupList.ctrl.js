﻿(function (angular) {
    angular.module('controllers.module')
        .controller('managerGroupListController', managerGroupListController);

    managerGroupListController.$inject = ['groupService', '$state', '$location', '$scope'];

    function managerGroupListController(groupService, $state, $location, $scope) {
        var vm = this;

        vm.groups = [];

        vm.new = save;
        vm.remove = remove;
        vm.showGroup = showGroup;

        vm.newGroup = {};
        vm.creating = false;
        vm.selectedGroup = undefined;

        vm.modal = modal;
        var params = getParams();

        activate();
        function activate() {
            groupService.getGroups().then(function (results) {
                vm.groups = results;
            });
            if (params == "")
                return;
            groupService.getGroupById(parseInt(params)).then(function (results) {
                vm.selectedGroup = results;
            });
        }

        // public methods
        function showGroup(group) {
            $state.go('manager.group.edit', { groupId: group.id });
            vm.selectedGroup = group;
        }

        //actions
        function save() {
            groupService.save(vm.newGroup).then(function (results) {
                vm.creating = false;
                vm.groups.push(results);
                vm.newGroup = {};
            });
        }

        function remove() {
            groupService.delete(vm.selectedGroup).then(function (results) {
                vm.groups.remove(vm.selectedGroup);
                $state.go('manager.group');;
            });
        }

        // helpers
        function modal() {
            vm.titleModalRemove = 'Exclusão';
            vm.bodyModalRemove = 'Remover ' + vm.selectedGroup.name + ' ?';
        }

        function getParams() {
            var path = $location.path().replace('/manager/group', "")
            return path.slice(path.lastIndexOf('/') + 1, path.length);
        }
    }
})(window.angular);