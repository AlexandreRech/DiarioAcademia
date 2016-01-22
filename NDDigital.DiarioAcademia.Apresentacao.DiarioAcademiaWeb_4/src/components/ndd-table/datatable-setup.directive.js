/* @ngInject */
module.exports = function datatableSetup($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $timeout(function () { });
        }
    }
}
