/* @ngInject */
module.exports = function offsidebarDirective() {
    return {
        scope: {},
        template: require("./views/offsidebar.html"),
        restrict: "E",
        link: link,
        controller: require("./offsidebar.controller"),
        controllerAs: "vm"
    };

    function link(scope) { }
}