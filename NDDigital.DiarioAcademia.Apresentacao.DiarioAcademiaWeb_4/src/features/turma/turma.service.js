/* @ngInject */
module.exports = function turmaService($http, logger, baseURL) {
    var serviceUrl = baseURL + "api/turma/";

    return {
        getTurmas: getTurmas,
        save: save,
        'delete': remove, // todo: alterar nome
        getTurmaById: getTurmaById,
        edit: edit
    }

    function getTurmas() {
        return $http.get(serviceUrl)
                        .then(logger.successCallback)
                        .catch(logger.errorCallback);

    };

    function save(turma) {
        return $http.post(serviceUrl, turma)
                        .then(logger.successCallback)
                        .catch(logger.errorCallback);
    };

    function remove(turma) {
        return $http.delete(serviceUrl + turma.id)
                      .then(logger.emptyMessageCallback)
                      .catch(logger.errorCallback);

    };

    function getTurmaById(id) {
        return $http.get(serviceUrl + id)
                        .then(logger.successCallback)
                        .catch(logger.errorCallback);

    };

    function edit(turma) {
        return $http.put(serviceUrl + turma.id, turma)
                        .then(logger.successCallback)
                        .catch(logger.errorCallback);;
    };
}