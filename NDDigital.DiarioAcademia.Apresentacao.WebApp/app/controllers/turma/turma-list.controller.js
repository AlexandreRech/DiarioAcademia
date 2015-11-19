(function (angular) {

    "use strict";
    //using

    turmaListCtrl.$inject = ["turmaService", "$state"];

    //namespace
    angular
        .module("controllers.module")
        .controller("turmaListCtrl", turmaListCtrl);

    //class
    function turmaListCtrl(turmaService, $state) {
        var vm = this;
        vm.title = "Lista das Turmas";
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
                vm.turmaSelecionada = value;
        }

        function edit() {
            if (vm.turmaSelecionada)
                $state.go('app.turma.details', { turmaId: vm.turmaSelecionada.id });
        }

        function remove() {
            if (!vm.turmaSelecionada)
                return;
            turmaService.delete(vm.turmaSelecionada).then(function () {
                makeRequest();
                vm.turmaSelecionada = {};
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