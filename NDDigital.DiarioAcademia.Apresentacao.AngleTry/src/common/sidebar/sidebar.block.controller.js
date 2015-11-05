(function () {
    'use strict';

    UserBlockController.$inject = ['$rootScope', 'authService'];

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    function UserBlockController($rootScope, authService) {
        activate();

        function activate() {
            $rootScope.user = authService.authentication;

            $rootScope.user.picture = 'src/images/avatar_login.png'

            $rootScope.userBlockVisible = true;

            // Hides/show user avatar on sidebar
            $rootScope.toggleUserBlock = function () {
                $rootScope.userBlockVisible = !$rootScope.userBlockVisible;

            };

        }
    }
})();
