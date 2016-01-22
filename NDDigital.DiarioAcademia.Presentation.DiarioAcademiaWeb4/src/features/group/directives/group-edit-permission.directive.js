/* @ngInject */
module.exports = function () {
    return {
        scope: {},
        restrict: "E",
        controller: require("../controllers/group-edit-permission.controller"),
        controllerAs: "vm",
        template: require("../views/group-edit-permission.html")
    };
}