angular.module('app.nddtable').directive('datatableSetup', ['$timeout',
    function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $timeout(function () { });
            }
        }
    }
]);