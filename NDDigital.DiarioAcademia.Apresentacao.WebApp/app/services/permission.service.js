(function () {
	'use strict';

	//using

	permissionsService.$inject = ['$http', 'logger', 'BASEURL', '$state', 'resource'];

	//namespace
	angular.module('services.module')
	   .service('permissionsService', permissionsService);

	//class
	function permissionsService($http, logger, baseUrl, $state, res) {
		var self = this;
		var serviceUrl = baseUrl + "api/permission/";
		var resourcePermission = "app/resources/permissions.json";

		//public methods
		self.getPermissions = function () {
			return $http.get(serviceUrl)
				 .then(logger.emptyMessageCallback)
				 .catch(logger.errorCallback)
		};

		self.getStates = function () {
		    return $http.get(resourcePermission)
				 .then(logger.emptyMessageCallback)
				 .catch(logger.errorCallback)
		};

		self.getPermissionById = function (id) {
			return $http.get(serviceUrl + id)
				 .then(logger.successCallback)
				 .catch(logger.errorCallback)
		};

		self.save = function (permission) {
			return $http.post(serviceUrl, permission)
							.then(logger.emptyMessageCallback)
							.then(function (response) {
								logger.success(res.SAVED_SUCCESSFUL, permission, "Create");
								return response;
							})
							.catch(logger.errorCallback);
		};

		self.delete = function (permission) {

			permission = getPermissionsId(permission);
			return $http({
				url: serviceUrl,
				method: 'DELETE',
				data: permission,
				headers: { "Content-Type": "application/json;charset=utf-8" }
			})
				.then(logger.emptyMessageCallback)
				.then(function () {
					logger.success(res.DELETED_SUCCESSFUL, permission, "Delete");

				})
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