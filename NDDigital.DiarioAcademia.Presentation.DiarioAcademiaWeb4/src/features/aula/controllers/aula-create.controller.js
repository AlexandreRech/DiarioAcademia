/* @ngInject */
module.exports = function aulaCreateController(aulaService, turmaService, $state, $translate, SweetAlert) {
    var vm = this;
    vm.title = "Cadastro de Aulas";

    activate();
    function activate() {
        turmaService.getTurmas().then(function (data) {
            vm.turmas = data;
        });
    }

    vm.save = function () {
        SweetAlert.swal({
            title: $translate.instant('confirm.CONFIRM_CREATE'),
            text: $translate.instant('confirm.CONFIRM_CREATE_LESSON', { lessonDate: new Date(vm.aula.data).toLocaleDateString('pt-BR') }),
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
        vm.aula = {};
        vm.aulaForm.$setPristine();
    }

    return vm;

    //private methods
    function convertAulaToDto(aula) {
        return {
            id: aula.id,
            dataAula: aula.data,
            anoTurma: aula.turma.ano,
            turmaId: aula.turma.id
        };
    }

    function actionCreate(isConfirm) {
        if (!isConfirm) {
            SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                            $translate.instant('info.LESSON_NOT_CREATE'), 'error');
            return;
        }
        aulaService.save(convertAulaToDto(vm.aula)).then(function () {
            SweetAlert.swal($translate.instant('status.SUCCESS'),
                          $translate.instant('info.LESSON_CREATE'), "success");
            $state.go('app.aula.list');
        });
    }
}
