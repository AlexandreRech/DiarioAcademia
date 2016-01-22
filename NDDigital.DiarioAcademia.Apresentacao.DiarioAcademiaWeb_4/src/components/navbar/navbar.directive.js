/* @ngInject */
module.exports = function navbarDirective() {
    var directive = {
        scope: {},
        restrict: "E",
        controller: require("./navbar.controller"),
        controllerAs: "vm",
        template: require("./top-navbar.html"),
        bindToController: {
            toggleUserblock: '=',
        }
    }
    return directive;

    function link(scope) { }
}