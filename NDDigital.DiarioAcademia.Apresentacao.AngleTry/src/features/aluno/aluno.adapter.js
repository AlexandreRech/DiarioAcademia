(function () {

    'use strict';
    //using
    adapter.$inject = ["automapper"];

    //namespace
    angular.module('app.aluno').factory('alunoAdapter', adapter);

    //class
    function adapter(automapper) {
        var factory = {};

        init();
        function init() {
            automapper.createMap("aluno", "alunoDto")
                        .forMember("id", function () { return this.id })
                        .forMember("descricao", function () { return "Aluno " + this.nome + ": " + "Presencas: " + this.presencas + ", Faltas: " + this.faltas })
                        .forMember("turmaId", function () { return this.turma.id; })
                        .forMember("cep", function () { return this.endereco.cep; })
                        .forMember("bairro", function () { return this.endereco.bairro; })
                        .forMember("localidade", function () { return this.endereco.localidade; })
                        .forMember("uf", function () { return this.endereco.uf; })
                        .ignore("endereco")
                        .ignore("turma")
                        .forAllMembers(function (property) { return this[property]; });

            automapper.createMap("alunoDto", "aluno")
               .forMember("id", function () { return this.id })
               .forMember("nome", function () { return this.descricao.replace('Aluno', '').split(":")[0]; })
               .forMember("presencas", function () { return this.descricao.replace('Aluno ', '').replace(',', ':').split(":")[2]; })
               .forMember("faltas", function () { return this.descricao.replace('Aluno', '').replace(',', ':').split(":")[4]; })
               .forMember("turma", function () { return { id: this.turmaId }; })
               .forMember("endereco", function () {
                   return {
                       cep: this.cep,
                       bairro: this.bairro,
                       localidade: this.localidade,
                       uf: this.uf
                   };
               });
        }

        //public methods
        factory.makeTurmaDto = function (obj) {         
            return { ano: turma.ano };        
        };

        factory.toAlunoDto = function (obj) {
            var result = {};

            automapper.map("aluno", "alunoDto", obj, result);

            return result;
        };

        factory.convertBack = function (obj) {
            var result = {};
            automapper.map("alunoDto", "aluno", obj, result);
            return result;
        };

        return factory;
    }

})();