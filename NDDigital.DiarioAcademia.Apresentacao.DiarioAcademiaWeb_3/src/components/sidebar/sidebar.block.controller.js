(function () {
    'use strict';

    UserBlockController.$inject = ['$rootScope', 'autheService'];

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    function UserBlockController($rootScope, autheService) {
        activate();

        function activate() {
            $rootScope.user = autheService.authentication;

            $rootScope.user.picture = 'src/images/avatar_login.png'

            $rootScope.userBlockVisible = true;

            // Hides/show user avatar on sidebar
            $rootScope.toggleUserBlock = function () {
                $rootScope.userBlockVisible = !$rootScope.userBlockVisible;

            };

        }
    }
})();
