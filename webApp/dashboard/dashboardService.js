probnsApp.service('dashboardService', function ($http, $q, probnsConf){
	var uri = probnsConf.api.url;

	this.getUserInfoById = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/usuario/get/clienteById/' + userId)
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.getTotalPropiedadesByUser = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/inmuebles/get/all/count/' + userId)
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.getTotalAgentesByUser = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/usuario/all/vendedores/count/' + userId)
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}
})