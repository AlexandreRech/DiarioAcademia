/* @ngInject */
module.exports = function () {
    return {
        scope: {},
        restrict: "E",
        controller: require("../controllers/aula-create.controller"),
        controllerAs: "vm",
        template: require("../views/aula-create.html")
    };
}