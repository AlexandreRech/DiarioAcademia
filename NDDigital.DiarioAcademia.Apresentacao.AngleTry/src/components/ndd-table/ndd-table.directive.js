(function (angular) {

    angular.module('app.nddtable')
        .directive('nddTable', nddToolbar);

    function nddToolbar() {
        controller.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder'];

        // Usage:
        //  <ndd-table columns="['column1', 'column2']", attrs="['attribute1', 'attribute2']" data="[obj1, obj2]" cbClick="vm.onClick"></ndd-table>
        return {
            restrict: 'E',
            controller: controller,
            link: link,
            replace: false,
            transclude: false,
            scope: {
                title: "@",
                columns: "=",
                attrs: "=",
                data: "=",
                cbEdit: "=",
                cbRemove: "=",
                securityEdit: "@",
                securityRemove: "@"
            },
            templateUrl: 'src/components/ndd-table/ndd-table.html'
        }

        function link(scope, element, attrs) {
            scope.dtOptions = controller.dtOptions;

            scope.isBool = function (value) {
                return typeof (value) == 'boolean';
            }
            scope.isNumber = function (value) {
                return $.isNumeric(value);;
            }
        }

        function controller(DTOptionsBuilder, DTColumnDefBuilder) {
            controller.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');

        }

    }
})(window.angular);