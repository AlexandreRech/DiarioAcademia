(function (angular) {
	'use strict';

	//using
	userService.$inject = ['$http', 'logger', 'BASEURL', 'resource', 'permissionAdapter'];

	//namespace
	angular.module('app.user')
	   .service('userService', userService);

	//class
	function userService($http, logger, baseUrl, res, permissionAdapter) {
		var self = this;

		var serviceUrl = baseUrl + "api/accounts/";
		var serviceAuthenticationUrl = baseUrl + "api/authentication/";

		//public methods
		self.getUsers = function () {
			return $http.get(serviceUrl + "user")
				 .then(logger.successCallback)
				 .then(convertPermissions)
				 .catch(logger.errorCallback);
		};

		self.getUserById = function (id) {
			return $http.get(serviceUrl + "user/" + id)
				 .then(logger.successCallback)
				 .then(convertPermissions)
				 .catch(logger.errorCallback);

		};

		self.getUserByUsername = function (username) {
			return $http.get(serviceUrl + "user/username/" + username)
				 .then(logger.emptyMessageCallback)
				 .then(convertPermissions)
				 .catch(logger.errorCallback);
		}

		self.delete = function (user) {
			return $http.delete(serviceUrl + "user/" + user.id)
					.then(logger.emptyMessageCallback);
		};

		self.edit = function (user) {
			return $http.post(serviceUrl + "edit/", user)
							.then(logger.successCallback)
							.catch(logger.errorCallback);
		};

		//Group's User
		self.addUserGroup = function (user, groups) {
			return $http.post(serviceAuthenticationUrl + "addgroup/" + user.userName, groups)
			 .then(logger.successCallback)
			 .catch(logger.errorCallback);
		};

		self.removeUserGroup = function (user, groups) {
			return $http.post(serviceAuthenticationUrl + "removegroup/" + user.userName, groups)
			 .then(logger.successCallback)
			 .catch(logger.errorCallback);
		};

		//private methods
		function convertPermissions(response) {
		    if ($.isArray(response)) {
		        response.map(function (group) {
		            group.permissions = permissionAdapter.toPermission(group.permissions);
		        });
		    } else
		        response.permissions = permissionAdapter.toPermission(response.permissions);
		    return response;
		}

	}
})(window.angular);