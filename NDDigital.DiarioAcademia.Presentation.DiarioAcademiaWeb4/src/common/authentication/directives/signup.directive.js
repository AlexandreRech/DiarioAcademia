/* @ngInject */
module.exports = function () {
    return {
        scope: {},
        restrict: "E",
        template: require("../views/signup.html"),
        controller: require("../controllers/signup.controller"),
        controllerAs: "vm"
    };
}