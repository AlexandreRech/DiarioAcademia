(function () {
    'use strict';

    //using
    alunoService.$inject = ['$http', 'logger', 'BASEURL', "alunoAdapter", 'resource'];

    //namespace
    angular.module('services.module')
       .service('alunoService', alunoService);

    //class
    function alunoService($http, logger, baseUrl, adapter, res) {
        var self = this;
        var serviceUrl = baseUrl + "api/aluno/";

        //public methods
        self.getAlunos = function () {
            return $http.get(serviceUrl)
                 .then(logger.successCallback)
                 .then(convertToObj)
                 .catch(logger.errorCallback);

        };

        self.getAlunoById = function (id) {
            return $http.get(serviceUrl + id)
                 .then(logger.successCallback)
                  .then(convertToObj)
                 .catch(logger.errorCallback);

        };

        self.getAlunoByTurmaId = function (id) {
            return $http.get(serviceUrl + "getbyturma/" + id)
                 .then(logger.successCallback)
                 .then(convertToObj)
                 .catch(logger.errorCallback);

        };

        self.save = function (aluno) {
            logger.success(res.saved_successful, aluno);
            return $http.post(serviceUrl, convertToDto(aluno));
        };

        self.delete = function (aluno) {
            logger.error(res.deleted_successful, aluno, "Delete");
            return $http.delete(serviceUrl + aluno.id);
        };

        self.edit = function (aluno) {
            return $http.put(serviceUrl + aluno.id, aluno).then(function (results) {
                logger.success(res.student_edited + aluno.descricao);
            });
        };

        function convertToObj(data) {
            if ($.isArray(data)) {
                return $.map(data, function (item) {
                    return adapter.convertBack(item);
                });
            } else {
                return adapter.convertBack(data);
            }
        };

        function convertToDto(data) {
            return adapter.toAlunoDto(data);
        };
    }
})();