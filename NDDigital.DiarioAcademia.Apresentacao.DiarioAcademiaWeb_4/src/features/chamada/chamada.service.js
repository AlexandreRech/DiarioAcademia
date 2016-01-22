/* @ngInject */
module.exports = function chamadaService($http, logger, baseURL, alunoService, chamadaAdapter) {
    var self = this;
    var serviceUrl = baseURL + "api/chamada/";

    //public methods
    self.realizarChamada = function (chamada) {
        chamada = convertToChamadaDto($.extend(true, {}, chamada));
        return $http.post(serviceUrl, chamada)
                        .then(logger.emptyMessageCallback)
    };
    self.getChamadas = function () {
        return $http.get(serviceUrl)
                        .then(logger.successCallback)
                        .catch(logger.errorCallback);
    };

    self.getChamadaByAula = function (id) {
        return $http.get(serviceUrl + id)
                        .then(logger.successCallback)
                        .then(convertToChamada)
                        .catch(logger.errorCallback);
    };

    return self;

    //private methods
    function convertToChamada(chamada) {
        return chamadaAdapter.toChamada(chamada);
    };

    function convertToChamadaDto(chamada) {
        return chamadaAdapter.toChamadaDto(chamada);
    };
}