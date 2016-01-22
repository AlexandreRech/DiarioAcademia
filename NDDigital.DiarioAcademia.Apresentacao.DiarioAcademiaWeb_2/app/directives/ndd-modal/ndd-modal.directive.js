(function (angular) {

    angular.module('directives.module')
        .directive('nddModal', nddModal);

    function nddModal() {
        // Usage:
        //  <ndd-modal target= "id"  label="title" callback="vm.action"></ndd-modal>
        //  <button class="btn" data-toggle="modal" data-target="#id">

        return {
            restrict: 'EA',
            link: link,
            transclude: true,
            replace: false,
            scope: {
                target: "@",
                label: "@",
                callback: "=",
                info: "@"
            },
            templateUrl: 'app/directives/ndd-modal/ndd-modal.html'
        };

        function link(scope, element, attrs) {}
    }



})(window.angular);

