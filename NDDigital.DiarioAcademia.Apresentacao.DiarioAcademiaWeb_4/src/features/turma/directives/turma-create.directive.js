/* @ngInject */
module.exports = function turmaCreateDirective() {
    return {
        scope: {},
        restrict: 'E',
        template: require('../views/turma-create.html'),
        controller: require('../controllers/turma-create.controller'),
        controllerAs: 'vm'
    };
}