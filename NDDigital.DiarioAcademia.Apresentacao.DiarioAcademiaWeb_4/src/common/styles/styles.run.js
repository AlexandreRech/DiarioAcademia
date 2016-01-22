/* @ngInject */
module.exports = function stylesRun($localStorage, $rootScope) {

    activate();
    function activate() {
        // Restore layout settings
        if (angular.isDefined($localStorage.layout)) {
            $rootScope.app.layout = $localStorage.layout;
        }
        else
            $localStorage.layout = $rootScope.app.layout;

        loadTheme($rootScope.app.layout.theme);


        $rootScope.$watch('app.layout', function () {
            $localStorage.layout = $rootScope.app.layout;
            loadTheme($rootScope.app.layout.theme);
        }, true);
    }


    //private methods
    function loadTheme(themeName) {
        themeName = "./" + themeName + ".scss";

        require.ensure([], function (require) {
            var req = require.context('!!style!css!sass!../../stylesheets/theme/', true, /\.scss$/);
            req.keys().forEach(function (file) {
                if (themeName == file)
                    req(file);
            });
        }, 'localhostTheme');
    }
};