/* @ngInject */
module.exports = function turmaListDirective() {
    return {
        restrict: 'E',
        template: require('../views/turma-list.html'),
        controller: require('../controllers/turma-list.controller'),
        controllerAs: 'vm',
        scope: {}
    };

}