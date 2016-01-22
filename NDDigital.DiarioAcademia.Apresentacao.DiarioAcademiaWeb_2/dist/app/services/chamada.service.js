(function () {
    'use strict';

    //using
    chamadaService.$inject = ['$http', 'logger', 'BASEURL', 'resource', 'alunoService', 'chamadaAdapter'];

    //namespace
    angular.module('services.module')
       .service('chamadaService', chamadaService);

    //class
    function chamadaService($http, logger, baseUrl, res, alunoService, chamadaAdapter) {
        var self = this;
        var serviceUrl = baseUrl + "api/chamada/";

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

        //private methods
        function convertToChamada(chamada) {
            return chamadaAdapter.toChamada(chamada);
        };

        function convertToChamadaDto(chamada) {
            return chamadaAdapter.toChamadaDto(chamada);
        };
    }
})();