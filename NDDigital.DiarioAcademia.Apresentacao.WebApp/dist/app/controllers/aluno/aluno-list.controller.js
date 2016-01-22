(function (angular) {
    'use strict';
    //using
    alunoListCtrl.$inject = ["alunoService", "$state"];

    //namespace
    angular
        .module("controllers.module")
        .controller("alunoListCtrl", alunoListCtrl);

    //class
    function alunoListCtrl(alunoService, $state) {
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
        vm.onClick = onClick;
        vm.edit = edit;
        vm.remove = remove;


        function onClick(value) {
            if (value)
                vm.alunoSelecionado = value;
        }

        function edit() {
            if (vm.alunoSelecionado)
                $state.go('app.aluno.details', { alunoId: vm.alunoSelecionado.id });
        }

       function remove() {
            if (!vm.alunoSelecionado)
                return;
            alunoService.delete(vm.alunoSelecionado).then(function () {
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