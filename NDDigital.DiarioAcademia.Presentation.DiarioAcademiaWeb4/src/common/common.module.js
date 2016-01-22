
var common = angular.module("app.common", []);

//Route
common.constant('CONSTANT_KEYS', {
    APP_ROUTES: 'APP_ROUTES'
})
common.constant('APP_ROUTES', [])

//Services

//common.value("baseURL", "http://localhost:31648/")// slim
common.value("baseURL", "http://localhost:62179/") //full

//Storage
common.value('storageKeys', {
    authoData: 'authorizationData',
    autheData: 'authenticationData'
})

common.value('LOCAL_STORAGE_KEYS', {
    AUTH_DATA: 'watcher.authoData',
    LAST_LOGIN_DATA: 'watcher.lastLoginData',
    TOUR_INSTRUCTIONS: 'watcher.tourInstructionsData'
});

module.exports = common.name;
