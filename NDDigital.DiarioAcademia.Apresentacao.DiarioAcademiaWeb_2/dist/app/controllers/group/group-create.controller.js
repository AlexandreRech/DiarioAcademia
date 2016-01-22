(function (angular) {

    groupCreateController.$inject = ['groupService', '$state'];

    angular.module('controllers.module')
        .controller('groupCreateController', groupCreateController);


    function groupCreateController(groupService, $state) {
        var vm = this;

        //public methods
        vm.save = save;
        vm.setAdmin = setAdmin;
        vm.group = {};

        function save() {
            if (!vm.group.name)
                return;
            groupService.save(vm.group).then(function (results) {
                $state.go('app.group.list');
            });
        }

        function setAdmin() {
            vm.group.isAdmin = !vm.group.isAdmin;
        }

    }

})(window.angular);