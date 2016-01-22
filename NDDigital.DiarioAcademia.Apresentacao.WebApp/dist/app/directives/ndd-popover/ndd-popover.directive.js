(function (angular) {

    angular.module('directives.module')
        .directive('nddPopover', nddPopover);

    nddPopover.$inject = ['$compile', '$templateCache', '$translate']
    function nddPopover($compile, $templateCache, $translate) {
        // Usage:
        //  <div ndd-popover></div>
        return {
            restrict: "A",
            link: link
        };

        function link(scope, element, attrs) {
            var file = element.attr('ndd-popover');
            var title = element.attr('title');
            var popOverContent = $compile($templateCache.get(file))(scope);

            var options = {
                content: popOverContent,
                placement: "right",
                html: true,
                date: scope.date
            };
            $(element).popover(options);
            $(element).attr('data-original-title', $translate.instant(title));

        }
    }

})(window.angular);