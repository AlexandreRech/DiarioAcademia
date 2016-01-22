var autho = angular.module('app.authorization', [
    require("../metadata/metadata.module"),
    require("../../components/ndd-table/ndd-table.module"),
    require("../../components/ndd-head/ndd-head.module"),
    require("../../components/ndd-group-checkbox/ndd-group-checkbox.module")
]);
//factories
autho.factory('authoAdapter', require("./authorization.adapter"));
autho.factory('authoFactory', require("./authorization.factory"));
autho.factory('authoUtilFactory', require("./authoutil.factory"));
//services
autho.service('authoService', require("./services/authorization.service"));
autho.service('claimService', require("./services/claim.service"));
autho.service('claimService', require("./services/claim.service"));
//directives
autho.directive('authoClaims', require("./directives/autho-claims.directive"));
//run
autho.run(require("./authorization.run"));

module.exports = autho.name;