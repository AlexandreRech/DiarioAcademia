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
            chamada = convertToChamadaDto(chamada);
            $http.post(serviceUrl, chamada).then(function (result) {
                logger.success(res.saved_successful, chamada);
            });
        };
        self.getChamadas = function () {
            return $http.get(serviceUrl)
                 .then(logger.successCallback)
                 .catch(logger.errorCallback);
        };

        self.getChamadaByAula = function (id) {
            return $http.get(serviceUrl + id)
                .then(logger.successCallback)
                .catch(logger.errorCallback);
        };

        //private methods
        function convertToChamadaDto(data) {
            return chamadaAdapter.toChamadaDto(data);
        };

        function convertToAlunoChamadaDto(data) {
            if ($.isArray(data)) {
                return $.map(data, function (item) {
                    return chamadaAdapter.toAlunoChamadaDto(item);
                });
            }
            return chamadaAdapter.toAlunoChamadaDto(data);
        };

    }
})();