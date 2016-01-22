/* @ngInject */
module.exports = function userDetailsDirective() {
    return {
        scope: {},
        restrict: 'E',
        template: require('../views/user-details.html'),
        controller: require('../controllers/user-details.controller'),
        controllerAs: 'vm',
    };
}