/* @ngInject */
module.exports = function alunoListController(alunoService, $state, $translate, SweetAlert) {
    var vm = this;
    vm.criterioDeBusca = "";
    vm.edit = edit;
    vm.remove = remove;

    //script load
    activate();
    function activate() {
        makeRequest();
    }

    return vm;

    //public methods
    function edit(aluno) {
        if (aluno)
            $state.go('app.aluno.details', { alunoId: aluno.id });
    }

    function remove(aluno) {
        if (!aluno)
            return;
        vm.aluno = aluno;

        SweetAlert.swal({
            title: $translate.instant('confirm.CONFIRM_DELETE'),
            text: $translate.instant('confirm.CONFIRM_DELETE_STUDENT', { studentName: vm.aluno.name }),
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
        alunoService.getAlunos().
            then(function (data) {
                vm.alunos = data;
            });
    };

    function actionRemove(isConfirm) {
        if (!isConfirm) {
            SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                            $translate.instant('info.STUDENT_NOT_DELETED'), 'error');
            return;
        }
        alunoService.remove(vm.aluno).then(function () {
            makeRequest();
            SweetAlert.swal($translate.instant('status.SUCCESS'),
                            $translate.instant('info.STUDENT_DELETED'), "success");
        });
    }
}