(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig);
       
        
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider) {
  
      $translateProvider.useStaticFilesLoader({
          prefix : 'src/common/translate/resources/',
          suffix : '.json'
      });
      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
    }
})();