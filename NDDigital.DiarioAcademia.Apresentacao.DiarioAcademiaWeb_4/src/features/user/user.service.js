/* @ngInject */
module.exports = function userService($http, logger, baseURL) {

	var serviceUrl = baseURL + "api/accounts/";
	var serviceAuthenticationUrl = baseURL + "api/authorization/";

	return {
		getUsers: getUsers,
		getUserById: getUserById,
		getUserByUsername: getUserByUsername,
		'delete': remove,
		edit: edit
	}	

	//public methods
	function getUsers() {
		return $http.get(serviceUrl + "user")
			 .then(logger.successCallback)
			 .catch(logger.errorCallback);
	};

	function getUserById(id) {
		return $http.get(serviceUrl + "user/" + id)
			 .then(logger.successCallback)
			 .catch(logger.errorCallback);

	};

	function getUserByUsername(username) {
		return $http.get(serviceUrl + "user/username/" + username)
			 .then(logger.emptyMessageCallback)
			 .catch(logger.errorCallback);
	}

	 function remove(user) {
		return $http.delete(serviceUrl + "user/" + user.id)
				.then(logger.emptyMessageCallback);
	};

	function edit(user) {
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