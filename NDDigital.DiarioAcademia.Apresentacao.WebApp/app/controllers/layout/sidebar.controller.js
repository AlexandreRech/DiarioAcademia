(function () {

    'use strict';
    //using
    sidebarController.$inject = ['authService', '$state', '$rootScope'];

    //namespace
    angular
        .module('controllers.module')
        .controller('sidebarController', sidebarController);

    //class
    function sidebarController(authService, $state, $rootScope) {
        var self = this;

        //script load
        activate();
        function activate() {
            $rootScope.app = {
                isSideCollapse: false
            };
        }

        self.editUser = function () {
            $state.go('app.user.edit', { userId: authService.authentication.userId });
        }

        self.closeItensOpen = function () {
            $("ul[aria-expanded=true]").collapse('hide');
        }
        //public methods
        self.publicMethod = function () {
        };

        //private methods
        function privateMethod() {
        };
    }

})();