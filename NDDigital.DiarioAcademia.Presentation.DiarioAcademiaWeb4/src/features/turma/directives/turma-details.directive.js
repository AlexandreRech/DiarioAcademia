/* @ngInject */
module.exports = function turmaDetailsDirective() {
    return {
        scope: {},
        restrict: 'E',
        template: require('../views/turma-details.html'),
        controller: require('../controllers/turma-details.controller'),
        controllerAs: 'vm',
    };
}