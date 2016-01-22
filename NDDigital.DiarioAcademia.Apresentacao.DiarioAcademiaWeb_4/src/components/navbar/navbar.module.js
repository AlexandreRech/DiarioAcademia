var navbar = angular.module('navbar', []);
navbar.directive('navbar', require("./navbar.directive"))
module.exports = navbar.name;