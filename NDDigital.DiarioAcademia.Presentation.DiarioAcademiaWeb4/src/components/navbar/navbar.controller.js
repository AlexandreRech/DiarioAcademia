/* @ngInject */
module.exports = function navbarController($rootScope, $scope, $state, autheService) {
    var self = this;
    self.logOut = logOut;


    activate();
    function activate() {
        $scope.app = $rootScope.app;
    }

    return self;

    //public methods
    function logOut() {
        autheService.logOut();
        $state.go('login');
    };
}