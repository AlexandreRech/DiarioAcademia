(function () {
    'use strict';

    //using
    turmaService.$inject = ['$http', 'logger', 'BASEURL'];

    //namespace
    angular.module('app.turma')
       .service('turmaService', turmaService);

    //class
    function turmaService($http, logger, baseUrl) {
        var self = this;
        var serviceUrl = baseUrl + "api/turma/";

        self.getTurmas = function () {
            return $http.get(serviceUrl)
                .then(logger.successCallback);
        };

        self.save = function (turma) {
            return $http.post(serviceUrl, turma);
        };

        self.delete = function (turma) {
            return $http.delete(serviceUrl + turma.id)
                          .then(logger.emptyMessageCallback)
                          .catch(logger.errorCallback);

        };

        self.getTurmaById = function (id) {
            logger.success("Turma com id " + id + " encontrada", null, "Busca");

            return $http.get(serviceUrl + id)
                            .then(logger.emptyMessageCallback);
        };

        self.edit = function (turma) {
            return $http.put(serviceUrl + turma.id, turma);
        };
    }
})(window.angular);