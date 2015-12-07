(function () {
	'use strict';

	//using
	authoService.$inject = ['$http', 'logger', 'BASEURL', 'authoAdapter'];

	//namespace
	angular.module('app.authorization').service('authoService', authoService);

	//class
	function authoService($http, logger, baseUrl, adapter) {
		var self = this;
		var serviceUrl = baseUrl + "api/authorization/";


		//public methods
		self.getAuthorizations = function () {
			return $http.get(serviceUrl)
				 .then(logger.successCallback)
				 .then(convertToObj)
				 .catch(logger.errorCallback);
		};

		self.getAuthorizationById = function (id) {
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
})();