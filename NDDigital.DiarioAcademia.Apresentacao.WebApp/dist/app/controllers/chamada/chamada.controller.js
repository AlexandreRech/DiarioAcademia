(function (angular) {

    'use strict';
    //using
    chamadaController.$inject = ["chamadaService", "aulaService", "turmaService", "$translate"];

    //namespace
    angular.module("controllers.module").controller("chamadaController", chamadaController);

    //class
    function chamadaController(chamadaService, aulaService, turmaService, $translate) {
        var vm = this;

        vm.alunos = [];
        vm.turmas = [];
        vm.aulas = [];
        vm.turmaSelected = false;
        vm.aulaSelected = false;


        activate();
        function activate() {
            turmaService.getTurmas().then(function (data) {
                vm.turmas = data;

                aulaService.getAulas().then(function (data) {
                    vm.allAulas = data;
                });
            });
        }

        //public methods
        vm.save = function () {
            vm.chamada.alunos = vm.alunos;

            chamadaService.realizarChamada(vm.chamada).then(function () {
                clearFields();
            });
        };

        vm.populateAulas = function (turma) {
            if (turma) {
                vm.getAulaByTurma(turma);
                vm.turmaSelected = true;
                vm.aulaSelected = false;
            }
        }

        vm.getChamada = function () {
            vm.alunos = [];
            if (vm.chamada.aula) {
                chamadaService.getChamadaByAula(vm.chamada.aula.id).then(function (data) {
                    vm.chamadaDto = data;
                    if (vm.chamadaDto)
                        vm.alunos = vm.chamadaDto.alunos;
                });
            }
            vm.aulaSelected = true;
        }

        vm.getAulaByTurma = function (turma) {
            vm.aulas = [];
            for (var i = 0; i < vm.allAulas.length; i++) {
                if (turma) {
                    if (vm.allAulas[i].turmaId == turma.id) {
                        vm.aulas.push(vm.allAulas[i]);
                    }
                }
            }
        }

        //private methods
        function clearFields() {
            vm.chamada = {};
            vm.alunos = [];
            vm.aulas = [];
            vm.turmaSelected = false;
            vm.aulaSelected = false;
        }
    }
}(window.angular));
