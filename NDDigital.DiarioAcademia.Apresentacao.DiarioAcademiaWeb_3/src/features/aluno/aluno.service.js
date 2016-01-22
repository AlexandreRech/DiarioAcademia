(function () {
    'use strict';

    //using
    alunoService.$inject = ['$http', 'logger', 'BASEURL', "alunoAdapter", 'resource'];

    //namespace
    angular.module('app.aluno')
       .service('alunoService', alunoService);

    //class
    function alunoService($http, logger, baseUrl, adapter, res) {
        var self = this;
        var serviceUrl = baseUrl + "api/aluno/";


        self.getAlunos = getAlunos;
        self.getAlunoById = getAlunoById;
        self.getAlunoByTurmaId = getAlunoByTurmaId;
        self.save = save;
        self.delete = deleteFunction; //"delete" is reserved
        self.edit = edit;

        //public methods
        function getAlunos() {
            return $http.get(serviceUrl)
                 .then(logger.successCallback)
                 .then(convertToObj)
                 .catch(logger.errorCallback);
        };

        function getAlunoById(id) {
            return $http.get(serviceUrl + id)
                 .then(logger.successCallback)
                 .then(convertToObj)
                 .catch(logger.errorCallback)
            ;
        };

        function getAlunoByTurmaId(id) {
            return $http.get(serviceUrl + "getbyturma/" + id)
                 .then(logger.successCallback)
                 .then(convertToObj)
                 .catch(logger.errorCallback)
            ;
        };

        function save(aluno) {
            return $http.post(serviceUrl, convertToDto(aluno)).then(function () {
                logger.success(res.saved_successful, aluno);
            });
        };

        function deleteFunction(aluno) {
            return $http.delete(serviceUrl + aluno.id).then(function () {
                logger.error(res.deleted_successful, aluno, "Delete");
            });
        };

        function edit(aluno) {
            return $http.put(serviceUrl + aluno.id, convertToDto(aluno))
                          .then(logger.emptyMessageCallback);
        };

        //private methods
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