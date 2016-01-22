var loadingbar = angular.module('app.loadingbar', [
    require('angular-loading-bar'),
]);

loadingbar.config(require("./loadingbar.config"));
loadingbar.run(require("./loadingbar.run"));

module.exports = loadingbar.name;