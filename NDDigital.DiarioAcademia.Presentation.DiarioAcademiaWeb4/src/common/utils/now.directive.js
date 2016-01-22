/* @ngInject */
module.exports = function now(dateFilter, $interval) {
    var directive = {
        link: link,
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        var format = attrs.format;

        function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
        }

        updateTime();
        var intervalPromise = $interval(updateTime, 1000);

        scope.$on('$destroy', function () {
            $interval.cancel(intervalPromise);
        });

    }
}