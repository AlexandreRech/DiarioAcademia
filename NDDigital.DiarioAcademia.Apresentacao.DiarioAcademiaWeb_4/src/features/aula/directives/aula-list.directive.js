/* @ngInject */
module.exports = function () {
    return {
        scope: {},
        restrict: "E",
        controller: require("../controllers/aula-list.controller"),
        controllerAs: "vm",
        template: require("../views/aula-list.html")
    };
}