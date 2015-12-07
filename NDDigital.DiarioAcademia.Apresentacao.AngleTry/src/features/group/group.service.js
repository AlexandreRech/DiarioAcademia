(function () {
	'use strict';

	//using
	groupService.$inject = ['$http', 'logger', 'BASEURL', 'resource'];

	//namespace
	angular.module('app.group')
	   .service('groupService', groupService);

	//class
	function groupService($http, logger, baseUrl, res) {
		var self = this;
		var serviceUrl = baseUrl + "api/group/";

		//public methods
		self.getGroups = function () {
			return $http.get(serviceUrl)
				 .then(logger.successCallback)
				 .catch(logger.errorCallback);
		};

		self.getGroupById = function (id) {
			return $http.get(serviceUrl + id)
				 .then(logger.successCallback)
				 .catch(logger.errorCallback);
		};

		self.getGroupByUsername = function (username) {
			return $http.get(serviceUrl + '?username=' + username)
				 .then(logger.emptyMessageCallback)
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
	}
})();