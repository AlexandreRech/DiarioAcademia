(function () {
	'use strict';

	//using

	permissionsService.$inject = ['$http', 'logger', 'BASEURL', '$state', 'resource'];

	//namespace
	angular.module('app.permission')
	   .service('permissionsService', permissionsService);

	//class
	function permissionsService($http, logger, baseUrl, $state, res) {
		var self = this;
		var serviceUrl = baseUrl + "api/permission/";
		var resource = "src/features/permission/permissions.json";
		
		//public methods
		self.getPermissions = function () {
			return $http.get(serviceUrl)
				 .then(logger.successCallback)
				 .catch(logger.errorCallback)
		};

		self.getStates = function () {
			return $http.get(resource)
				 .then(logger.successCallback)
				 .catch(logger.errorCallback)
		};

		self.getPermissionById = function (id) {
			return $http.get(serviceUrl + id)
				 .then(logger.successCallback)
				 .catch(logger.errorCallback)
		};

		self.save = function (permission) {
			logger.success(res.saved_successful, permission);
			return $http.post(serviceUrl, permission)
				.then(logger.emptyMessageCallback)
				 .catch(logger.errorCallback);
		};

		self.delete = function (permission) {
			logger.error(res.deleted_successful, permission, "Delete");

			permission = getPermissionsId(permission);
			return $http({
				url: serviceUrl,
				method: 'DELETE',
				data:  permission,
				headers: { "Content-Type": "application/json;charset=utf-8" }
			})
				.then(logger.emptyMessageCallback)
				.catch(logger.errorCallback);
		};

		function getPermissionsId(array) {
			var permissionsIds = [];
			for (var i = 0; i < array.length; i++) {
				permissionsIds.push(array[i].permissionId);
			}
			return permissionsIds;
		}
	}
})();