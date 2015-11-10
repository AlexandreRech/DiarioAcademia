(function (angular) {

    "use strict";
    //using

    turmaCreateController.$inject = ["turmaService", "$state", '$translate', "SweetAlert"];

    //namespace
    angular
        .module("app.turma")
        .controller("turmaCreateController", turmaCreateController);

    //class
    function turmaCreateController(turmaService, $state, $translate, SweetAlert) {
        var vm = this;
        vm.turma = {};

        //public methods
        vm.save = function () {
            SweetAlert.swal({
                title: $translate.instant('confirm.CONFIRM_CREATE'),
                text: $translate.instant('confirm.CONFIRM_CREATE_CLASS', { classDescription: vm.turma.descricao }),
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
            vm.turma = {};
            vm.turmaForm.$setPristine();
        }

        //private methods
        function actionCreate(isConfirm) {
            if (!isConfirm) {
                SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                                $translate.instant('info.CLASS_NOT_CREATE'), 'error');
                return;
            }
            turmaService.save(vm.turma).then(function () {
                SweetAlert.swal($translate.instant('status.SUCCESS'),
                              $translate.instant('info.CLASS_CREATE'), "success");
                $state.go('app.turma.list');
            });
        }
    }
}(window.angular));