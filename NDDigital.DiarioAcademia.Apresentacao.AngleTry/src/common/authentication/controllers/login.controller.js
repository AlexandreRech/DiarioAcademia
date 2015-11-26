(function () {

    'use strict';
    //using
    loginController.$inject = ['$state', 'autheService'];

    //namespace
    angular
        .module('app.authentication')
        .controller('loginController', loginController);

    //class
    function loginController($state, autheService) {
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
            });
        }
    }

})();