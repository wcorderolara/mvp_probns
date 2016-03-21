probnsApp.service('listingsService', function ($http, $q, probnsConf){
	var uri = probnsConf.api.url;

	this.getTotalPropiedadesByUser = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/inmuebles/get/all/count/' + userId)
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.getPropidadesUsuario = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/inmuebles/get/all/' + userId)
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	
})