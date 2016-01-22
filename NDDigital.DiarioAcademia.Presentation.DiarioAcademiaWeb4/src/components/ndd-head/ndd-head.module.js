var nddhead = angular.module('app.nddhead', []);
nddhead.directive('nddHead', require("./ndd-head.directive"));
module.exports = nddhead.name;