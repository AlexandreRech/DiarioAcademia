(function (angular) {
    angular.module('directives.module')
        .directive('nddGroupCheckbox', nddGroupCheckbox);

    function nddGroupCheckbox() {
        // Usage:
        //  <ndd-group-checkbox array="vm.myArray" compare="vm.compareArray" method="vm.compareMethod"></ndd-group-checkbox>
        return {
            restrict: 'E',
            link: link,
            transclude: false,
            replace: false,
            scope: {
                array: "=",
                compare: "=",
                callback: "=",
                method: "=",
                label: "@"
            },
            templateUrl: 'app/directives/ndd-group-checkbox/ndd-group-checkbox.html'
        };

        function link(scope, element, attrs) {
            scope.check = check;
            scope.onclick = onclick;

            //angular pagination
            scope.currentPage = 1;
            scope.numPerPage = 4;
            scope.countElements = 0;

            scope.$watch(function () { return scope.array; }, function () {
                pagination(scope);
            }, true);

            scope.$watch(function () { return scope.currentPage; }, function () {
                pagination(scope);
            });
        }

        function check(obj, compare, method) {
            return method && compare ? method(compare, obj) >= 0 :
                             compare ? compare.containsObject(obj) : false;

        }

        function onclick(obj, compare, callback, method) {

            var chkGroups = !check(obj, compare, method);
            if (!compare) {
                console.warn("Compare is null");
                return;
            }

            if (chkGroups) {
                compare.push(obj);
            } else {
                var index = method ? method(compare, obj) : compare.indexOfObject(obj);
                if (index >= 0)
                    compare.splice(index, 1);
            }
            if (callback)
                callback(obj, chkGroups);
        }

        function pagination(scope) {
            if (!scope.array)
                return;
            scope.countElements = (scope.array.length / scope.numPerPage) * 10;;
            var begin = ((scope.currentPage - 1) * scope.numPerPage)
                   , end = begin + scope.numPerPage;
            scope.elements = scope.array.slice(begin, end);
        }

    }

})(window.angular);