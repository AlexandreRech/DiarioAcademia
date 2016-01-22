var group = angular.module('app.group', [
    require("../../components/ndd-head/ndd-head.module"),
    require("../../components/ndd-table/ndd-table.module"),
    require("../../common/changes/changes.module")
]);

group.service("groupService", require("./group.service"));
group.directive("groupList", require("./directives/group-list.directive"));
group.directive("groupCreate", require("./directives/group-create.directive"));
group.directive("groupEdit", require("./directives/group-edit.directive"));
group.directive("groupEditPermission", require("./directives/group-edit-permission.directive"));

module.exports = group.name;