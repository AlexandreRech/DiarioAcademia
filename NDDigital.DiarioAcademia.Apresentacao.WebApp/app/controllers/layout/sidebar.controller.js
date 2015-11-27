(function () {

    'use strict';
    //using
    sidebarController.$inject = ['autheService', '$state', '$rootScope'];

    //namespace
    angular
        .module('controllers.module')
        .controller('sidebarController', sidebarController);

    //class
    function sidebarController(autheService, $state, $rootScope) {
        var self = this;

        //script load
        activate();
        function activate() {
            if (!$rootScope.app)
                $rootScope.app = {
                    isSideCollapse: false
                };
        }

        self.editUser = function () {
            $state.go('app.user.details', { userId: autheService.authentication.userId });
        }

        self.closeItensOpen = function () {
            $("ul[aria-expanded=true]").collapse('hide');
        }
        //public methods
        self.redirect = function (state) {
            var route = state.replace("details", "list");
            route = route.substring(0, route.lastIndexOf("list") + 4);
            $state.go(route);
        };

        //private methods
    }

})();