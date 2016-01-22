/* @ngInject */
module.exports = function loginController($rootScope, $state, autheService, SweetAlert, $translate) {
    var vm = this;
   
    activate();
    function activate() {
        vm.app = $rootScope.app;
        vm.loginData = { // only for template
            userName: "superadmin",
            password: "174963"
        };
    }

    //public methods
    vm.login = function () {
        autheService.login(vm.loginData).then(function () {
            $state.go('app.home');
        }).catch(function (err) {
            SweetAlert.swal({
                title: $translate.instant('status.ERROR_LOGIN'),
                text: err.error_description,
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: $translate.instant('action.OK').toUpperCase(),
                closeOnConfirm: true
            });

        });
    }
}