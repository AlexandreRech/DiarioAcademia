(function (angular) {
    angular.module('controllers.module')
        .controller('groupListController', groupListController);

    groupListController.$inject = ['groupService', '$state', '$location', '$scope'];

    function groupListController(groupService, $state, $location, $scope) {
        var vm = this;
        var groups = [];
        vm.groups = [];

        vm.showGroup = showGroup;
        vm.edit = edit;
        vm.onClick = onClick;
        vm.onRemove = onRemove;

        vm.newGroup = {};
        vm.creating = false;
        vm.selectedGroup = undefined;

        //angular pagination
        vm.currentPage = 1;
        vm.numPerPage = 4;
        vm.countGroups = 0;
        vm.countTotalGroups = 0;

        activate();
        function activate() {
            makeRequest();
        }

        function makeRequest() {
            groupService.getGroups().then(function (results) {
                groups = results;
                $scope.$watch("vm.currentPage + vm.numPerPage", function () {
                    pagination();
                });
            });
        }

        // public methods
        function showGroup(group) {
            $state.go('app.group.details.summary', { groupId: group.id });
            vm.selectedGroup = group;
        }

        //private methods

        function edit() {
            if (!vm.selectedGroup)
                return;
            $state.go('app.group.details.summary', { groupId: vm.selectedGroup.id })
        }

        function onClick(value) {
            if(value)
                vm.selectedGroup = value;
        }

        function onRemove() {
            groupService.delete(vm.selectedGroup).then(function (results) {
                makeRequest();
                vm.selectedGroup = {};
            });
        }

        // helpers
        function pagination() {
            vm.countTotalGroups = groups.length;
            vm.countGroups = (groups.length / vm.numPerPage) * 10;
            var begin = ((vm.currentPage - 1) * vm.numPerPage)
                   , end = begin + vm.numPerPage;
            vm.groups = groups.slice(begin, end);
        }
    }
})(window.angular);