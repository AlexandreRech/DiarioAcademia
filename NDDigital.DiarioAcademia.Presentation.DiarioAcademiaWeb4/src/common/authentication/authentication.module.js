var authe = angular.module('app.authentication', [
    require("../logger/logger.module"),
    require("../../features/user/user.module"),
    require("../styles/styles.module")
]);

authe.config(require("./authentication.config"));
authe.factory('authInterceptorService', require("./authInterceptor.factory"));
authe.service('autheService', require("./authentication.service"));
authe.directive("login", require("./directives/login.directive"));
authe.directive("signup", require("./directives/signup.directive"))


module.exports = authe.name;
