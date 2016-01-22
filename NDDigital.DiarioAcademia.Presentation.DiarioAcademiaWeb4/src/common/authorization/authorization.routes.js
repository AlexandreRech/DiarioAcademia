/* @ngInject */
module.exports = function configRoutes($stateProvider) {
    $stateProvider.state('app.authorization', {
        url: '/authorization/claims',
        template: '<autho-claims></autho-claims>',
        authorization: "authorization"
    })
}