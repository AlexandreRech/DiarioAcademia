(function () {
	'use strict';

	//using

	metadataService.$inject = ['$http', 'logger', 'BASEURL'];

	//namespace
	angular.module('app.permission')
	   .service('metadataService', metadataService);

	//class
	function metadataService($http, logger, baseUrl) {
	    var self = this;

		var resourcePermissions = "src/common/permission/permissions.json";

		//public methods
		self.getMetaDataPermissions = function () {
			return $http.get(resourcePermissions)
				 .then(logger.successCallback)
				 .catch(logger.errorCallback);
		};
	}
})();