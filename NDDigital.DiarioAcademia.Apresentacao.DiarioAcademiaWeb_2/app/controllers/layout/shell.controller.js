(function () {

    'use strict';

    //using
    shellController.$inject = ['$state', 'autheService', 'authoFactory', 'resource', 'authoUtilFactory'];

    //namespace
    angular
        .module('controllers.module')
        .controller('shellController', shellController);

    //class
    function shellController($state, autheService, authoFactory, res, authoUtilFactory) {
        var self = this;
        self.authentication = {};

        //script load
        activate();
        function activate() {
            self.authentication = autheService.authentication;
            self.authorization = authoFactory.authorization;
            toastr.options.preventDuplicates = true;
            toastr.options.timeOut = 1200;
            var date = new Date();
            self.year = date.getFullYear();
        }

        //public methods
        self.logOut = function () {
            autheService.logOut();
            $state.go('home');
        };

        self.goToParentState = function (state) {
            var toState = authoUtilFactory.getByName(self.authorization.permissions, state);
            if (toState)
                $state.go(toState);
        }

        self.isLogged = function () {
            return self.authentication.isAuth;
        }

        //private methods
    }
})();