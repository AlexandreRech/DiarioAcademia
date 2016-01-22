/* @ngInject */
module.exports = function layoutWrapper($stateProvider) {
    $stateProvider
            .state("app", {
                url: '/app',
                'abstract': true,
                redirect: "app.home",
                template: "<layout></layout>",
                resolve: {
                    lazyLoad: require('ndd-lazy!./layout.module')
                }
            })
            .state('app.home', {
                name: 'app.home',
                url: '/home',
                title: 'Home',
                template: require("../layout/views/home.html")
            });
};