probnsApp.service('listingsService', function ($http, $q, probnsConf, authService){
	var uri = probnsConf.api.url;

	this.getTotalPropiedadesByUser = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/inmuebles/get/all/count/' + userId, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.getPropidadesUsuario = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/inmuebles/get/all/' + userId, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	
})