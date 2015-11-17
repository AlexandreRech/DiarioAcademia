(function () {

    'use strict';
    //using
    signupController.$inject = [
        '$location',
        '$timeout',
        'authService'];

    //signupspace
    angular
        .module('app.auth')
        .controller('signupController', signupController);

    //class
    function signupController($location, $timeout, authService) {
        var vm = this;
        vm.title = "Cadastro";

        //script load
        activate();
        function activate() {
            vm.savedSuccessfully = false;
            vm.message = "";
            vm.registration = {
                userName: "",
                password: "",
                confirmPassword: ""
            };

        }

        //public methods
        vm.signUp = function() {
            authService.saveRegistration(vm.registration)
                .then(successSignup)
                .catch(errorSignup);
        };
        
        //private methods
        var
            successSignup = function () {
                vm.savedSuccessfully = true;
                vm.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                startTimer();
        },
            errorSignup = function(response) {
                var errors = [];
                if (response.data.modelState)
                    for (var key in response.data.modelState) {
                        for (var i = 0; i < response.data.modelState[key].length; i++) {
                            errors.push(response.data.modelState[key][i]);
                        }
                    }
                else
                    for (var i in response.data.errors) {
                        var error = response.data.errors[i];
                        errors.push(error.errorMessage);
                    }
                vm.message = "Failed to register user due to: " + errors.join(' ');
            },
            startTimer = function() {
                var timer = $timeout(function () {
                    $timeout.cancel(timer);
                    $location.path('/login');
                }, 2000);
            }
            ;

    }

})();