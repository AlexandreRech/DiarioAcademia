/* @ngInject */
module.exports = function cepService($http, logger, baseURL) {
    var self = this;
    var serviceUrl = baseURL + "api/cep/";

    //public methods
    self.getEndereco = function (cep) {
        return $http.get(serviceUrl + cep)
          .then(logger.successCallback)
          .catch(logger.errorCallback);
    }
}