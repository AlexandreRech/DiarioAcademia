(function () {
    'use strict';

    angular.module("app.common", [])
                //Route
                .constant('CONSTANT_KEYS', {
                    APP_ROUTES: 'APP_ROUTES'
                })
                .constant('APP_ROUTES', [])
                //service
                //.value("BASEURL", "http://localhost:31648/")// slim
                .value("BASEURL", "http://localhost:62179/") //full
                //storage
                .value('storageKeys', {
                    authoData: 'authorizationData',
                    autheData: 'authenticationData'
                })
                .value('LOCAL_STORAGE_KEYS', {
                    AUTH_DATA: 'watcher.authoData',
                    LAST_LOGIN_DATA: 'watcher.lastLoginData',
                    TOUR_INSTRUCTIONS: 'watcher.tourInstructionsData'
                });
})();
