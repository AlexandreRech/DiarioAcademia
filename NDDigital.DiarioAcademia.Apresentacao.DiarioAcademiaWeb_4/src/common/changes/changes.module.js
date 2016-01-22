var changes = angular.module('app.changes', []);
changes.factory("changesFactory", require("./changes.factory"))
module.exports = changes.name;