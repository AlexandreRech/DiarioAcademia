/* @ngInject */
module.exports = function aulaService($http, logger, baseURL) {
    var serviceUrl = baseURL + "api/aula/";

    return {
        getAulas: getAulas,
        getAulaById: getAulaById,
        save: save,
        'delete': remove,
        getTurmaById: getTurmaById,
        getTurmaByAno: getTurmaByAno
    }

    //public methods
    function getAulas() {
        return $http.get(serviceUrl)
             .then(logger.successCallback)
             .catch(logger.errorCallback);
    };

    function getAulaById(id) {
        return $http.get(serviceUrl + id)
             .then(logger.successCallback)
             .catch(logger.errorCallback);
    };

    function save(aula) {
        return $http.post(serviceUrl, aula);
    };

    function remove(aula) {
        return $http.delete(serviceUrl + aula.id)
                         .then(logger.empyMessageCallback)
                         .catch(logger.errorCallback);;
    };

    function getTurmaById(id) {
        logger.success("Aula com id " + id + " encontrada", null, "GetById");
        return $http.get(serviceUrl + id)
            .then(function (response) {
                return response.data;
            });
    };

    function getTurmaByAno(ano) {
        logger.success("Aula com ano " + ano + " encontrada", null, "GetByAno");
        return $http.get(serviceUrl + ano)
            .then(function (response) {
                return response.data;
            });
    };
}