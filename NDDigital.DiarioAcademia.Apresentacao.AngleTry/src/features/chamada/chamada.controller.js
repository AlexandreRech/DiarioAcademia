(function (angular) {

    'use strict';
    //using
    chamadaController.$inject = ["chamadaService", "aulaService", "turmaService", "$translate", "SweetAlert"];

    //namespace
    angular.module("app.chamada").controller("chamadaController", chamadaController);

    //class
    function chamadaController(chamadaService, aulaService, turmaService, $translate, SweetAlert) {
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

            SweetAlert.swal({
                title: $translate.instant('confirm.CONFIRM_CREATE'),
                text: $translate.instant('confirm.CONFIRM_CREATE_CLASS_REGISTER', {
                    dateClassRegister: new Date(vm.chamada.aula.dataAula).toLocaleDateString('pt-BR')
                }),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: $translate.instant('action.OK').toUpperCase(),
                cancelButtonText: $translate.instant('action.CANCEL').toUpperCase(),
                closeOnConfirm: false,
                closeOnCancel: false
            }, actionCreate);
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
                        vm.alunos = checkStatus(vm.chamadaDto, vm.chamadaDto.alunos);
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
        function checkStatus(chamadaDto, alunos) {
            var index;
            for (var j = 0; j < alunos.length; j++) {
                alunos[j].status = alunos[j].status != "F";
            }
            return alunos;
        }


        function clearFields() {
            vm.chamada = {};
            vm.alunos = [];
            vm.aulas = [];
            vm.turmaSelected = false;
            vm.aulaSelected = false;
        }

        function actionCreate(isConfirm) {
            if (!isConfirm) {
                SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                                $translate.instant('info.CLASS_REGISTER_NOT_CREATE'), 'error');
                return;
            }
            chamadaService.realizarChamada(vm.chamada).then(function () {
                SweetAlert.swal($translate.instant('status.SUCCESS'),
                              $translate.instant('info.CLASS_REGISTER_CREATE'), "success");
                clearFields();
            });
        }
    }
}(window.angular));
