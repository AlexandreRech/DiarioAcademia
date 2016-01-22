/* @ngInject */
module.exports = function () {
    return {
        scope: {},
        restrict: "E",
        controller: require("../controllers/aluno-details.controller"),
        controllerAs: "vm",
        template: require("../views/aluno-details.html")
    };
}