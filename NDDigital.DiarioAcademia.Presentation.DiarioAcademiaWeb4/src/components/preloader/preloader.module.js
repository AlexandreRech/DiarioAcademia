var preloader = angular.module('app.preloader', []);
preloader.directive('preloader', require("./preloader.directive"));

module.exports = preloader.name;

