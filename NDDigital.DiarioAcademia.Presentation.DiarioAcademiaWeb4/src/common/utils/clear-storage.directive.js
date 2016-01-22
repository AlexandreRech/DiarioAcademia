/* @ngInject */
module.exports = function resetKey($state, $localStorage) {
    var directive = {
        link: link,
        restrict: 'A',
        scope: {
            resetKey: '@'
        }
    };
    return directive;

    function link(scope, element) {
        element.on('click', function (e) {
            e.preventDefault();

            if (scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, { reload: true });
            }
            else {
                $.error('No storage key specified for reset.');
            }
        });
    }
}