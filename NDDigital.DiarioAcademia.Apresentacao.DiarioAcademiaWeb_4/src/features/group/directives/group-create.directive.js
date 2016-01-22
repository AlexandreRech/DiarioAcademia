/* @ngInject */
module.exports = function () {
    return {
        scope: {},
        restrict: "E",
        controller: require("../controllers/group-create.controller"),
        controllerAs: "vm",
        template: require("../views/group-create.html")
    };
}