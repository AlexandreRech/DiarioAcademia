require("datatables");

var nddTable = angular.module('app.nddtable', [
    require("angular-datatables")   
]);

nddTable.directive('datatableSetup', require("./datatable-setup.directive"));
nddTable.directive('nddTable', require("./ndd-table.directive"));

module.exports = nddTable.name;