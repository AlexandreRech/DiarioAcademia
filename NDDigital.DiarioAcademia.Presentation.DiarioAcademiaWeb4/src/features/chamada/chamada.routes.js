/* @ngInject */
module.exports = function configRoutes($stateProvider) {
    $stateProvider.state('app.chamada', {
        url: '/chamada',
        template: "<chamada></chamada>",
        resolve: {
            lazyload: require("ndd-lazy!./chamada.module")
        },
        authorization: "chamada"
    });
}