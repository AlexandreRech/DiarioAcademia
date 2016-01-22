var automapper = angular.module('app.automapper', []);
automapper.factory("automapper", require("./automapper.factory"));
module.exports = automapper.name;