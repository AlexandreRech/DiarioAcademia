/* @ngInject */
module.exports = function userListDirective() {
    return {
        restrict: 'E',
        template: require('../views/user-list.html'),
        controller: require('../controllers/user-list.controller'),
        controllerAs: 'vm',
        scope: {}
    };

}