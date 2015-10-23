(function (angular) {
    'use strict';
    //using
    aulaListController.$inject = ["aulaService"];

    //namespace
    angular
        .module("app.aula")
        .controller("aulaListController", aulaListController);

    //class
    function aulaListController(aulaService, $state) {
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
        vm.remove = remove;

        function remove(entity) {
            if (!entity)
                return;
            aulaService.delete(entity).then(function () {
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