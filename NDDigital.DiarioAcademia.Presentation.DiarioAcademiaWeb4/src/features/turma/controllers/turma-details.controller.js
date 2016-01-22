/* @ngInject */
module.exports = function turmaDetailsController(turmaService, $stateParams, $state, $translate, SweetAlert) {
    var vm = this;
    vm.title = "Atualização de Turma";
    vm.turma = {};

    //script load
    activate();
    function activate() {
        turmaService.getTurmaById($stateParams.turmaId)
            .then(function (results) {
                vm.turma = results;
            });
    }

    //public methods
    vm.save = function () {

        SweetAlert.swal({
            title: $translate.instant('confirm.CONFIRM_EDIT'),
            text: $translate.instant('confirm.CONFIRM_EDIT_CLASS', { classDescription: vm.turma.descricao }),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: $translate.instant('action.OK').toUpperCase(),
            cancelButtonText: $translate.instant('action.CANCEL').toUpperCase(),
            closeOnConfirm: false,
            closeOnCancel: false
        }, actionEdit);

    };

    vm.clearFields = function () {
        vm.turma = {};
        vm.turmaForm.$setPristine();
    }


    //private methods
    function actionEdit(isConfirm) {
        if (!isConfirm) {
            SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                            $translate.instant('info.CLASS_NOT_EDITED'), 'error');
            return;
        }
        turmaService.edit(vm.turma).then(function () {
            SweetAlert.swal($translate.instant('status.SUCCESS'),
                          $translate.instant('info.CLASS_EDITED'), "success");
            $state.go('app.turma.list');
        });
    }
}