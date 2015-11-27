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
            return $http.post(serviceUrl, turma).then(function () {
                logger.success(res.saved_successful, turma);
            });
        };

        self.delete = function (turma) {

            return $http.delete(serviceUrl + turma.id)
                           .then(function (results) {
                               logger.error(res.deleted_successful, turma, "Delete");
                               return results;
                           })
                          .then(logger.emptyMessageCallback)
                          .catch(logger.errorCallback);

        };

        self.getTurmaById = function (id) {

            return $http.get(serviceUrl + id)
                            .then(function (results) {
                                logger.success("Turma com id " + id + " encontrada", null, "Busca");
                                return results;
                            })
                            .then(logger.emptyMessageCallback);
        };

        self.edit = function (turma) {

            return $http.put(serviceUrl + turma.id, turma).then(function () {
                logger.success("Turma " + turma.descricao + " editada", null, "Edição");

            });
        };
    }
})(window.angular);