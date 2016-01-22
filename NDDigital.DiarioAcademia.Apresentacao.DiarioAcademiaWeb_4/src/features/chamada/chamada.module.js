var chamada = angular.module('app.chamada', [
    require("angular-loading-bar"),
    require("../../common/logger/logger.module"),
    require("../../components/ndd-head/ndd-head.module"),
    require("../../components/ndd-table/ndd-table.module"),
    require("../turma/turma.module"),
    require("../aula/aula.module"),
    require("../aluno/aluno.module")

]);

chamada.factory("chamadaAdapter", require("./chamada.adapter"));
chamada.service("chamadaService", require("./chamada.service"));
chamada.directive("chamada", require("./directives/chamada.directive"));

module.exports = chamada.name;