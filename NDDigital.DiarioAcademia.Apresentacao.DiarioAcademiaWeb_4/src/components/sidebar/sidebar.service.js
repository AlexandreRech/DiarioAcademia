/* @ngInject */
module.exports = function SidebarLoader($http) {
    this.getMenu = getMenu;

    ////////////////

    function getMenu(onReady, onError) {
        var menuJson = 'components/sidebar/sidebar-menu.json';
        var menuURL = menuJson + '?v=' + (new Date().getTime()); // jumps cache

        onError = onError || function () { alert('Failure loading menu'); };

        $http.get(menuURL)
                .success(onReady)
                .error(onError);
    }
}