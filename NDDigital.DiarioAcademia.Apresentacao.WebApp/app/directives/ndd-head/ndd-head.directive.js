(function (angular) {
    angular.module('directives.module')
             .directive('nddHead', nddHead);

    function nddHead() {
        //Usage:
        //<ndd-head title="titleHead" back-route="route.toBack.button"><ndd-head>

        controller.$inject = ['$state'];

        return {
            restrict: "E",
            link: link,
            controller: controller,
            transclude: true,
            replace: false,
            scope: {
                title: "@",
                backRoute: '@'
            },
            templateUrl: 'app/directives/ndd-head/ndd-head.html'
        };

        function link(scope, element, attrs) {
            scope.redirect = controller.redirect;
        }

        function controller($state) {
            controller.redirect = function (route) {
                if (!route || route == "")
                    return;
                $state.go(route);
            }
        }

    }

})(window.angular);