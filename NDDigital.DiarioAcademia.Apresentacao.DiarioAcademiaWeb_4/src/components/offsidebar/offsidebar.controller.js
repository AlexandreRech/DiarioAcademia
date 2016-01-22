/* @ngInject */
module.exports = function offsidebarController(autheService, $rootScope) {
    var self = this;

    activate();
    function activate() {
        self.user = autheService.authentication;
        self.language = $rootScope.language;
        self.app = $rootScope.app;
    }

    return self;
}