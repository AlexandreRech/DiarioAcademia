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


    runStateNotFound.$inject = ["$rootScope", "APP_REQUIRES", "$ocLazyLoad", "$state"];
    function runStateNotFound($rootScope, APP_REQUIRES, $ocLL, $state) {
        $rootScope.$on('$stateNotFound',
               function (event, unfoundState, fromState, fromParams) {

                   var moduleToLoad = getModule(APP_REQUIRES["modules"], unfoundState.to);

                   if (!moduleToLoad) {
                       console.log({ Change: "error: ", fromState: fromState.name, toState: unfoundState.to });
                       return;
                   }
                   event.preventDefault();

                   $ocLL.load(moduleToLoad).then(function () {
                       $state.go(unfoundState.to, unfoundState.toParams);
                   });
               });
    };

    function getModule(modules, routeTo) {
        for (var module in modules) {
            var routes = modules[module].routes; // routes of module  
            if (routes && routes.contains(routeTo))
                return modules[module].name;
        }
    }

    runStateChangeStart.$inject = ['$rootScope', '$state', 'authService', 'logger', 'permissions.factory', '$filter'];
    function runStateChangeStart($rootScope, $state, authService, logger, permissionFactory, $filter) {


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

               if (toState.allowAnnonymous) return;

               if (authService.authorization.groups)
                   var userIsAdmin = authService.authorization.groups.any('isAdmin', true);

               if (authService.authorization.isAdmin) return;

               var stateToGo = 'login';

               if (authService.authentication.isAuth) {
                   var hasPermission = authService.checkAuthorize(toState.name);
                   if (hasPermission) return;
               }

               var $translate = $filter('translate');

               var permissionRequired = permissionFactory.getStateByName(toState.name);
               logger.warning("Você não tem permissão para acessar \"" + $translate(permissionRequired.displayName) + "\"");

               authService.lastState = toState.name;
               event.preventDefault();
               $state.go(stateToGo);
           });
    }


})();

