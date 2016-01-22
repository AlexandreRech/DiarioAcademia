var metadata = angular.module('app.metadata', []);
metadata.service('metadataService', require("./metadata.service"));
module.exports = metadata.name;