(function () {
	'use strict';

	//using
	groupService.$inject = ['$http', 'logger', 'BASEURL', 'resource', '$state', 'permissionAdapter'];

	//namespace
	angular.module('app.group')
	   .service('groupService', groupService);

	//class
	function groupService($http, logger, baseUrl, res, $state, permissionAdapter) {
		var self = this;
		var serviceUrl = baseUrl + "api/group/";
		var serviceAuthenticationUrl = baseUrl + "api/authentication/";

		//public methods
		self.getGroups = function () {
			return $http.get(serviceUrl)
				 .then(logger.successCallback)
				 .then(convertPermissions)
				 .catch(logger.errorCallback);
		};

		self.getGroupById = function (id) {
			return $http.get(serviceUrl + id)
				 .then(logger.successCallback)
				 .then(convertPermissions)
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
			logger.danger(res.deleted_successful, group, "Delete");
			return $http.delete(serviceUrl + group.id)
			   .then(logger.emptyMessageCallback)
			   .catch(logger.errorCallback);
		};

		//permissions
		self.addPermission = function (group, permissions) {
			var permissionsIds = getPermissionId(permissions);
			return $http.post(serviceAuthenticationUrl + "addPermission/" + group.id, permissionsIds)
			 .then(logger.successCallback)
			 .catch(logger.errorCallback);;
		};

		self.removePermission = function (group, permissions) {
			var permissionsIds = getPermissionId(permissions);
			return $http.post(serviceAuthenticationUrl + "removePermission/" + group.id, permissionsIds)
			 .then(logger.successCallback)
			 .catch(logger.errorCallback);;
		};

		self.checkPermission = function (username, state) {
			return $http.get(serviceUrl + "?username=" + username + "&state=" + state)
				.then(logger.successCallback)
				.catch(logger.errorCallback);
		};

		self.extractPermissions = function (groups) {
			var permissions = [];
			for (var i in groups) {
				var group = groups[i];
				for (var j in group.permissions) {
					var name = group.permissions[j].name;
					if (name)
						if (permissions.indexOf(name) < 0) permissions.push(name);
				}
			}
			return permissions;
		}

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

		function getPermissionId(array) {
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