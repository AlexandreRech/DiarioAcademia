/* @ngInject */
module.exports = function routesConfig($stateProvider, $locationProvider) {
    $stateProvider
           .state('login', {
               url: '/login',
               template: "<login></login>",
               allowAnnonymous: true
           })
           .state('signup', {
               url: '/signup',
               template: "<signup></signup>",
               allowAnnonymous: true
           });
};