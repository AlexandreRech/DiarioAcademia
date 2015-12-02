(function () {
    'use strict';

    angular
        .module('app.authorization')
        .run(runStateChangeSuccess)
        .run(runStateNotFound)
        .run(runStateChangeStart);


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

               if (autheService.authentication.isAuth && toState.name == 'login') {
                   event.preventDefault();
                   return $state.go('app.home');
               }

               if (!autheService.authentication.isAuth && toState.name == 'app.home') {
                   event.preventDefault();
                   return $state.go('login');
               }

               //check authorization
               if (toState.allowAnnonymous)
                   return true;
               if (authoFactory.authorization.isAdmin)
                   return true;
               var isAuthorized = authoFactory.authorization.isAuthorized(toState.name);
               if (isAuthorized) return;
               logNoAuthorized(permissionFactory, $translate, logger, toState);
               event.preventDefault();
               $state.go('login');
           });
    }


    // Helpers
    function logNoAuthorized(permissionFactory, $translate, logger, toState) {
        var permissionRequired = permissionFactory.getByName(toState.name || toState.to);
        logger.warning($translate.instant('status.NOT_AUTHORIZED', {
            resourceName: " \"" + $translate.instant(permissionRequired.displayName) + "\""
        }));
    }

})();

