/* @ngInject */
module.exports = function animateEnabled($animate) {
    var directive = {
        link: link,
        restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
        scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
        }, function (newValue) {
            $animate.enabled(!!newValue, element);
        });
    }
}
