var aluno = angular.module('app.aluno', [
    require("angular-loading-bar"),
    require("../../common/cep/cep.module"),
    require("../../components/ndd-table/ndd-table.module"),
    require("../../components/ndd-head/ndd-head.module"),
    require("../../features/turma/turma.module")
]);

aluno.factory('alunoAdapter', require("./aluno.adapter"));
aluno.service('alunoService', require("./aluno.service"));
aluno.directive("alunoList", require("./directives/aluno-list.directive"));
aluno.directive("alunoCreate", require("./directives/aluno-create.directive"));
aluno.directive("alunoDetails", require("./directives/aluno-details.directive"));

module.exports = aluno.name;