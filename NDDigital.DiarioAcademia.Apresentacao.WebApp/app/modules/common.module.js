(function () {
    'use strict';
    angular.module("common.module", [])
              //constants
              .constant('CONSTANT_KEYS', {
                  APP_ROUTES: 'APP_ROUTES',
                  USER_ROLES: 'USER_ROLES'
              })
              .constant('APP_ROUTES', [])
              //values
              .value('storageKeys', {
                  authoData: 'authorizationData',
                  autheData: 'authenticationData'
              })
            //.value("BASEURL", "http://localhost:31648/");
              .value("BASEURL", "http://localhost:62179/"); //full
})();
