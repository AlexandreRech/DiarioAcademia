(function () {
    'use strict';
    angular.module("translate.module", [])
               .value('settings', {
                   language: 'pt-br'
               })
              .value('resource', {
                  SAVED_SUCCESSFUL: "",
                  DELETED_SUCCESSFUL: "",
                  UNAVAILABLE_SERVER: "",
                  SUCCESS_REQUEST: "",
                  STUDENT_FOUNDED: "",
                  STUDENT_EDITED: "",
                  WELCOME: ""
              })
              .config(translateConfig)
              .run(translateRun)
              .run(translateResource);


    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: 'app/resources/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useLocalStorage();
        $translateProvider.usePostCompiling(true);
        $translateProvider.useSanitizeValueStrategy('escapeParameters');
    }


    translateRun.$inject = ['$rootScope', '$translate'];
    function translateRun($rootScope, $translate) {

        // Internationalization
        // ----------------------
        $rootScope.language = {
            // list of available languages
            available: {
                'en': 'English',
                'pt': 'Português',
                'es': 'Español'
            },
            // display always the current ui language
            init: function () {
                var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
                $rootScope.language.selected = $rootScope.language.available[(proposedLanguage || preferredLanguage)];
            },
            set: function (localeId) {
                // Set the new idiom - lazy load
                $translate.use(localeId);
                // save a reference for the current language
                $rootScope.language.selected = $rootScope.language.available[localeId];
                // finally toggle dropdown
                $rootScope.language.listIsOpen = !$rootScope.language.listIsOpen;
            }
        };

        $rootScope.language.init();
    }

    translateResource.$inject = ['$rootScope', 'resource', "$translate"];
    function translateResource($rootScope, resource, $translate) {

        $rootScope.$on('$translateChangeSuccess', function () {
            for (var res in resource) {
                resource[res] = $translate.instant("status." + res);
            }
        });
    }
})();
