(function (angular) {
    angular.module('directives.module')
             .directive('nddToolbar', nddToolbar);

    function nddToolbar() {
        //Usage:
        //<ndd-head title="titleHead" back-route="route.toBack.button"><ndd-head>

        controller.$inject = ['$state', "$rootScope"];

        return {
            restrict: "E",
            link: link,
            controller: controller,
            transclude: false,
            replace: true,
            scope: {
                cbProperties: "=",
                cbRemove: "=",
                cbNew: "=",
                stateNew: "@",
                securityProperties: "@",
                securityRemove: "@"
            },
            templateUrl: 'app/directives/ndd-toolbar/ndd-toolbar.html'
        };

        function link(scope, element, attrs) {
            scope.filter = "";

            scope.$watch('filter', function () {
                controller.$rootScope.filterToolbar = scope.filter;

            });
        }

        function controller($state, $rootScope) {
            controller.$rootScope = $rootScope;
        }

    }

})(window.angular);