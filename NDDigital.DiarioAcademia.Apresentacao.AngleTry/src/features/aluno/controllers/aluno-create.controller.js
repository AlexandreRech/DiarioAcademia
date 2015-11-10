(function (angular) {

    'use strict';
    //using
    alunoCreateController.$inject = ["alunoService", "turmaService", "cepService", "$state", "$scope", "$translate", "SweetAlert"];

    //namespace
    angular
        .module("app.aluno")
        .controller("alunoCreateController", alunoCreateController);

    //class
    function alunoCreateController(alunoService, turmaService, cepService, $state, $scope, $translate, SweetAlert) {
        var vm = this;
        vm.aluno = { endereco: { cep: "" } }; //Standard DTO requires initialize attrs cep
        vm.title = "Cadastro de Alunos";
        activate();

        function activate() {
            turmaService.getTurmas()
                .then(function (data){
                    vm.turmas = data;
                });

            $scope.$watch(angular.bind(this, function () {
                if (vm.aluno)
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

        //public methods
        vm.save = function () {
            SweetAlert.swal({
                title: $translate.instant('confirm.CONFIRM_CREATE'),
                text: $translate.instant('confirm.CONFIRM_CREATE_STUDENT', { studentName: vm.aluno.nome }),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: $translate.instant('action.OK').toUpperCase(),
                cancelButtonText: $translate.instant('action.CANCEL').toUpperCase(),
                closeOnConfirm: false,
                closeOnCancel: false
            }, actionCreate);
        };

        vm.clearFields = function () {
            vm.aluno = {};
            vm.aluno = { endereco: { cep: "" } };
            vm.alunoForm.$setPristine();
        }

     

        //private methods
        function actionCreate(isConfirm) {
            if (!isConfirm) {
                SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                                $translate.instant('info.STUDENT_NOT_CREATE'), 'error');
                return;
            }
            alunoService.save(vm.aluno).then(function () {
                SweetAlert.swal($translate.instant('status.SUCCESS'),
                              $translate.instant('info.STUDENT_CREATE'), "success");
                $state.go('app.aluno.list');
            });
        }
    }
}(window.angular));
