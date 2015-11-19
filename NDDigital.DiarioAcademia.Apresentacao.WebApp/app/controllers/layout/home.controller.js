﻿(function () {

    'use strict';
    //using
    homeController.$inject = ['$state', '$timeout', 'authService'];

    //namespace
    angular
        .module('controllers.module')
        .controller('homeController', homeController);

    //class
    function homeController($state, $timeout, authService) {
        var vm = this;

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

            vm.loginData = { //Only fot template
                userName: "superadmin",
                password: "174963"
            };

        }

        //public methods
        vm.login = function () {
            authService.login(vm.loginData).then(function () {
                $state.go('app.homeapp');
            },
            function (err) {
                vm.message = "Erro ao logar: " + err.error_description;
            });
        };

        vm.signUp = function () {
            authService.saveRegistration(vm.registration)
                .then(successSignup)
                .catch(errorSignup);
        };

        //private methods
        var successSignup = function () {
            vm.savedSuccessfully = true;
            vm.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
            startTimer();
        };

        var errorSignup = function (response) {
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
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $("#signup").popover('hide');
            }, 2000);

        };
    }

})();