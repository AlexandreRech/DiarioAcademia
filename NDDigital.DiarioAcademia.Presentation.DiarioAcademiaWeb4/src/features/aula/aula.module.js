var aula = angular.module('app.aula', [
    require("angular-loading-bar"),
    require("../../components/ndd-table/ndd-table.module"),
    require("../../components/ndd-head/ndd-head.module"),
    require("../turma/turma.module")

]);

aula.service('aulaService', require("./aula.service"));
aula.directive('aulaList', require("./directives/aula-list.directive"));
aula.directive('aulaCreate', require("./directives/aula-create.directive"));

module.exports = aula.name;