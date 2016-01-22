(function (angular) {

    angular
        .module('controllers.module')
        .controller('userListController', userListController);

    userListController.$inject = ['$scope', 'userService', '$state'];

    function userListController($scope, managerService, $state) {
        var vm = this;
        var users = [];

      
        //public methods
        vm.edit = edit;
        vm.remove = remove;
        vm.modal = modal;
        vm.cbRemove = cbRemove;
        vm.onClick = onClick;

        //angular pagination
        vm.currentPage = 1;
        vm.numPerPage = 10;
        vm.maxSize = 4;
        vm.countUsers = 0;

        activate();
        function activate() {
            makeRequest();     
        }

        function makeRequest() {
            managerService.getUsers().then(function (results) {
                users = results;
                vm.countUsers = users.length;

                $scope.$watch("vm.currentPage + vm.numPerPage", function () {
                    var begin = ((vm.currentPage - 1) * vm.numPerPage)
                    , end = begin + vm.numPerPage;
                    vm.users = users.slice(begin, end);
                });
            });
        }


        function edit() {
            if (vm.selectedUser)
                $state.go('app.user.details.summary', { userId: vm.selectedUser.id });
        }

       
        function cbRemove() {
            if (!vm.selectedUser)
                return;
            vm.modal(vm.selectedUser);
            $("#modelRemoveUser").modal();
        }

        function onClick(value) {
            vm.selectedUser = value;
        }

        function remove() {
            managerService.delete(vm.user).then(function (results) {
                makeRequest();
                vm.user = undefined;
            });
        }

        function modal(user) {
            vm.user = user;
            vm.titleModelRemove = 'Exclusão';
            vm.bodyModelRemove = 'Remover ' + user.fullName + ' (' + user.userName + ') ?'
        }

    }
})(window.angular);