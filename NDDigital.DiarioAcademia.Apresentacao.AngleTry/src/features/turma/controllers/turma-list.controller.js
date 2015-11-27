(function (angular) {

    "use strict";
    //using

    turmaListController.$inject = ["turmaService", "$state", '$translate', 'SweetAlert'];

    //namespace
    angular
        .module("app.turma")
        .controller("turmaListController", turmaListController);

    //class
    function turmaListController(turmaService, $state, $translate, SweetAlert) {
        var vm = this;


        //script load
        activate();

        function activate() {
            makeRequest();
        }

        //public methods 
        vm.edit = edit;
        vm.remove = remove;

        function edit(turma) {
            if (turma)
                $state.go('app.turma.details', { turmaId: turma.id });
        }

        function remove(turma) {
            if (!turma)
                return;
            vm.turma = turma;
            SweetAlert.swal({
                title: $translate.instant('confirm.CONFIRM_DELETE'),
                text: $translate.instant('confirm.CONFIRM_DELETE_CLASS', { classDescription: turma.descricao }),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: $translate.instant('action.OK').toUpperCase(),
                cancelButtonText: $translate.instant('action.CANCEL').toUpperCase(),
                closeOnConfirm: false,
                closeOnCancel: false
            }, actionRemove);      
        }

        //private methods
        function makeRequest() {
            turmaService.getTurmas().then(function (data) {
                vm.turmas = data;
            });
        };


        function actionRemove(isConfirm) {
            if (!isConfirm) {
                SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                                $translate.instant('info.CLASS_NOT_DELETED'), 'error');
                return;
            }
            turmaService.delete(vm.turma).then(function (results) {
                makeRequest();
                SweetAlert.swal($translate.instant('status.SUCCESS'),
                                $translate.instant('info.CLASS_DELETED'), "success");
            }).catch(function () {
                swal.close();
            });

        }
    }
}(window.angular));