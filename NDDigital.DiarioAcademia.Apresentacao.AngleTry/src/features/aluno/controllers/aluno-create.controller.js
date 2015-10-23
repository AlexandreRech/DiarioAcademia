(function (angular) {

    'use strict';
    //using
    alunoCreateController.$inject = ["alunoService", "turmaService", "cepService", "$state", "$scope"];

    //namespace
    angular
        .module("app.aluno")
        .controller("alunoCreateController", alunoCreateController);

    //class
    function alunoCreateController(alunoService, turmaService, cepService, $state, $scope) {
        var vm = this;
        vm.aluno = { endereco: { cep: "" } }; //Standard DTO requires initialize attrs cep
        vm.title = "Cadastro de Alunos";
        activate();

        function activate() {
            turmaService.getTurmas()
                .then(function (data){
                    vm.turmas = data;
                });        
        }

        vm.save = function () {
            alunoService.save(vm.aluno).then(function () {
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
            if(vm.aluno)
            return vm.aluno.endereco.cep;
        }), function (newVal) {
            if (newVal) {
                cepService.getEndereco(newVal).then(function (result) {
                    vm.aluno.endereco.bairro = result.bairro;
                    vm.aluno.endereco.localidade = result.localidade;
                    vm.aluno.endereco.uf = result.uf;
                }).catch(function () {
                    vm.clearFields();
                    console.clear();
                    alert("CEP INVÁLIDO!");
                });
            }
        });
    }
}(window.angular));
