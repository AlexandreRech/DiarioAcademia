(function () {

    'use strict';
    //using
    loginController.$inject = ['$state', 'authService'];

    //namespace
    angular
        .module('app.auth')
        .controller('loginController', loginController);

    //class
    function loginController($state, auth) {
        var vm = this;
        vm.title = "Entrar";
        vm.user = "User";


        //script load
        activate();
        function activate() {
            vm.loginData = { // only for template
                userName: "superadmin",
                password: "174963"
            };
            vm.message = "";

        }

        //public methods
        vm.login = function () {
            auth.login(vm.loginData).then(function () {
                $state.go(auth.lastState == "login" || auth.lastState == 'home' ? 'app.home' : auth.lastState);
            },
            function (err) {
                vm.message = "Erro ao logar: " + err.error_description;
            });
        };
    }

})();