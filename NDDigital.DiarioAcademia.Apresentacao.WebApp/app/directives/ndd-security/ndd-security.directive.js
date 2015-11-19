(function (angular) {

    angular.module('directives.module')
        .directive('nddSecurity', nddSecurity);

    function nddSecurity() {
        controller.$inject = ['authService'];
        // Usage:
        //  <div ndd-security="route"></div>
        return {
            restrict: 'A',
            link: link,
            controller: controller,
            scope: {
                nddSecurity: "@",
            }
        };

        function link(scope, element, attrs) {
            scope.$on('login', function () {
                verify(scope, element);
            });
            verify(scope, element);
        }

        function verify(scope, element) {
            var auth = controller.isAuthorized(scope.nddSecurity);
            element = $(element);
            return auth ? element.show() : element.hide();
        }

        function controller(authService) {
            controller.isAuthorized = function (permission) {
                return authService.authorization.isAuthorized(permission);
            };
        }



    }

})(window.angular);