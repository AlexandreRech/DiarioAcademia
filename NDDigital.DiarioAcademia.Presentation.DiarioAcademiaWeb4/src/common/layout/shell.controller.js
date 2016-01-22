/* @ngInject */
module.exports = function shellController($rootScope, $scope, $state, autheService, authoFactory) {
    var self = this;
    var authentication = {};
    var year;

    var user = autheService.authentication;
    user.picture = 'images/avatar_login.png'

    //script load
    activate();
    function activate() {
        $scope.app = $rootScope.app;
        authentication = autheService.authentication;
        authorization = authoFactory.authorization;
        toastr.options.preventDuplicates = true;
        toastr.options.timeOut = 2000;
        var date = new Date();
        year = date.getFullYear();

        var rs = $(window).width();
        if (rs <= 767)
            $rootScope.app.layout.isCollapsed = true;
    }

    self.authentication = authentication;
    self.year = year;
    self.logOut = logOut;
    self.isAuthorized = isAuthorized;
    self.goToParentState = goToParentState;
    self.isLogged = isLogged;
    self.user = user;
    self.userBlockVisible = true;
    self.toggleUserBlock = toggleUserBlock;

    return self;

    //public methods
    function logOut() {
        autheService.logOut();
        $state.go('login');
    };

    function isAuthorized(permission) {
        return self.authorization.isAuthorized(permission);
    };

    function goToParentState(state) {
        var toState = authoFactory.getByName(self.authorization.permissions, state);
        if (toState)
            $state.go(toState);
    }

    function isLogged() {
        return self.authentication.isAuth && $(document).width() > 768;
    }

    // Hides/show user avatar on sidebar
    function toggleUserBlock() {
        self.userBlockVisible = !self.userBlockVisible;
    };
}