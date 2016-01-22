/* @ngInject */
module.exports = function translateConfig($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix: '/common/translate/resources/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
    $translateProvider.usePostCompiling(true);
}