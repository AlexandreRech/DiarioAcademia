(function () {

    'use strict';
    //using
    loginController.$inject = ['$state', 'autheService', 'SweetAlert', '$translate'];

    //namespace
    angular
        .module('app.authentication')
        .controller('loginController', loginController);

    //class
    function loginController($state, autheService, SweetAlert, $translate) {
        var vm = this;
   
        //script load
        activate();
        function activate() {
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

})();