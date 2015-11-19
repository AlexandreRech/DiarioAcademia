(function () {
    'use strict';

    //using
    cepService.$inject = ['$http', 'logger', 'BASEURL'];

    //namespace
    angular.module('services.module')
       .service('cepService', cepService);

    //class
    function cepService($http, logger, baseUrl) {
        var self = this;
        var serviceUrl = baseUrl + "api/cep/";

        //public methods
        self.getEndereco = function (cep) {
            return $http.get(serviceUrl + cep)
              .then(logger.successCallback)
              .catch(logger.errorCallback);
        }
    }
})();