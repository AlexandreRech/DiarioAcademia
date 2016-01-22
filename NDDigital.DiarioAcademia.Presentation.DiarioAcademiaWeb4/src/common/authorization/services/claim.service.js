/* @ngInject */
module.exports = function claimService($http, logger, baseURL, authoAdapter) {
    var self = this;
    var serviceUrl = baseURL + "api/authorization/";


    //public methods
    self.getClaims = function () {
        return $http.get(serviceUrl)
             .then(logger.successCallback)
             .then(convertToObj)
             .catch(logger.errorCallback);
    };

    self.getCliamById = function (id) {
        return $http.get(serviceUrl + id)
             .then(logger.successCallback)
             .then(convertToObj)
             .catch(logger.errorCallback);
    };

    self.save = function (autho) {
        autho = convertToDto(autho);
        return $http.post(serviceUrl, autho)
                        .then(logger.successCallback)
                        .catch(logger.errorCallback);;
    };

    self.delete = function (autho) {
        autho = convertToDto(autho);
        return $http({
            url: serviceUrl + "deletemany",
            method: 'DELETE',
            data: autho,
            headers: { "Content-Type": "application/json;charset=utf-8" }
        }).then(logger.empyMessageCallback)
          .catch(logger.errorCallback);
    };

    //private methods
    function convertToObj(data) {
        if ($.isArray(data)) {
            return $.map(data, function (item) {
                return authoAdapter.toAuthorization(item);
            });
        } else {
            var authos = [];
            authos.push(authoAdapter.toAuthorization(data));
            return authos;
        }
    };

    function convertToDto(data) {
        if ($.isArray(data)) {
            return $.map(data, function (item) {
                return authoAdapter.makeAuthorizationDto(item);;
            });
        } else {
            return authoAdapter.makeAuthorizationDto(data);
        }
    };
}