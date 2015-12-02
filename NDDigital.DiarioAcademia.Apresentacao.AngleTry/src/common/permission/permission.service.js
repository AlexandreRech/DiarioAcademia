(function () {
	'use strict';

	//using

	permissionsService.$inject = ['$http', 'logger', 'BASEURL', '$q', 'resource', 'permissionAdapter'];

	//namespace
	angular.module('app.permission')
	   .service('permissionsService', permissionsService);

	//class
	function permissionsService($http, logger, baseUrl, $q, res, permissionAdapter) {
		var self = this;
		var serviceUrl = baseUrl + "api/permission/";



		//public methods
		self.getPermissions = function () {
			return $http.get(serviceUrl)
				 .then(logger.emptyMessageCallback)
				 .then(convertPermissions)
				 .catch(logger.errorCallback);
		};

		self.save = function (permission) {
			permission = getPermissionsId(permission);
			return $http.post(serviceUrl, permission)
							.then(logger.emptyMessageCallback)
							.then(function (response) {
								logger.success(res.SAVED_SUCCESSFUL, permission, "Create");
								return response;
							})
							.catch(logger.errorCallback);
		}

		self.delete = function (permission) {
			permission = getPermissionsId(permission);
			return $http({
				url: serviceUrl,
				method: 'DELETE',
				data: permission,
				headers: { "Content-Type": "application/json;charset=utf-8" }
			}).then(logger.emptyMessageCallback)
						  .then(function () {
							  logger.success(res.DELETED_SUCCESSFUL, permission, "Delete");
						  })
						  .catch(logger.errorCallback);
		};

		//private methods
		function convertPermissions(response) {
			return permissionAdapter.toPermission(response);
		}

		function getPermissionsId(array) {
			var permissionsIds = [];
			for (var i = 0; i < array.length; i++) {
				if ($.isArray(array[i].permissionId)) {
					array[i].permissionId.map(function (permissionId) {
						permissionsIds.push(permissionId);
					})
				}
				else
					permissionsIds.push(array[i].permissionId);
			}
			return permissionsIds;
		}
	}
})();