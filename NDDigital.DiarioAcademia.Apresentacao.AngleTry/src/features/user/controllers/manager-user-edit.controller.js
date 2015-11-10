(function (angular) {
	angular
		.module('app.user')
		.controller('managerUserEditController', managerUserEditController);

	managerUserEditController.$inject = ['userService', 'groupService', "$stateParams", '$translate', '$state', 'SweetAlert'];

	function managerUserEditController(userService, groupService, params, $translate, $state, SweetAlert) {
		var vm = this;

		vm.user = {};


		//public functions
		vm.clear = clear;
		vm.saveChanges = saveChanges;
		vm.editGroups = editGroups;


		var originalUser;

		activate();
		function activate() {
			userService.getUserById(params.userId).then(function (results) {
				vm.user = results;
				originalUser = $.extend(true, {}, vm.user);
			});
		}

		//public methods
		function editGroups() {
			$state.go('app.user.groupEdit', { userId: vm.user.id });
		}

		function saveChanges() {
			if (vm.formUser.$pristine)
				return;

			SweetAlert.swal({
				title: $translate.instant('confirm.CONFIRM_EDIT'),
				text: $translate.instant('confirm.CONFIRM_EDIT_USER', { username: vm.user.firstName }),
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#DD6B55',
				confirmButtonText: $translate.instant('action.OK').toUpperCase(),
				cancelButtonText: $translate.instant('action.CANCEL').toUpperCase(),
				closeOnConfirm: false,
				closeOnCancel: false
			}, actionEdit);

			
		}

		function clear() {
			vm.user = $.extend(true, {}, originalUser);
		}


	    //private methods

		function actionEdit(isConfirm) {
			if (!isConfirm) {
				SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
								$translate.instant('info.USER_NOT_EDITED'), 'error');
				return;
			}
			userService.edit(vm.user).then(function () {
				SweetAlert.swal($translate.instant('status.SUCCESS'),
							  $translate.instant('info.USER_EDITED'), "success");
				$state.go('app.user.list');
			});
		}
	}
})(window.angular);