/* @ngInject */
module.exports = function authoClaimsDirective() {
    return {
        scope: {},
        restrict: "E",
        controller: require("../controllers/claim-list.controller"),
        controllerAs: "vm",
        template: require("../views/claim-list.html")
    };
}