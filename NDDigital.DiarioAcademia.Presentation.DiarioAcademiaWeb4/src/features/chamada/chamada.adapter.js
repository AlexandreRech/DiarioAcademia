/* @ngInject */
module.exports = function chamadaAdapter(automapper) {
    var factory = this;

    init();
    function init() {
        automapper.createMap("chamadaAlunoDto", "aluno")
                 .forMember("alunoId", function () { return this.alunoId; })
                 .forMember("nome", function () { return this.nome.replace('Aluno', ""); })
                 .forMember("status", function () { return this.status == "C"; })

        automapper.createMap("aluno", "chamadaAlunoDto")
            .forMember("alunoId", function () { return this.alunoId; })
            .forMember("nome", function () { return this.nome.replace('Aluno', ""); })
            .forMember("status", function () { return !this.status ? "F" : "C" })


        automapper.createMap("chamadaDto", "chamada")
                 .forMember("anoTurma", function () { return this.anoTurma; })
                 .forMember("aulaId", function () { return this.aulaId; })
                 .forMember("chamadaRealizada", function () { return this.chamadaRealizada; })
                 .forMember("data", function () { return this.data; })
                 .forMember("alunos", function () {
                     return $.map(this.alunos, function (item) {
                         var result = {};
                         automapper.map("chamadaAlunoDto", "aluno", item, result);
                         return result;
                     });
                 });

        automapper.createMap("chamada", "chamadaDto")
                   .forMember("id", function () { return this.id })
                   .forMember("turmaId", function () { return this.turma.id })
                   .forMember("data", function () { return this.aula.dataAula; })
                   .forMember("aulaId", function () { return this.aula.id; })
                   .forMember("alunos", function () {
                       return $.map(this.alunos, function (item) {
                           var result = {};
                           automapper.map("aluno", "chamadaAlunoDto", item, result);
                           return result;
                       });
                   });
    }

    //public methods
    factory.toChamada = function (obj) {
        var result = {};
        automapper.map("chamadaDto", "chamada", obj, result);
        return result;
    };

    factory.toChamadaDto = function (obj) {
        var result = {};
        automapper.map("chamada", "chamadaDto", obj, result);
        return result;
    }

    return factory;
}