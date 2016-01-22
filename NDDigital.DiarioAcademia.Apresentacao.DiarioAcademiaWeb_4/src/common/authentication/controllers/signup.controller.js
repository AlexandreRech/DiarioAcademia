/* @ngInject */
module.exports = function signupController($location, $timeout, $rootScope, autheService) {
    var vm = this;

    activate();
    function activate() {
        vm.app = $rootScope.app;
        vm.title = "Cadastro";
        vm.savedSuccessfully = false;
        vm.message = "";
        vm.registration = {
            userName: "",
            password: "",
            confirmPassword: ""
        };
    }
    return vm;

    //public methods
    vm.signUp = function () {
        autheService.saveRegistration(vm.registration)
            .then(successSignup)
            .catch(errorSignup);
    };

    //private methods
    function successSignup() {
        vm.savedSuccessfully = true;
        vm.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
        startTimer();
    };

    function errorSignup(response) {
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

    function startTimer() {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2000);
    };
}