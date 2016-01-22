(function (angular) {

    'use strict';
    //using
    aulaCreateCtrl.$inject = ["aulaService","turmaService", "$state"];

    //namespace
    angular
        .module("controllers.module")
        .controller("aulaCreateCtrl", aulaCreateCtrl);

    //class
    function aulaCreateCtrl(aulaService,turmaService, $state) {
        var vm = this;
        vm.title = "Cadastro de Aulas";
        activate();

        function activate() {
            turmaService.getTurmas()
                .then(function (data) {
                    vm.turmas = data;
                });
        }

        vm.save = function () {
            aulaService.save(convertAulaToDto(vm.aula));
            vm.clearFields();
        };

        vm.clearFields = function () {
            vm.aula = {};
            vm.aulaForm.$setPristine();
        }

        function convertAulaToDto(aula) {
            return {
                id: aula.id,
                dataAula: aula.data,
                anoTurma: aula.turma.ano,
                turmaId: aula.turma.id
            };
        }
    }
}(window.angular));
