(function (angular) {
    angular.module('directives.module')
             .directive('nddConfirmExit', nddConfirmExit);

    function nddConfirmExit() {
        //Usage:
        //<ndd-confirm-exit controller="vm"><ndd-confirm-exit>
        var nextState, _event, vm, state, nextParams;
        controller.$inject = ['$rootScope', '$state'];

        return {
            restrict: "E",
            link: link,
            transclude: true,
            replace: false,
            controller: controller,
            scope: {
                controller: "="
            },
            templateUrl: 'app/directives/ndd-confirm-exit/ndd-confirm-exit.html'
        };

        function link(scope, element, attrs) {
            scope.titleModalConfirm = "Confirmar Saída";
            scope.bodyModalConfirm = "Alterações foram realizadas e não salvas. Deseja realmente sair ?";
            scope.confirmExit = confirmExit;
            vm = scope.controller;
        }

        function controller($rootScope, $state) {
            state = $state;
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (vm.hasChange) {
                    event.preventDefault();
                    nextState = toState;
                    nextParams = toParams;
                    $('#modalConfirmExit').modal();
                    _event = event;
                }
            });
        }

        function confirmExit() {
            $('#modalConfirmExit').modal();
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            vm.hasChange = false;
            state.go(nextState.name, nextParams);
        }
    }

})(window.angular);