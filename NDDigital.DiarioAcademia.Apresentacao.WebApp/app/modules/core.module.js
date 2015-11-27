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

    runStateChangeStart.$inject = ['$rootScope', '$state', 'autheService', 'authoFactory', 'logger', 'permissions.factory', '$translate'];
    function runStateChangeStart($rootScope, $state, autheService, authoFactory, logger, permissionFactory, $translate) {
        $rootScope.$on('$stateChangeStart',
           function (event, toState, toParams, fromState, fromParams) {
               if (autheService.authentication.isAuth && toState.name == 'home') {
                   event.preventDefault();
                   return $state.go('app.homeapp');
               }
               checkDetailsMode($rootScope, toState);

               var isAuthorized = checkAuth(authoFactory, toState);
               if (isAuthorized)
                   return;
               logNoAuthorized(permissionFactory, $translate, logger, toState);
               event.preventDefault();
               $state.go('app.homeapp');
           });
    }

    // Helpers
    function checkAuth(authoFactory, toState) {
        if (toState.data.allowAnnonymous)
            return true;
        if (authoFactory.authorization.isAdmin)
            return true;
        return authoFactory.authorization.isAuthorized(toState.name);
    }


    function logNoAuthorized(permissionFactory, $translate, logger, toState) {
        var permissionRequired = permissionFactory.getStateByName(toState.name || toState.to);
        logger.warning($translate.instant('status.NOT_AUTHORIZED', {
            resourceName: " \"" + $translate.instant(permissionRequired.displayName) + "\""
        }));
    }

    function checkDetailsMode($rootScope, toState) {
        if (toState.name.contains("details")) {
            if (!$rootScope.app)
                $rootScope.app = {};
            $rootScope.lastState = $rootScope.lastState != undefined ? $rootScope.lastState :
                ($rootScope.app.isSideCollapse != undefined ? $rootScope.app.isSideCollapse : false);
            $rootScope.app.isSideCollapse = true;
            $rootScope.details = true;
        } else {
            $rootScope.details = false;
            if ($rootScope.lastState != undefined) {
                $rootScope.app.isSideCollapse = $rootScope.lastState;
                $rootScope.lastState = undefined;
            }
        }
    }
})(window.angular);