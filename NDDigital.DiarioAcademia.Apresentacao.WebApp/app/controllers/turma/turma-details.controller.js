(function () {
    "use strict";
    //using
    turmaDetailsCtrl.$inject = ["turmaService", "$stateParams", "$state"];

    //namespace
    angular
        .module("controllers.module")
        .controller("turmaDetailsCtrl", turmaDetailsCtrl);

    //class
    function turmaDetailsCtrl(turmaService, params, $state) {
        var vm = this;
        vm.title = "Atualização de Turma";
        vm.turma = {};

        //script load
        activate();
        function activate() {
            turmaService.getTurmaById(params.turmaId)
                .then(function (results) {
                    vm.turma = results;
                    vm.turmaShow = $.extend({}, vm.turma);
                });     
        }

        //public methods
        vm.save = function () {
            turmaService.edit(vm.turma).then(function () {
                $state.go("app.turma.list");
            });
        };

        vm.clearFields = function () {
            vm.turma.ano = undefined;
        }
    }
})();