var extentions = angular.module('extentions', []);

extentions.run(require("./string"));
extentions.run(require("./array"));

module.exports = extentions.name;