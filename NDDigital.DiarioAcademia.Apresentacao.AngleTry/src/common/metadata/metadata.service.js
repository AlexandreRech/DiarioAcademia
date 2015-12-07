(function () {
	'use strict';

	//using

	metadataService.$inject = ['$http', 'logger', 'BASEURL'];

	//namespace
	angular.module('app.metadata')
	   .service('metadataService', metadataService);

	//class
	function metadataService($http, logger, baseUrl) {
		var self = this;

		var resourceAuthorization = "src/common/authorization/authorizations.json";

		//public methods
		self.getMetaDataAuthorization = function () {
		    return $http.get(resourceAuthorization)
				 .then(logger.successCallback)
				 .catch(logger.errorCallback);
		};
	}
})();