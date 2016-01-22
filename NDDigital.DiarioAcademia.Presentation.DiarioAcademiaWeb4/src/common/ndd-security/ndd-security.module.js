var nddSecurity = angular.module('app.ndd-security', []);
nddSecurity.directive('nddSecurity', require("./ndd-security.directive"));
module.exports = nddSecurity.name;