(function (angular) {
	'use strict';

	//using
	userService.$inject = ['$http', 'logger', 'BASEURL', 'resource'];

	//namespace
	angular.module('app.user')
	   .service('userService', userService);

	//class
	function userService($http, logger, baseUrl, res, permissionAdapter) {
		var self = this;

		var serviceUrl = baseUrl + "api/accounts/";
		var serviceAuthenticationUrl = baseUrl + "api/authorization/";

		//public methods
		self.getUsers = function () {
			return $http.get(serviceUrl + "user")
				 .then(logger.successCallback)
				 .catch(logger.errorCallback);
		};

		self.getUserById = function (id) {
			return $http.get(serviceUrl + "user/" + id)
				 .then(logger.successCallback)
				 .catch(logger.errorCallback);

		};

		self.getUserByUsername = function (username) {
			return $http.get(serviceUrl + "user/username/" + username)
				 .then(logger.emptyMessageCallback)
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

	}
})(window.angular);