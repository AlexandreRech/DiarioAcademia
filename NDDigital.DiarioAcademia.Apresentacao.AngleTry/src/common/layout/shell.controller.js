(function () {

    'use strict';

    //using
    shellController.$inject = ['$rootScope', '$state', 'autheService', 'authoFactory'];

    //namespace
    angular
        .module('app.layout')
        .controller('shellController', shellController);

    //class
    function shellController($rootScope, $state, autheService, authoFactory) {
        var self = this;
        self.authentication = {};

        //script load
        activate();
        function activate() {
            self.authentication = autheService.authentication;
            self.authorization = authoFactory.authorization;
            toastr.options.preventDuplicates = true;
            toastr.options.timeOut = 2000;
            var date = new Date();
            self.year = date.getFullYear();

            var rs = $(window).width();
            if (rs <= 767)
                $rootScope.app.layout.isCollapsed = true;
        }


        //public methods
        self.logOut = function () {
            autheService.logOut();
            $state.go('login');
        };

        self.isAuthorized = function (permission) {
            return self.authorization.isAuthorized(permission);
        };

        self.goToParentState = function (state) {
            var toState = authoFactory.getByName(self.authorization.permissions, state);
            if (toState)
                $state.go(toState);
        }

        self.isLogged = function () {
            return self.authentication.isAuth && $(document).width() > 768;
        }

        //private methods
    }
})();