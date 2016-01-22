(function (angular) {
    'use strict';
    //using
    aulaListCtrl.$inject = ["aulaService"];

    //namespace
    angular
        .module("controllers.module")
        .controller("aulaListCtrl", aulaListCtrl);

    //class
    function aulaListCtrl(aulaService, $state) {
        var vm = this;
        vm.title = "Lista de Aulas";
        vm.classe = "selecionado";

        vm.criterioDeBusca = "";

        //script load
        activate();

        function activate() {
            makeRequest();
        }

        //public method
        vm.delete = remove;
        vm.onClick = onClick;


        function onClick(value) {
            if (value)
                vm.aulaSelecionada = value;
        }

        function remove() {
            if (!vm.aulaSelecionada)
                return;
            aulaService.delete(vm.aulaSelecionada).then(function () {
                makeRequest();
            });
        }

        //private methods
        function makeRequest() {
            aulaService.getAulas().then(function (data) {
                vm.aulas = data;
            });
        };
    }
}(window.angular));