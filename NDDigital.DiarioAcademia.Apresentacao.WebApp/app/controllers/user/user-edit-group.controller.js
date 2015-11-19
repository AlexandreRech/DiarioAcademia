(function (angular) {

    angular.module('controllers.module')
        .controller('userEditGroupController', userEditGroupController);

    userEditGroupController.$inject = ['userService', 'groupService', "$stateParams"];


    function userEditGroupController(userService, groupService, $stateParams) {
        var vm = this;
        vm.hasChange = false;
        vm.changes = [];

        vm.saveChanges = saveChanges;
        vm.onchange = onchange;
        vm.modal = modal;

        activate();
        function activate() {
            userService.getUserById($stateParams.userId).then(function (results) {
                vm.user = results;              
                originalUser = $.extend(true, {}, vm.user);
                vm.name = vm.user.firstName;
                vm.bodyModelEdit += vm.name;

                groupService.getGroups().then(function (results) {
                    vm.groups = results;
                    if (results)
                        originalGroups = results.slice();


                    groupService.getGroupByUsername(vm.user.userName).then(function (result) {
                        vm.user.groups = result ? result : [];
                    });
                });
            });
        }

        function onchange(obj, check) {
            vm.hasChange = true;
            if (vm.changes.indexOfObject(obj) < 0)
                vm.changes.push(obj);
            obj.action = check;
        }


        function modal(){
            vm.titleModelEdit = "Edição de Grupos de Usuário";
            vm.bodyModelEdit = "Deseja realmente editar os grupos de " + vm.user.firstName + "? ";
        }

        function saveChanges() {
            vm.hasChange = false;
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

                userService.addUserGroup(vm.user, include).then(function () {

                    if (needExclude) {
                        userService.removeUserGroup(vm.user, exclude);
                    }
                })

            } else if (needExclude) {
                userService.removeUserGroup(vm.user, exclude);
            }


        }

    }

})(window.angular);