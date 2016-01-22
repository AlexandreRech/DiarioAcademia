(function (angular) {
    angular.module('controllers.module')
        .controller('groupAuthoEditController', groupAuthoEditController);

    groupAuthoEditController.$inject = ['groupService', '$state', '$stateParams', 'changes.factory',
        'authoUtilFactory', 'claimService', 'authoService'];

    function groupAuthoEditController(groupService, $state, params, changesFactory,
        authoUtilFactory, claimService, authoService) {

        var vm = this;

        //public functions
        vm.compareAuthorizations = authoUtilFactory.indexOfAuthorization;
        vm.permissions = [];
        vm.saveChanges = saveChanges;
        vm.onchange = onchange;
        vm.changes = [];
        vm.redirect = redirect;
        vm.hasChange = false;

        activate();
        function activate() {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });

            groupService.getGroupById(params.groupId).then(function (results) {
                if (results == undefined)
                    $state.go('app.group.list');
                vm.group = results;

                claimService.getClaims().then(function (results) {
                    vm.claims = results;
                });
            });
        }

        function onchange(obj, check) {
            vm.hasChange = true;
            if (!authoUtilFactory.compareAuthorizations(vm.changes, obj))
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
                    save(include, exclude)
                } else if (needExclude) {
                    remove(exclude);
                }
            }
        }

        function save(authorizations, exclude) {
            authoService.addAuthorize(vm.group, authorizations).then(function () {
                if (exclude.length > 0) {
                    remove(exclude);
                }
            });
        }

        function remove(authorizations) {
            return authoService.removeAuthorize(vm.group, authorizations);
        }

        function redirect() {
            $state.go('app.group.details', { groupId: vm.group.id });
        }
    }
})(window.angular);