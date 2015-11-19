(function () {
    'use strict';
    angular.module('core.module', [
        //3th party
        'ui.router'
        , 'ngAnimate'
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
    ])

    .config(configInterceptors)
    .run(runStateChangeSuccess)
    .run(runStateChangeStart);


    configInterceptors.$inject = ['$httpProvider'];
    function configInterceptors($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
        window.scrollTo(0, 0);
    }

    runStateChangeSuccess.$inject = ["$rootScope"];
    function runStateChangeSuccess($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.previousState = fromState;
            $rootScope.title = toState.data.displayName;
            $rootScope.state = toState.name;
            console.log({ Change: "succes: ", fromState: fromState.name, toState: toState.name });
        });
        $rootScope.$on('$stateNotFound',
               function (event, unfoundState, fromState, fromParams) {
                   console.log({ Change: "error: ", fromState: fromState.name, toState: unfoundState.to });
               });
    };

    runStateChangeStart.$inject = ['$rootScope', '$state', 'authService', 'logger', '$translate'];
    function runStateChangeStart($rootScope, $state, authService, logger, $translate) {

        $rootScope.$on('$stateChangeStart',
           function (event, toState, toParams, fromState, fromParams) {

               if (authService.authentication.isAuth) {
                   if (toState.name == 'home') {
                       event.preventDefault();
                       return $state.go('app.homeapp');
                   }
               }

               if (toState.data.allowAnnonymous) return;

               if (authService.authorization.groups)
                   var userIsAdmin = authService.authorization.groups.any('isAdmin', true);

               if (authService.authorization.isAdmin) return;
               var stateToGo = 'home';
               if (authService.authentication.isAuth) {
                   var hasPermission = authService.checkAuthorize(toState.name);
                   if (hasPermission) return;
               }
               logger.warning($translate.instant('status.NOT_AUTHORIZED', { resourceName: toState.data.displayName }))

               authService.lastState = toState.name;
               event.preventDefault();
               $state.go(stateToGo);
           });
    }

})(window.angular);