/* @ngInject */
module.exports = function triggerResize($window, $timeout) {
    var directive = {
        link: link,
        restrict: 'A'
    };
    return directive;

    function link(scope, element) {
        element.on('click', function () {
            $timeout(function () {
                $window.dispatchEvent(new Event('resize'));
            });
        });
    }
}
