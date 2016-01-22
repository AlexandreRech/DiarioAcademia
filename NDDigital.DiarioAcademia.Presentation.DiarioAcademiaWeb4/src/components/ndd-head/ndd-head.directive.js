/* @ngInject */
module.exports = function nddHead() {
    //Usage:
    //<ndd-head title="titleHead"><ndd-head>

    controller.$inject = ['$state'];

    return {
        restrict: "E",
        link: link,
        controller: controller,
        transclude: true,
        replace: false,
        scope: {
            title: "@"
        },
        template: require("./ndd-head.html")
    };

    function link(scope, element, attrs) {
        scope.redirect = controller.redirect;
    }

    function controller($state) {
        controller.redirect = function (route) {
            if (!route || route == "")
                return;
            $state.go(route);
        }
    }

}