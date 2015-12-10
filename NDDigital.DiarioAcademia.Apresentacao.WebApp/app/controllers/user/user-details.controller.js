(function (angular) {
	angular
		.module('controllers.module')
		.controller('userDetailsController', userDetailsController);

	userDetailsController.$inject = ['userService', 'groupService', "$stateParams", '$scope', '$state'];

	function userDetailsController(userService, groupService, params, $scope, $state) {
		var vm = this;

		vm.user = {};
		vm.editUser = editUser;

		//public functions
		vm.clear = clear;
		vm.titleModelEdit = 'Confirmar Alteração';
		vm.bodyModelEdit = 'Deseja realmente editar o usuário ';
		vm.editGroups = editGroups;


		var originalUser;

		activate();
		function activate() {
			userService.getUserById(params.userId).then(function (results) {
				vm.user = results;
				originalUser = $.extend(true, {}, vm.user);
				vm.name = vm.user.firstName;
				vm.bodyModelEdit += vm.name;
			});
		}

		//public methods
		function editUser() {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			saveChanges();
		}

		function editGroups() {
		    $state.go('app.user.details.groupedit', { userId: vm.user.id });
		}

		function saveChanges() {
			vm.hasChange = false;
			if (!vm.formUser.$pristine)
				userService.edit(vm.user);
			originalUser = $.extend(true, {}, vm.user);
		}

		function clear() {
			vm.user = $.extend(true, {}, originalUser);
		}
	}
})(window.angular);