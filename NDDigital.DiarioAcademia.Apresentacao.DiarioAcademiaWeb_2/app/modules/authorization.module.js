(function () {
    'use strict';
    angular.module('authorization.module', [])
    .config(configInterceptors)
    .run(runStateChangeStart);


    configInterceptors.$inject = ['$httpProvider'];
    function configInterceptors($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
        window.scrollTo(0, 0);
    }

    runStateChangeStart.$inject = ['$rootScope', '$state', 'autheService', 'authoFactory', 'logger', 'authoUtilFactory', '$translate'];
    function runStateChangeStart($rootScope, $state, autheService, authoFactory, logger, authoUtilFactory, $translate) {
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
               logNoAuthorized(authoUtilFactory, $translate, logger, toState);
               event.preventDefault();
               $state.go('app.homeapp');
           });
    }

    // Helpers
    function checkAuth(authoFactory, toState) {
        if (toState.allowAnnonymous || !toState.authorization)
            return true;
        if (authoFactory.authorization.isAdmin)
            return true;
        return authoFactory.authorization.isAuthorized(toState.authorization);
    }

    function logNoAuthorized(authoUtilFactory, $translate, logger, toState) {
        var permissionRequired = authoUtilFactory.getByName(toState.authorization || toState.name);
        logger.warning($translate.instant('status.NOT_AUTHORIZED', {
            resourceName: " \"" + permissionRequired ? $translate.instant(permissionRequired.displayName) : "" + "\""
        }));
    }

    function checkDetailsMode($rootScope, toState) {
        if (toState.name.contains("details")) {
            if (!$rootScope.app)
                $rootScope.app = {};
            $rootScope.details = true;
        } else {
            $rootScope.details = false;
        }
    }

})(window.angular);