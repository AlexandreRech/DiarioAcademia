var checkbox = angular.module('app.checkbox', []);
checkbox.directive("nddGroupCheckbox", require("./ndd-group-checkbox.directive"));
module.exports = checkbox.name;
