(function () {
    'use strict';

    //using
    aulaService.$inject = ['$http', 'logger', 'BASEURL', 'resource'];

    //namespace
    angular.module('services.module')
       .service('aulaService', aulaService);

    //class
    function aulaService($http, logger, baseUrl,res) {
        var self = this;
        var serviceUrl = baseUrl + "api/aula/";

        //public methods
        self.getAulas = function () {
            return $http.get(serviceUrl)
                 .then(logger.successCallback)
                 .catch(logger.errorCallback);
        };

        self.getAulaById = function (id) {
            return $http.get(serviceUrl + id)
                 .then(logger.successCallback)
                 .catch(logger.errorCallback);
        };

        self.save = function (aula) {
            $http.post(serviceUrl, aula)
                    .then(logger.successCallback)
                    .catch(logger.errorCallback);
        };

        self.delete = function (aula) {
            return $http.delete(serviceUrl + aula.id)
                             .then(logger.successCallback)
                             .catch(logger.errorCallback);;
        };

        self.getTurmaById = function (id) {
     
            return $http.get(serviceUrl + id)
                .then(function (response) {
                    logger.success("Aula com id " + id + " encontrada", null, "GetById");
                    return response.data;
                })
                 .catch(logger.errorCallback);

        };

        self.getTurmaByAno = function (ano) {
            return $http.get(serviceUrl + ano)
                .then(function (response) {
                    logger.success("Aula com ano " + ano + " encontrada", null, "GetByAno");
                    return response.data;
                })
                 .catch(logger.errorCallback);
        };
    }
})();