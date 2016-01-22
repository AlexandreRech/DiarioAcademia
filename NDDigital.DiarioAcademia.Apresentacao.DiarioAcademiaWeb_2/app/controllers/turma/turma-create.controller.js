(function (angular) {

    "use strict";
    //using

    turmaCreateCtrl.$inject = ["turmaService", "$state"];

    //namespace
    angular
        .module("controllers.module")
        .controller("turmaCreateCtrl", turmaCreateCtrl);

    //class
    function turmaCreateCtrl(turmaService, $state) {
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