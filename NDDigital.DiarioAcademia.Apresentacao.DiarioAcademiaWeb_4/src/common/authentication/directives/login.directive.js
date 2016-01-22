/* @ngInject */
module.exports = function () {
    return {
        scope: {},
        restrict: "E",
        template: require("../views/login.html"),
        controller: require("../controllers/login.controller"),
        controllerAs: "vm"
    };
}