/* @ngInject */
module.exports = function () {
    return {
        scope: {},
        restrict: "E",
        controller: require("../controllers/aluno-create.controller"),
        controllerAs: "vm",
        template: require("../views/aluno-create.html")
    };
}