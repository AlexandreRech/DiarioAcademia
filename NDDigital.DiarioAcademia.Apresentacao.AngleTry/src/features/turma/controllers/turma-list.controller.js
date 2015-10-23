(function (angular) {

    "use strict";
    //using

    turmaListController.$inject = ["turmaService", "$state"];

    //namespace
    angular
        .module("app.turma")
        .controller("turmaListController", turmaListController);

    //class
    function turmaListController(turmaService, $state) {
        var vm = this;
        vm.title = "Lista das Turmas";
        vm.classe = "selecionado";

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
            turmaService.delete(turma).then(function () {
                makeRequest();
            });
        }

        //private methods
        function makeRequest() {
            turmaService.getTurmas().
                then(function (data) {
                    vm.turmas = data;
                });
        };
    }
}(window.angular));