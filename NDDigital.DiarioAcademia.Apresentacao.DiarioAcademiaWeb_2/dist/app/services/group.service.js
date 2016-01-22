(function () {
	'use strict';

	//using
	groupService.$inject = ['$http', 'logger', 'BASEURL', 'resource', 'authoAdapter'];

	//namespace
	angular.module('services.module').service('groupService', groupService);

	//class
	function groupService($http, logger, baseUrl, res, authoAdapter) {
		var self = this;
		var serviceUrl = baseUrl + "api/group/";

	    //public methods
		self.getGroups = function () {
		    return $http.get(serviceUrl)
				 .then(logger.successCallback)
				 .then(convertClaims)
				 .catch(logger.errorCallback);
		};

		self.getGroupById = function (id) {
		    return $http.get(serviceUrl + id)
				 .then(logger.successCallback)
				 .then(convertClaims)
				 .catch(logger.errorCallback);
		};

		self.getGroupByUsername = function (username) {
		    return $http.get(serviceUrl + '?username=' + username)
				 .then(logger.emptyMessageCallback)
				 .then(convertClaims)
				 .catch(logger.errorCallback)
		};

		self.save = function (group) {
		    logger.success(res.saved_successful, group);
		    return $http.post(serviceUrl, group)
							 .then(logger.emptyMessageCallback)
							 .catch(logger.errorCallback);
		};

		self.edit = function (group) {
		    return $http.put(serviceUrl + group.id, group)
			 .then(logger.successCallback)
			 .catch(logger.errorCallback);;
		};

		self.delete = function (group) {
		    return $http.delete(serviceUrl + group.id)
			   .then(logger.emptyMessageCallback)
			   .then(function (response) {
			       logger.danger(res.deleted_successful, group, "Delete");
			       return response;
			   })
			   .catch(logger.errorCallback);
		};

	    //private metthods
		function convertClaims(data) {
		    if ($.isArray(data)) {
		        for (var i = 0; i < data.length; i++) {
		            convertClaim(data[i]);
		        }
		    } else
		        convertClaim(data);
		    return data;
		};

		function convertClaim(group) {
		    for (var i = 0; i < group.claims.length; i++) {
		        group.claims[i] = authoAdapter.toAuthorization(group.claims[i]);
		    }
		}
	}
})();