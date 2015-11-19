(function () {
    'use strict';

    //using
    turmaService.$inject = ['$http', 'logger', 'BASEURL', 'resource'];

    //namespace
    angular.module('services.module')
       .service('turmaService', turmaService);

    //class
    function turmaService($http, logger, baseUrl,res) {
        var self = this;
        var serviceUrl = baseUrl + "api/turma/";

        self.getTurmas = function () {
            return $http.get(serviceUrl)
                .then(logger.successCallback);
        };

        self.save = function (turma) {
            logger.success(res.saved_successful, turma);
            return $http.post(serviceUrl, turma);
        };

        self.delete = function (turma) {
            logger.error(res.deleted_successful, turma, "Delete");

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
            logger.success("Turma " + turma.descricao + " editada", null, "Edição");

            $http.put(serviceUrl +  turma.id, turma);
        };
    }
})(window.angular);