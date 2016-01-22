(function (angular) {
    angular.module('app.ndd-confirm')
             .directive('nddConfirm', nddConfirmExit);

    function nddConfirmExit() {
        //Usage:
        //<ndd-confirm controller="vm"><ndd-confirm>

        var nextState, _event, vm, state, nextParams, title, text, property, type,
            textSuccess, titleSuccess, typeSuccess, textCancel, titleCancel, typeCancel, closeOnCancel;

        controllerDirective.$inject = ['$rootScope', '$state', '$window', '$translate', 'SweetAlert'];

        return {
            restrict: "E",
            link: link,
            replace: false,
            controller: controllerDirective,
            scope: {
                controller: "=",
                title: "@",
                text: "@",
                prop: "@",
                type: "@",
                closeOncancel: "@",
                textSuccess: "@",
                titleSuccess: "@",
                typeSuccess: "@",
                textCancel: "@",
                titleCancel: "@",
                typeCancel: "@"
            }
        };

        function link(scope, element, attrs) {
            vm = scope.controller;
            title = scope.title;
            text = scope.text;
            property = scope.prop;
            type = scope.type;
            textSuccess = scope.textSuccess;
            titleSuccess = scope.titleSuccess;
            typeSuccess = scope.typeSuccess;
            closeOnCancel = scope.closeOncancel;

        }

        function controllerDirective($rootScope, $state, $window, $translate, SweetAlert) {
            state = $state;
            var confirmButtonText = $translate.instant('action.OK').toUpperCase();
            var cancelButtonText = $translate.instant('action.CANCEL').toUpperCase()

            // Change Route
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (vm[property]) {
                    event.preventDefault();
                    nextState = toState;
                    nextParams = toParams;
                    showMessage();
                    _event = event;
                }
            });

            function showMessage() {
                SweetAlert.swal({
                    title: title,
                    text: text,
                    type: type || 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: confirmButtonText,
                    cancelButtonText: cancelButtonText,
                    closeOnConfirm: false,
                    closeOnCancel: !!closeOnCancel
                }, action);
            }


            function action(isConfirm) {
                if (isConfirm) {
                    vm[property] = false;
                    state.go(nextState.name, nextParams);
                    SweetAlert.swal(titleSuccess, textSuccess, typeSuccess);
                } else if (!closeOnCancel) {
                    SweetAlert.swal(titleCancel, textCancel, typeCancel);
                }
            }
        }
    }

})(window.angular);