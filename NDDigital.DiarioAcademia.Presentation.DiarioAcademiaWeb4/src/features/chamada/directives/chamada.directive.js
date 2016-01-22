/* @ngInject */
module.exports = function () {
    return {
        scope: {},
        restrict: "E",
        controller: require("../chamada.controller"),
        controllerAs: "vm",
        template: require("../views/chamada.html")
    };
}