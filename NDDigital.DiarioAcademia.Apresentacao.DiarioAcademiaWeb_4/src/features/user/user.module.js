var user = angular.module('app.user', [
    require('../../components/ndd-head/ndd-head.module'),
    require("../../components/ndd-table/ndd-table.module"),
    require("../../components/ndd-group-checkbox/ndd-group-checkbox.module"),
    require("../group/group.module")
]);

user.service('userService', require("./user.service"));
user.directive("userList", require("./directives/user-list.directive"))
user.directive("userDetails", require("./directives/user-details.directive"))
user.directive("userGroupedit", require("./directives/user-groupedit.directive"))

module.exports = user.name;
