(function () {
    "use strict";
    //using
    turmaDetailsController.$inject = ["turmaService", "$stateParams", "$state"];

    //namespace
    angular
        .module("app.turma")
        .controller("turmaDetailsController", turmaDetailsController);

    //class
    function turmaDetailsController(turmaService, params, $state) {
        var vm = this;
        vm.title = "Atualização de Turma";
        vm.turma = {};

        //script load
        activate();
        function activate() {
            turmaService.getTurmaById(params.turmaId)
                .then(function (results) {
                    vm.turma = results;
                });     
        }

        //public methods
        vm.save = function () {
            turmaService.edit(vm.turma);
            vm.clearFields();
        };

        vm.clearFields = function () {
            vm.turma = {};
            vm.turmaForm.$setPristine();
        }
    }
})();