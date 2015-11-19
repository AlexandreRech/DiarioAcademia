(function() {
    'use strict';
    angular.module('services.module', [])
                .value('LOCAL_STORAGE_KEYS', {
                    AUTH_DATA: 'watcher.authoData',
                    LAST_LOGIN_DATA: 'watcher.lastLoginData',
                    TOUR_INSTRUCTIONS: 'watcher.tourInstructionsData'
                });;
})();
