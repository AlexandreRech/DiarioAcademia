/* @ngInject */
module.exports = function configInterceptors($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    window.scrollTo(0, 0);
}