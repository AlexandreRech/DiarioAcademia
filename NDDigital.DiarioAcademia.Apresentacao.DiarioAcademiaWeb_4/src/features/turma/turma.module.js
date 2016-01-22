var turma = angular.module('app.turma', [
    require('common/layout/layout.module'),
    require('../../components/ndd-head/ndd-head.module'),
    require("../../components/ndd-table/ndd-table.module")
]);

turma.service("turmaService", require("./turma.service"));
turma.directive("turmaList", require("./directives/turma-list.directive"));
turma.directive("turmaCreate", require("./directives/turma-create.directive"));
turma.directive("turmaDetails", require("./directives/turma-details.directive"));

module.exports = turma.name;
