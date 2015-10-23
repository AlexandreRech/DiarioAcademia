(function (angular) {
    angular.module('app.nddhead')
             .directive('nddHead', nddHead);

    function nddHead() {
        //Usage:
        //<ndd-head title="titleHead"><ndd-head>

        controller.$inject = ['$state'];

        return {
            restrict: "E",
            link: link,
            controller: controller,
            transclude: true,
            replace: false,
            scope: {
                title: "@"
            },
            templateUrl: 'src/common/ndd-head/ndd-head.html'
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