/* @ngInject */
module.exports = function () {
    return {
        scope: {},
        restrict: "E",
        controller: require("../controllers/group-edit.controller"),
        controllerAs: "vm",
        template: require("../views/group-edit.html")
    };
}