(function () {

    "use strict";
    //using
    alunoDetailsCtrl.$inject = ["alunoService", "turmaService", "$stateParams", "$state", "$scope", "cepService"];

    //namespace
    angular
        .module("controllers.module")
        .controller("alunoDetailsCtrl", alunoDetailsCtrl);

    //class
    function alunoDetailsCtrl(alunoService, turmaService, params, $state, $scope, cepService) {
        var vm = this;
        vm.title = "";
        vm.aluno = { endereco: { cep: "" } }; 
        vm.turmas = [];

        //script load
        activate();

        function activate() {
            makeRequest();
            $scope.$watch(angular.bind(this, function () {
                if (vm.aluno.endereco)
                    return vm.aluno.endereco.cep;
                return vm.aluno.cep;
            }), function (newVal) {
                if (newVal) {
                    cepService.getEndereco(newVal).then(function (result) {
                        vm.aluno.endereco.bairro = result.bairro;
                        vm.aluno.endereco.localidade = result.localidade;
                        vm.aluno.endereco.uf = result.uf;
                    });
                }
            });
        }

        //public methods
        vm.save = function () {
            alunoService.edit(vm.aluno).then(function () {
                $state.go('app.aluno.list');
            });
        };

        //private methods
        function makeRequest() {
            turmaService.getTurmas() .then(function (dataTurmas) {
               alunoService.getAlunoById(params.alunoId)
                   .then(function (resultsAluno) {

                       vm.turmas = dataTurmas;
                       getTurma(resultsAluno);
                       vm.aluno = resultsAluno;
                       vm.title = vm.aluno.nome;
                   });
           });

        }

        function getTurma(resultsAluno) {
            for (var i = 0; i < vm.turmas.length; i++) {
                if (vm.turmas[i].id == resultsAluno.turma.id) {
                    resultsAluno.turma = vm.turmas[i];
                    break;
                }
            }
        }
    }
})();