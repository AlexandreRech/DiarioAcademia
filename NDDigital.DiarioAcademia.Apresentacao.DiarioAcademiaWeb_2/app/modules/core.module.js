(function () {
    'use strict';
    angular.module('core.module', [
        //3th party
        'ui.router'
        , 'ui.bootstrap'
        , 'LocalStorageModule'
        , 'angular-loading-bar'
        , 'ngAutomapper'
        , 'pascalprecht.translate'
        , 'ngCookies'
        //app modules
        , 'common.module'
        , 'translate.module'
        , 'factories.module'
        , 'controllers.module'
        , 'directives.module'
        , 'filters.module'
        , 'routes.module'
        , 'services.module'
        , 'authorization.module'
    ])
    .run(runStateChangeSuccess)
    .run(runStateNotFound);


    runStateChangeSuccess.$inject = ["$rootScope"];
    function runStateChangeSuccess($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.previousState = fromState;
            $rootScope.state = toState.name;
            console.log({ Change: "succes: ", fromState: fromState.name, toState: toState.name });
        });
    };

    runStateNotFound.$inject = ["$rootScope"];
    function runStateNotFound($rootScope) {
        $rootScope.$on('$stateNotFound',
               function (event, unfoundState, fromState, fromParams) {
                   console.log({ Change: "error: ", fromState: fromState.name, toState: unfoundState.to });
               });
    };
})(window.angular);