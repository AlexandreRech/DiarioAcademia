/* @ngInject */
module.exports = function settingsRun($rootScope, $localStorage) {

    // Global Settings
    // ----------------------------------- 
    $rootScope.app = {
        name: 'DiarioAcademia',
        description: 'Diario Academia',
        year: ((new Date()).getFullYear()),
        layout: {
            isFixed: true,
            isCollapsed: false,
            isBoxed: false,
            isRTL: false,
            horizontal: false,
            isFloat: false,
            asideHover: false,
            theme: "theme-b"
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp'
    };

    // Close submenu when sidebar change from collapsed to normal
    $rootScope.$watch('app.layout.isCollapsed', function (newValue) {
        if (newValue === false)
            $rootScope.$broadcast('closeSidebarMenu');
    });
}