var sidebar = angular.module('app.sidebar', [
    require("../../common/utils/utils.module")
]);

sidebar.service('SidebarLoader', require("./sidebar.service"));
sidebar.directive('sidebar', require("./sidebar.directive"));

module.exports = sidebar.name;