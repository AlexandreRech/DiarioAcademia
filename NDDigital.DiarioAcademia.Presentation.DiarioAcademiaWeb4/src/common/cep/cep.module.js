var cep = angular.module('app.cep', []);
cep.service("cepService", require("./cep.service"));
module.exports = cep.name;