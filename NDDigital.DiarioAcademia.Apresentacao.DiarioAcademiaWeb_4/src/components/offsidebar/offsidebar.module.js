var offsidebar = angular.module('app.offsidebar', []);

offsidebar.directive('offsidebar', require("./offsidebar.directive"));
offsidebar.directive('tab', require("./tab.directive"));


module.exports = offsidebar.name;