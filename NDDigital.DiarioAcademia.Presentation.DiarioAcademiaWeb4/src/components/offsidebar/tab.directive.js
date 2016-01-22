/* @ngInject */
module.exports = function offsidebarDirective($compile) {
    return {
        scope: {
            nametab: "@"
        },
        restrict: "E",
        link: link,
        replace: true,
        controller: require("./offsidebar.controller"),
        controllerAs: "vm"
    };

    function link(scope, element, attrs) {
        require.ensure([], function (require) {
            var template = require("./views/offsidebar-" + scope.nametab + "-config.html");
            element.html(template).show();
            $compile(element.contents())(scope);
        }, 'template');
    }
}