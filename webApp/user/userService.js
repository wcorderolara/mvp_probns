probnsApp.service('userService', function ($http, $q, probnsConf){
	var uri = probnsConf.api.url;

	this.getUserInfoById = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/usuario/get/clienteById/' + userId)
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}
})