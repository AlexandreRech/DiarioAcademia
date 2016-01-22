/* @ngInject */
module.exports = function loadingbarRun($rootScope, $timeout, cfpLoadingBar) {

    // Loading bar transition
    // ----------------------------------- 
    var thBar;
    $rootScope.$on('$stateChangeStart', function () {
        if ($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function () {
                cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
    });
    $rootScope.$on('$stateChangeSuccess', function (event) {
        event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
        });
    });

}