/* @ngInject */
module.exports = function routesConfig($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.previousState = fromState;
        $rootScope.state = toState.name;
        console.log({ Change: "succes: ", fromState: fromState.name, toState: toState.name });
    });
};