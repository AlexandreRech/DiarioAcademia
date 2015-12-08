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

		var resourceClaims = "src/common/authorization/claims.json";

		//public methods
		self.getMetaDataClaims = function () {
		    return $http.get(resourceClaims)
				 .then(logger.successCallback)
				 .catch(logger.errorCallback);
		};
	}
})();