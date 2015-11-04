(function (angular) {
    'use strict';

   angular
        .module('app.permission')
        .config(configRoutes);

    configRoutes.$inject = ['RouteHelpersProvider', '$stateProvider'];


    function configRoutes(helper, $stateProvider) {
        $stateProvider.state('app.permission', {
            url: '/permission',
            templateUrl: 'src/features/permission/manager-permission.html',
            resolve: helper.resolveFor('app.permission', 'app.aluno', 'app.turma', 'app.aula', 'app.chamada'),
            controller: "managerPermissionController as vm"
        })
    }

})(window.angular);