(function () {
    'use strict';

    angular
        .module('app.core')
        .run(appRun)
        .run(runStateChangeSuccess)
        .run(runStateNotFound)
        .run(runStateChangeStart);


    appRun.$inject = ['$rootScope', '$state', '$stateParams', '$window', '$templateCache', 'Colors'];
    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {
        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;
        $rootScope.colorByName = Colors.byName;
        // cancel click event easily
        $rootScope.cancel = function ($event) {
            $event.stopPropagation();
        };
        // Load a title dynamically
        $rootScope.currTitle = $state.current.title;
        $rootScope.pageTitle = function () {
            var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
            document.title = title;
            return title;
        };
    }

    // Hooks 
    // ----------------------------------- 

    runStateChangeSuccess.$inject = ["$rootScope"];
    function runStateChangeSuccess($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.previousState = fromState;
            $rootScope.state = toState.name;
            console.log({ Change: "succes: ", fromState: fromState.name, toState: toState.name });
        });
    };


    runStateNotFound.$inject = ["$rootScope", "APP_REQUIRES", "$ocLazyLoad", "$state",
        "authService", 'permissions.factory', '$translate', 'logger'];
    function runStateNotFound($rootScope, APP_REQUIRES, $ocLL, $state, authService, permissionFactory, $translate, logger) {
        $rootScope.$on('$stateNotFound',
               function (event, unfoundState, fromState, fromParams) {
                   //Search module to load
                   var moduleToLoad = getModule(APP_REQUIRES["modules"], unfoundState.to);
                   if (!moduleToLoad) {
                       console.log({ Change: "error: ", fromState: fromState.name, toState: unfoundState.to });
                       return;
                   }
                   event.preventDefault();
                   //Verifiy permissions before load the module
                   var isAuthorized = checkAuth(authService, unfoundState);
                   if (!isAuthorized) {
                       logNoAuthorized(permissionFactory, $translate, logger, unfoundState);
                       return;
                   }
                   //Load The module
                   $ocLL.load(moduleToLoad).then(function () {
                       $state.go(unfoundState.to, unfoundState.toParams);
                   });
               });
    };


    runStateChangeStart.$inject = ['$rootScope', '$state', 'authService', 'logger', 'permissions.factory', '$translate'];
    function runStateChangeStart($rootScope, $state, authService, logger, permissionFactory, $translate) {


        $rootScope.$on('$stateChangeStart',
           function (event, toState, toParams, fromState, fromParams) {

               if (authService.authentication.isAuth && toState.name == 'login') {
                   event.preventDefault();
                   return $state.go('app.home');
               }

               if (!authService.authentication.isAuth && toState.name == 'app.home') {
                   event.preventDefault();
                   return $state.go('login');
               }

               var isAuthorized = checkAuth(authService, toState);
               if (isAuthorized)
                   return;


               logNoAuthorized(permissionFactory, $translate, logger, toState);
               event.preventDefault();
               $state.go('login');
           });
    }


    // Helpers
    function getModule(modules, routeTo) {
        for (var module in modules) {
            var routes = modules[module].routes; // routes of module  
            if (routes && routes.contains(routeTo))
                return modules[module].name;
        }
    }

    function checkAuth(authService, toState) {
        if (toState.allowAnnonymous) return true;
        if (authService.authorization.isAdmin) return true;
        if (authService.authentication.isAuth) {
            return authService.checkAuthorize(toState.name);
        }
        return false;
    }


    function logNoAuthorized(permissionFactory, $translate, logger, toState) {
        var permissionRequired = permissionFactory.getStateByName(toState.name || toState.to);
        logger.warning($translate.instant('status.NOT_AUTHORIZED', {
            resourceName: " \"" + $translate.instant(permissionRequired.displayName) + "\""
        }));
    }

})();

