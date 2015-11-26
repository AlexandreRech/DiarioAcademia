(function () {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);


    appRun.$inject = ['$rootScope', '$state', '$stateParams', '$window', '$templateCache'];
    function appRun($rootScope, $state, $stateParams, $window, $templateCache) {
        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;
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
})();

