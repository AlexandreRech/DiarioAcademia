(function (angular) {
    angular.module('controllers.module')
        .controller('groupEditController', groupEditController);

    groupEditController.$inject = ['groupService', 'permissionsService', '$state', '$stateParams', 'logger', "$scope"];

    function groupEditController(groupService, permissionsService, $state, $stateParams, log, $scope) {
        var vm = this;
        vm.group = [];
        vm.hasChange = false;;

        vm.setAdmin = setAdmin;
        vm.remove = remove;
        vm.save = save;
        vm.editPermission = editPermission;
       

        activate();
        function activate() {
            if (!$stateParams.groupId) {
                log.error('Grupo não informado !!');
                return;
            }
            makeRequest();
        }

        //public methods
        function setAdmin() {
            vm.hasChange = true;
            vm.group.isAdmin = !vm.group.isAdmin;
        }


        function save() {
            return groupService.edit(vm.group).then(function () {
                vm.hasChange = false;
                $state.go('app.group.list', {}, {reload: true});
            });
        }

        function remove() {
            groupService.delete(vm.group).then(function (results) {
                vm.hasChange = false;
                $state.go('app.group.list', {}, { reload: true });
            });
        }

        //private methods
        function makeRequest() {
            groupService.getGroupById($stateParams.groupId).then(function (results) {
                vm.group = results;
                vm.name = results.name;
            });
        }


        // helpers
        function editPermission() {
            $state.go('app.group.details.permissionsEdit', { groupId: vm.group.id });
        }
    }
})(window.angular);