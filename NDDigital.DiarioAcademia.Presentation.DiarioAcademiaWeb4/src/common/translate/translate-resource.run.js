/* @ngInject */
module.exports = function translateResource($rootScope, resource, $translate) {
    $rootScope.$on('$translateChangeSuccess', function () {
        for (var res in resource) {
            resource[res] = $translate.instant("status." + res);
        }
    });
}