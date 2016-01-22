(function () {

    'use strict';
    //using
    homeAppController.$inject = ['overviewService', 'eventService', '$rootScope'];

    //namespace
    angular
        .module('controllers.module')
        .controller('homeAppController', homeAppController);

    //class
    function homeAppController(overviewService, eventService, $rootScope) {
        var vm = this;
        var numLoad = 10;
        vm.loadMore = loadMore;


        activate();
        function activate() {
            overviewService.getOverview().then(function (results) {
                vm.alunos = results.totalAlunos || 0;
                vm.turmas = results.totalTurmas || 0;
                vm.aulas = results.totalAulas || 0;
            });
            load();
        }

        //public methods
        function loadMore() {
            numLoad++;
            load();
        }

        //private methods
        function load() {
            var panel = $("#panelUpdates"),
                whirlClass = 'whirl';
            // start showing the spinner
            panel.addClass(whirlClass + ' standard');

            eventService.getLatestActivities(numLoad).then(function (results) {
                vm.events = results;
                panel.removeClass(whirlClass);
            });
        }
    }
})();