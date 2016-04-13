(function (angular) {

    angular.module('directives.module')
        .directive('nddSidemenuOption', nddSidemenuOption);

    function nddSidemenuOption() {
        controller.$inject = ['$state'];
        // Usage:
        //  <ndd-sidemenu-option routeShow="[routesToShow]" route-actived="route.actived" route: "route.toRedirect" 
        //                       name="myName" state="route.actualState" icon="fa-icon"> </ndd-sidemenu-option>
        return {
            restrict: 'E',
            link: link,
            controller: controller,
            transclude: true,
            replace: false,
            scope: {
                routeShow: "=",
                routeActived: "@",
                route: "@",
                name: "@",
                state: "@",
                icon: "@",
                security: "="
            },
            templateUrl: 'app/directives/ndd-sidemenu-option/ndd-sidemenu-option.html'
        };

        function link(scope, element, attrs) {
            scope.redirect = controller.redirect;
            scope.verifyDisplay = function (state) {
                if (!scope.routeShow)
                    return false;
                for (var i in scope.routeShow) {
                    if (scope.routeShow[i].contains && state.contains(scope.routeShow[i]))
                        return true;
                }
                return false;
            }
        }

        function controller($state) {
            controller.redirect = function (route) {
                if (route && route != "")
                    $state.go(route);
            }
        }

    }

})(window.angular);