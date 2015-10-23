(function (angular) {

    "use strict";
    //using

    turmaCreateController.$inject = ["turmaService", "$state"];

    //namespace
    angular
        .module("app.turma")
        .controller("turmaCreateController", turmaCreateController);

    //class
    function turmaCreateController(turmaService, $state) {
        var vm = this;
        vm.title = "Cadastro de Turma";
        vm.turma = {};

        //public methods
        vm.save = function () {            
            turmaService.save(vm.turma);
            vm.clearFields();
        };

        vm.clearFields = function () {
            vm.turma = {};
            vm.turmaForm.$setPristine();
        }
    }
}(window.angular));