/* @ngInject */
module.exports = function metadataService($http, logger) {
	var resourceClaims = "common/authorization/claims.json";

	return {
		getMetaDataClaims: getMetaDataClaims
	};

	//public methods
	function getMetaDataClaims() {
		return $http.get(resourceClaims)
			 .then(logger.successCallback)
			 .catch(logger.errorCallback);
	};
}