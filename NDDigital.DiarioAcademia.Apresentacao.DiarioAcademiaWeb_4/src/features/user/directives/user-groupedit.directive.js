/* @ngInject */
module.exports = function userCreateDirective() {
    return {
        scope: {},
        restrict: 'E',
        template: require('../views/user-edit-group.html'),
        controller: require('../controllers/user-edit-group.controller'),
        controllerAs: 'vm'
    };
}