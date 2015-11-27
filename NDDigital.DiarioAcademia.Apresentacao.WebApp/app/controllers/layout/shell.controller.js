(function () {

    'use strict';

    //using
    shellController.$inject = ['$rootScope', '$state', 'autheService', 'authoFactory', 'resource', 'permissions.factory'];

    //namespace
    angular
        .module('controllers.module')
        .controller('shellController', shellController);

    //class
    function shellController($rootScope, $state, autheService, authoFactory, res, permissionFactory) {
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

        self.isAuthorized = function (permission) {
            return self.authorization.isAuthorized(permission);
        };

        self.goToParentState = function (state) {
            var toState = permissionFactory.getByName(self.authorization.permissions, state);
            if (toState)
                $state.go(toState);
        }

        self.isLogged = function () {
            return self.authentication.isAuth;
        }

        //private methods
    }
})();