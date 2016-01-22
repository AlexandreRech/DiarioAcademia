/* @ngInject */
module.exports = function alunoService($http, logger, baseURL, alunoAdapter, resource) {

    var serviceUrl = baseURL + "api/aluno/";

    return {
        getAlunos: getAlunos,
        getAlunoById: getAlunoById,
        getAlunoByTurmaId: getAlunoByTurmaId,
        save: save,
        remove: remove,
        edit: edit
    };

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
            logger.success(resource.saved_successful, aluno);
        });
    };

    function remove(aluno) {
        return $http.delete(serviceUrl + aluno.id).then(function () {
            logger.error(resource.deleted_successful, aluno, "Delete");
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
                return alunoAdapter.convertBack(item);
            });
        } else {
            return alunoAdapter.convertBack(data);
        }
    };

    function convertToDto(data) {
        return alunoAdapter.toAlunoDto(data);
    };
}