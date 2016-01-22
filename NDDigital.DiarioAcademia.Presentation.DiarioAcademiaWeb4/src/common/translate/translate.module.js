var translate = angular.module('app.translate', [
    require('angular-translate'),
    require("angular-translate-loader-url"),
    require("angular-translate-loader-static-files"),
    require("angular-translate-storage-local"),
    require("angular-translate-storage-cookie"),
    require("angular-cookies"),
]);

translate.run(require("./translate.run"));
translate.run(require("./translate-resource.run"));
translate.value('resource', require("./translate.constants"));
translate.config(require("./translate.config"));

module.exports = translate.name;