/* @ngInject */
module.exports = function () {
    return {
        scope: {},
        restrict: "E",
        controller: require("../controllers/group-list.controller"),
        controllerAs: "vm",
        template: require("../views/group-list.html")
    };
}