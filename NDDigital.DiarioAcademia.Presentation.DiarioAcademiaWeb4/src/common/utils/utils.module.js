var utilis = angular.module('app.utils', [
    require("angular-animate")
]);
utilis.service('Utils', require("./utils.service"));
utilis.directive("animateEnabled", require("./animate-enabled.directive"));
utilis.directive('loadCss', require("./load-css.directive"));
utilis.service('Browser', require("./browser.service"));
utilis.directive('resetKey', require("./clear-storage.directive"));
utilis.directive('toggleFullscreen', require("./fullscreen.directive"));
utilis.directive('now', require("./now.directive"));
utilis.directive('checkAll', require("./table-checkall.directive"));
utilis.directive('triggerResize', require("./trigger-resize.directive"));

module.exports = utilis.name;