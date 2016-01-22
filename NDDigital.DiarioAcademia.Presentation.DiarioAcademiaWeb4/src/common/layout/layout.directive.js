/* @ngInject */
module.exports = function layoutDirective() {
    var directive = {       
        restrict: 'E',
        controller: require('./shell.controller'),
        controllerAs: "shell",
        template: require("./views/app.html"),
        transclude: true,
        link: link,
        scope: {}
    };
    return directive;

    function link(scope) { }
}