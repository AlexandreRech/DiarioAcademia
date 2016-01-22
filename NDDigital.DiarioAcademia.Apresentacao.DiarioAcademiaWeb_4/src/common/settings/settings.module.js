var settings = angular.module('app.settings', []);

settings.run(require("./settings.run"));

module.exports = settings.name;