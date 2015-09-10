﻿(function (angular) {

    angular.module('directives.module')
        .directive('nddToolbarOption', nddToolbarOption);

    function nddToolbarOption() {
        controller.$inject = ['$state'];

        // Usage:
        //  <ndd-sidemenu-option >
        return {
            restrict: 'E',
            link: link,
            controller: controller,
            transclude: true,
            replace: true,
            scope: {
                route: "@",
                name: "@",
                icon: "@"
            },
            templateUrl: 'app/directives/ndd-toolbar-option/ndd-toolbar-option.html'
        };

        function link(scope, element, attrs) {
            scope.redirect = controller.redirect;
        }

        function controller($state) {
            controller.redirect = function (route) {
                if (route && route != "")
                    $state.go(route);
            }
        }

    }

})(window.angular);