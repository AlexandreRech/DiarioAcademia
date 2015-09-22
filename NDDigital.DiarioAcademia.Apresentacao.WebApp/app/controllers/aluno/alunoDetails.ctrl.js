﻿(function () {

    "use strict";
    //using
    alunoDetailsCtrl.$inject = ["alunoService", "turmaService", "$stateParams", "$state","$scope", "cepService"];

    //namespace
    angular
        .module("controllers.module")
        .controller("alunoDetailsCtrl", alunoDetailsCtrl);

    //class
    function alunoDetailsCtrl(alunoService, turmaService, params, $state, $scope, cepService) {
        var vm = this;
        vm.title = "Atualização de Alunos";
        vm.aluno = { endereco: { cep: "" } }; //Graças ao DTO tive que inicializar com um CEP para o serviço funcionar
        vm.turmas = [];
        
        //script load
        activate();

        function activate() {
            alunoService.getAlunoById(params.alunoId)
                .then(function (results) {
                    vm.aluno = convertDtoToAluno(results);
                });

            turmaService.getTurmas()
               .then(function (data) {
                   vm.turmas = data;
               });
        }

        //public methods
        vm.save = function () {
            alunoService.edit(convertDto(vm.aluno)).then(function () {
                $state.go('aluno.list');
            });
            vm.clearFields();
        };

        vm.clearFields = function () {
            vm.aluno = {};
            vm.aluno = { endereco: { cep: "" } };
            vm.alunoForm.$setPristine();
        }

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
                })
            }
        });

        //private methods
        function convertDto(aluno) {
            return {
                id: aluno.id,
                turmaId: aluno.turmaId,
                descricao: aluno.nome + ": Presenças: 0, Faltas: 0 ",
                cep: aluno.endereco.cep,
                bairro: aluno.endereco.bairro,
                localidade: aluno.endereco.localidade,
                uf: aluno.endereco.uf
            };
        }

        function getTurmaById(id) {
            for (var i = 0; i < vm.turmas.length; i++) {
                if (vm.turmas[i].id == id) {
                    return vm.turmas[i];
                }
            }
        }

        function convertDtoToAluno(alunoDto) {
            return {
                id: alunoDto.id,
                nome: alunoDto.nome.split(':')[0],
                turma: getTurmaById(alunoDto.turma.id),
                endereco: {
                    cep: alunoDto.endereco.cep,
                    bairro: alunoDto.endereco.bairro,
                    localidade: alunoDto.endereco.localidade,
                    uf: alunoDto.endereco.uf
                }
            };
        }

    }

})();