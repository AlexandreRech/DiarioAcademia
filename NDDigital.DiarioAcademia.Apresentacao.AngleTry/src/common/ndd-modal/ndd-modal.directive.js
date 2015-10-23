(function (angular) {

    angular.module('app.modal')
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
            templateUrl: 'src/common/ndd-modal/ndd-modal.html'
        };

        function link(scope, element, attrs) {}
    }



})(window.angular);

