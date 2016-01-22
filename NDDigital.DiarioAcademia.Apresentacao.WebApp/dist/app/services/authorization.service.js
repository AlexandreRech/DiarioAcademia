(function (angular) {

	'use strict';

	angular.module('services.module').service('authoService', authoService);

	authoService.$inject = ['$http', 'BASEURL','logger', 'authoAdapter'];

	function authoService($http, baseUrl, logger, adapter) {
	    var self = this;
	    var serviceUrl = baseUrl + "api/authorization/";


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
	                return adapter.toAuthorization(item);
	            });
	        } else {
	            var authos = [];
	            authos.push(adapter.toAuthorization(data));
	            return authos;
	        }
	    };

	    function convertToDto(data) {
	        if ($.isArray(data)) {
	            return $.map(data, function (item) {
	                return adapter.makeAuthorizationDto(item);;
	            });
	        } else {
	            return adapter.makeAuthorizationDto(data);
	        }
	    };
	}

})(window.angular);