(function (angular) {

    angular.module('directives.module')
        .directive('nddPanel', nddModal);

    function nddModal() {
        // Usage:
        //  <ndd-panel title= "myTitle"  icon="fa-user" ></ndd-panel>
        return {
            restrict: 'EA',
            link: link,
            transclude: true,
            replace: false,
            scope: {
                title: "@",
                icon: "@",
            },
            templateUrl: 'app/directives/ndd-panel/ndd-panel.html'
        };

        function link(scope, element, attrs) {}

    }



})(window.angular);

