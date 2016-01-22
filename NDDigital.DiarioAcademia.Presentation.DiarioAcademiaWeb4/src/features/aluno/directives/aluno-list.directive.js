/* @ngInject */
module.exports = function () {
    return {
        scope: {},
        restrict: "E",
        controller: require("../controllers/aluno-list.controller"),
        controllerAs: "vm",
        template: require("../views/aluno-list.html")
    };
}