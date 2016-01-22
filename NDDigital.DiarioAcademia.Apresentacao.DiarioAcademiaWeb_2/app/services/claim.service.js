(function () {
	'use strict';

	//using
	claimService.$inject = ['$http', 'logger', 'BASEURL', 'authoAdapter'];

	//namespace
	angular.module('services.module').service('claimService', claimService);

	//class
	function claimService($http, logger, baseUrl, adapter) {
		var self = this;
		var serviceUrl = baseUrl + "api/authorization/";


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