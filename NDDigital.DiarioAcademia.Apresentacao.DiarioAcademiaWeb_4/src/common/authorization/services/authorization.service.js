/* @ngInject */
module.exports = function authoService($http, logger, baseURL, authoAdapter) {
    var self = this;
    var serviceUrl = baseURL + "api/authorization/";


    //public methods
    self.addAuthorize = function (group, authorizations) {
        authorizations = convertToDto(authorizations);
        return $http.post(serviceUrl + "addauthorize/" + group.id, authorizations)
                        .then(logger.successCallback)
                        .catch(logger.errorCallback);;
    };

    self.removeAuthorize = function (group, authorizations) {
        authorizations = convertToDto(authorizations);
        return $http.post(serviceUrl + "removeauthorize/" + group.id, authorizations)
                                .then(logger.successCallback)
                                .catch(logger.errorCallback);;
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