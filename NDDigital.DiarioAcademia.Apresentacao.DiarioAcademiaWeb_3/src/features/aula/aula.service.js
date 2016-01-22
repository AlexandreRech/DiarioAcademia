(function () {
    'use strict';

    //using
    aulaService.$inject = ['$http', 'logger', 'BASEURL'];

    //namespace
    angular.module('app.aula')
       .service('aulaService', aulaService);

    //class
    function aulaService($http, logger, baseUrl) {
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
            return $http.post(serviceUrl, aula);
        };

        self.delete = function (aula) {
            return $http.delete(serviceUrl + aula.id)
                             .then(logger.empyMessageCallback)
                             .catch(logger.errorCallback);;
        };

        self.getTurmaById = function (id) {
            logger.success("Aula com id " + id + " encontrada", null, "GetById");
            return $http.get(serviceUrl + id)
                .then(function (response) {
                    return response.data;
                });
        };

        self.getTurmaByAno = function (ano) {
            logger.success("Aula com ano " + ano + " encontrada", null, "GetByAno");
            return $http.get(serviceUrl + ano)
                .then(function (response) {
                    return response.data;
                });
        };
    }
})();