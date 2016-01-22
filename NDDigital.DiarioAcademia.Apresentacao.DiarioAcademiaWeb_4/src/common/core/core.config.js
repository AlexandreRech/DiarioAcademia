(function () {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig)
        .config(configInterceptors);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide) {

        var core = angular.module('app.core');
        // registering components after bootstrap
        core.controller = $controllerProvider.register;
        core.directive = $compileProvider.directive;
        core.filter = $filterProvider.register;
        core.factory = $provide.factory;
        core.service = $provide.service;
        core.constant = $provide.constant;
        core.value = $provide.value;

    }

    configInterceptors.$inject = ['$httpProvider'];
    function configInterceptors($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
        window.scrollTo(0, 0);
    }

})();