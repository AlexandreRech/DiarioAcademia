(function (angular) {

    angular.module('app.ndd-security')
        .directive('nddSecurity', nddSecurity);

    function nddSecurity() {
        controller.$inject = ['authoFactory'];
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

        function controller(authoFactory) {
            controller.isAuthorized = function (permission) {
                return authoFactory.authorization.isAuthorized(permission);
            };
        }

    }
})(window.angular);