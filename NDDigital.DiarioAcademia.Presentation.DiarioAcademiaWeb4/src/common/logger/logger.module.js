var logger = angular.module('app.logger', [
    require("../translate/translate.module")
]);

logger.factory('logger', require("./logger.service"));
module.exports = logger.name;