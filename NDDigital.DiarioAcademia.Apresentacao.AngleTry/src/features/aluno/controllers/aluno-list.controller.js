(function (angular) {
    'use strict';
    //using
    alunoListController.$inject = ["alunoService", "$state"];

    //namespace
    angular
        .module("app.aluno")
        .controller("alunoListController", alunoListController);

    //class
    function alunoListController(alunoService, $state) {
        var vm = this;
        vm.title = "Lista de Alunos";
        vm.classe = "selecionado";

        vm.criterioDeBusca = "";

        //script load
        activate();

        function activate() {
            makeRequest();
        }


        //public methods
        vm.edit = edit;
        vm.remove = remove;

        function edit(aluno) {
            if (aluno)
                $state.go('app.aluno.details', { alunoId: aluno.id });
        }

       function remove(aluno) {
            if (!aluno)
                return;
            alunoService.delete(aluno).then(function () {
                makeRequest();
            });
        }

        //private methods
        function makeRequest() {
            alunoService.getAlunos().
                then(function (data) {
                    vm.alunos = data;
                });
        };
    }
}(window.angular));